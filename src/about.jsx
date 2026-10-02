import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AboutApp from './AboutApp.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutApp />
  </StrictMode>
);
