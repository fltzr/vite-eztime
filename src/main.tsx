import React from 'react';
import { createRoot } from 'react-dom/client';
import { Providers } from './providers.tsx';

import './index.css';

const root = document.querySelector('#root');

root &&
  createRoot(root).render(
    <React.StrictMode>
      <Providers />
    </React.StrictMode>
  );
