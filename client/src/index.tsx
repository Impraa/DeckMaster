import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from '@context/UserContext.tsx'
import Loading from '@components/Loading.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Suspense fallback={<Loading />}>
        <UserProvider>
          <Router />
        </UserProvider>
      </Suspense>
    </StrictMode>
  </BrowserRouter>,
)
