import React from 'react'
import { createRoot} from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.ts'

import './index.css'

const root = document.querySelector('#root');

root && createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
