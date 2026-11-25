<?php
// Receives the "Start a project" form, checks the captcha, and emails the enquiry (with attachments) through Resend.
// Secrets and recipients live OUTSIDE public_html, in domaire-config.php — see server/domaire-config.example.php.
declare(strict_types=1);
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const MAX_FILES = 5;
const MAX_TOTAL = 20 * 1024 * 1024;
const RATE_LIMIT = 5;        // enquiries per IP…
const RATE_WINDOW = 3600;    // …per hour

const WORK = ['garden' => 'Garden & landscaping', 'terrace' => 'Terrace & outdoor living', 'pool' => 'Pool or natural pool', 'okitchen' => 'Outdoor kitchen', 'wellness' => 'Sauna & cold plunge', 'gym' => 'Outdoor gym', 'shade' => 'Shade & pergolas', 'light' => 'Outdoor lighting', 'kitchen' => 'Kitchen', 'bath' => 'Bathroom', 'interiors' => 'Interiors', 'villa' => 'Complete villa renovation', 'ext' => 'Extension or reconfiguration', 'other' => 'Something else'];
const PLACE = ['marbella' => 'Marbella', 'benahavis' => 'Benahavís', 'estepona' => 'Estepona', 'elsewhere' => 'Elsewhere on the Costa del Sol', 'outside' => 'Outside the Costa del Sol'];
const WHEN = ['asap' => 'As soon as possible', 'soon' => 'In the next 3–6 months', 'year' => 'Later this year', 'next' => 'Next year', 'exploring' => 'Just exploring for now'];
const BUDGET = ['b1' => 'Under €50,000', 'b2' => '€50,000 – €150,000', 'b3' => '€150,000 – €500,000', 'b4' => '€500,000 – €1M', 'b5' => 'Over €1M', 'b6' => 'Not sure yet'];
const TYPES = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/heic' => 'heic', 'image/heif' => 'heif', 'application/pdf' => 'pdf'];

function done(int $status, string $code): void {
    http_response_code($status);
    echo json_encode($status === 200 ? ['ok' => true] : ['ok' => false, 'error' => $code]);
    exit;
}

function text(string $key, int $max, bool $multiline = false): string {
    $v = $_POST[$key] ?? '';
    if (!is_string($v) || !mb_check_encoding($v, 'UTF-8')) return '';
    $v = preg_replace($multiline ? '/[^\P{C}\n\t]/u' : '/\p{C}+/u', $multiline ? '' : ' ', str_replace("\r\n", "\n", $v));
    return mb_substr(trim((string) $v), 0, $max);
}

function post_request(array $config, string $url, array $headers, string $body): array {
    if (isset($config['http'])) return ($config['http'])($url, $headers, $body); // tests only
    $ch = curl_init($url);
    curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => $body, CURLOPT_HTTPHEADER => $headers, CURLOPT_RETURNTRANSFER => true, CURLOPT_CONNECTTIMEOUT => 10, CURLOPT_TIMEOUT => 60]);
    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    if ($response === false) error_log('DOMAIRE enquiry: request failed: ' . curl_error($ch));
    curl_close($ch);
    return [$status, is_string($response) ? $response : ''];
}

// Real type from the file's contents, never from its name or the browser's claim
function file_kind(string $path): ?string {
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($path) ?: '';
    if (!isset(TYPES[$mime])) {
        $head = (string) file_get_contents($path, false, null, 0, 12);
        if (substr($head, 4, 4) === 'ftyp' && in_array(substr($head, 8, 4), ['heic', 'heix', 'hevc', 'mif1', 'msf1'], true)) $mime = 'image/heic';
    }
    return isset(TYPES[$mime]) ? $mime : null;
}

function rate_limited(string $ip): bool {
    $file = sys_get_temp_dir() . '/domaire-enquiry-' . hash('sha256', $ip);
    $h = @fopen($file, 'c+');
    if (!$h) return false;
    flock($h, LOCK_EX);
    $now = time();
    $hits = array_values(array_filter(array_map('intval', explode(',', (string) stream_get_contents($h))), fn($t) => $t > $now - RATE_WINDOW));
    $blocked = count($hits) >= RATE_LIMIT;
    if (!$blocked) $hits[] = $now;
    ftruncate($h, 0); rewind($h); fwrite($h, implode(',', $hits));
    flock($h, LOCK_UN); fclose($h);
    return $blocked;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') done(405, 'method');

$origin = (string) parse_url($_SERVER['HTTP_ORIGIN'] ?? '', PHP_URL_HOST);
$host = explode(':', strtolower((string) ($_SERVER['HTTP_HOST'] ?? '')))[0];
if ($origin === '' || strtolower($origin) !== $host) done(403, 'origin');

// PHP drops the whole body when it is over post_max_size
if (!$_POST && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0) done(413, 'files');

$configFile = dirname(__DIR__, 2) . '/domaire-config.php';
$config = is_file($configFile) ? require $configFile : null;
if (!is_array($config) || empty($config['resend_key']) || empty($config['turnstile_secret']) || empty($config['from']) || empty($config['to'])) {
    error_log('DOMAIRE enquiry: domaire-config.php is missing or incomplete');
    done(503, 'server');
}

if (text('company_site', 200) !== '') done(200, ''); // honeypot: only bots fill this in

$name = text('name', 120);
$email = text('email', 200);
$message = text('message', 5000, true);
$work = array_values(array_intersect_key(WORK, array_flip(array_filter((array) ($_POST['work'] ?? []), 'is_string'))));
if ($name === '' || $message === '' || !$work || !filter_var($email, FILTER_VALIDATE_EMAIL) || text('consent', 5) !== 'yes') done(422, 'fields');

$files = [];
$total = 0;
$up = $_FILES['files'] ?? null;
if ($up && is_array($up['name'])) {
    foreach ($up['name'] as $i => $original) {
        if ($up['error'][$i] === UPLOAD_ERR_NO_FILE) continue;
        $tmp = $up['tmp_name'][$i];
        if ($up['error'][$i] !== UPLOAD_ERR_OK || (!isset($config['http']) && !is_uploaded_file($tmp))) done(413, 'files');
        $total += filesize($tmp);
        $mime = file_kind($tmp);
        if (count($files) >= MAX_FILES || $total > MAX_TOTAL || !$mime) done(413, 'files');
        $base = trim((string) preg_replace('/[^\p{L}\p{N} _-]+/u', '', pathinfo((string) $original, PATHINFO_FILENAME)));
        $files[] = ['path' => $tmp, 'name' => (mb_substr($base, 0, 60) ?: 'file-' . ($i + 1)) . '.' . TYPES[$mime]];
    }
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '';
if (rate_limited($ip)) done(429, 'rate');

[$status, $body] = post_request($config, 'https://challenges.cloudflare.com/turnstile/v0/siteverify', ['Content-Type: application/json'],
    json_encode(['secret' => $config['turnstile_secret'], 'response' => text('cf-turnstile-response', 2048)]));
$check = json_decode($body, true);
if ($status === 0 || $status >= 500) done(502, 'server');
if (empty($check['success'])) error_log('DOMAIRE enquiry: Turnstile said ' . implode(', ', (array) ($check['error-codes'] ?? [])));
if (empty($check['success']) || (!empty($config['hostnames']) && !in_array($check['hostname'] ?? '', $config['hostnames'], true))) done(403, 'captcha');

$lines = [
    'Name: ' . $name,
    'Email: ' . $email,
    'Phone / WhatsApp: ' . (text('phone', 60) ?: '–'),
    'Location: ' . (PLACE[text('location', 20)] ?? '–'),
    'Work: ' . implode(', ', $work),
    'Budget: ' . (BUDGET[text('budget', 20)] ?? '–'),
    'Timing: ' . (WHEN[text('timing', 20)] ?? '–'),
    'Website language: ' . (text('lang', 2) === 'es' ? 'Spanish' : 'English'),
    'Attachments: ' . (count($files) ?: 'none'),
    '',
    $message,
    '',
    '—',
    'Sent from the form on ' . $host . '. The visitor agreed to be contacted. Reply to this email to answer them.',
];

$mail = [
    'from' => $config['from'],
    'to' => $config['to'],
    'reply_to' => $email,
    'subject' => 'New enquiry: ' . $name . ' – ' . $work[0] . (count($work) > 1 ? ' +' . (count($work) - 1) : ''),
    'text' => implode("\n", $lines),
];
foreach ($files as $f) $mail['attachments'][] = ['filename' => $f['name'], 'content' => base64_encode((string) file_get_contents($f['path']))];

[$status, $body] = post_request($config, 'https://api.resend.com/emails', ['Authorization: Bearer ' . $config['resend_key'], 'Content-Type: application/json'], (string) json_encode($mail, JSON_UNESCAPED_UNICODE));
if ($status < 200 || $status >= 300) {
    error_log('DOMAIRE enquiry: Resend returned ' . $status . ' ' . substr($body, 0, 300));
    done(502, 'server');
}
done(200, '');
