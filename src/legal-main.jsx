import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LegalApp from './LegalApp.jsx';
import { LangProvider } from './i18n.jsx';
import './styles.css';
import { prepareReveal } from './useReveal.js';

prepareReveal();

const root = document.getElementById('root'), page = root.dataset.page;
createRoot(root).render(
  <StrictMode>
    <LangProvider page={page}>
      <LegalApp page={page} />
    </LangProvider>
  </StrictMode>
);
