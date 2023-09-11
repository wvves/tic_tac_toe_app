import React, { HtmlHTMLAttributes, useRef } from 'react'
import './App.css'
import Canvas from './components/Canvas'

function App() {

  return (
    <>
    <div className='App'>
      <Canvas size={450}></Canvas>
    </div>
    </>
  )
}

export default App
