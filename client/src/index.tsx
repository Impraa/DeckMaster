import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from '@context/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <UserProvider>
        <Router />
      </UserProvider>
    </StrictMode>
  </BrowserRouter>,
)
