import './App.css'
import React from 'react'
import { Canvas } from '@components/Canvas'
import { LoginPage } from '@pages'

function App() {
  
  // const [resetContexts, setResetContexts] = React.useState(() => {})


  

  return (
    <>
    <div>tic tac toe</div>
    <div className='Canvas-main'>
      <Canvas size={400} />
    </div>
    {/* <LoginPage/> */}
    </>
  )
}

export default App
