import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from '@context/UserContext.tsx'
import Loading from '@components/Loading.tsx'
import CardProvider from '@context/CardContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Suspense fallback={<Loading />}>
        <UserProvider>
          <CardProvider>
            <Router />
          </CardProvider>  
        </UserProvider>
      </Suspense>
    </StrictMode>
  </BrowserRouter>,
)
