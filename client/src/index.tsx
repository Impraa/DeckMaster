import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from '@context/UserContext.tsx'
import Loading from '@components/Loading.tsx'
import CardProvider from '@context/CardContext.tsx'
import ModalProvider from '@context/ModalContext.tsx'
import Modal from '@layout/Modal.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Suspense fallback={<Loading />}>
        <UserProvider>
          <CardProvider>
            <ModalProvider>
              <Modal/>
              <Router />
            </ModalProvider>
          </CardProvider>  
        </UserProvider>
      </Suspense>
    </StrictMode>
  </BrowserRouter>,
)
