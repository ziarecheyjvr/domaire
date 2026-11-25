<?php
// Copy to domaire-config.php in the folder ABOVE public_html on the server, and fill in the two keys there.
// Never commit the real file or put it inside public_html.
return [
    'resend_key' => '',          // Resend API key, "Sending access" only, limited to send.domaire.co
    'turnstile_secret' => '',    // Cloudflare Turnstile secret key
    'from' => 'DOMAIRE website <enquiries@send.domaire.co>',
    'to' => ['hello@domaire.co', 'adam@klb-solutions.com'],
    'hostnames' => ['domaire.co', 'www.domaire.co'],
];
