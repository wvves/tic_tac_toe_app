import './App.css'
import Canvas from './components/Canvas'

function App() {
  
  return (
    <>
    <div>tic tac toe</div>
    <div className='Canvas-main'>
      <Canvas size={400}></Canvas>
      <div className='right-panel'>
        <div>
          <div>name</div>
          <button>login</button>
        </div>
        <div>
          <div>your turn</div>
          <div>start game</div>
          <div>score</div>
          <div>0 : 0</div>
        </div>
      </div>
    </div>
    {/* <LoginPage/> */}
    </>
  )
}

export default App
