import './App.css'
import { Canvas } from '@components'
import { LoginPage, NotFoundPage } from '@pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '@utils/constants'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.HOME} element={
        <>
        <div>tic tac toe</div>
        <div className='Canvas-main'>
          <Canvas size={400} />
        </div>
        </>
      } />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
