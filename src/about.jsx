import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AboutApp from './AboutApp.jsx';
import { LangProvider } from './i18n.jsx';
import './styles.css';
import { prepareReveal } from './useReveal.js';

prepareReveal();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider page="about">
      <AboutApp />
    </LangProvider>
  </StrictMode>
);
