import './styles/global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from './provider.tsx'
import { Routes } from './routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <Routes />
    </Provider>
  </React.StrictMode>,
)
