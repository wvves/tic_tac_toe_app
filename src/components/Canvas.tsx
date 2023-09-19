import React from 'react';
import Modal from './Modal';

interface CanvasProps {
  size: number
}

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin(arr: string[]) {
  for(const combination of winCombinations) {
    const [a, b, c] = combination;
    if(arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
      return true;
    }
  }
  return false
}

function checkDraw(arr: string[]) {
  return [...arr].every((element) => element !== '')
}

const Canvas: React.FC<CanvasProps> = ({ size }) => {
  const canvasRefs = React.useRef<Array<HTMLCanvasElement | null>>([])
  const contexts = React.useRef<Array<CanvasRenderingContext2D | null>>([]);
  const widhtSize = size + 6
  const [currentPlayer, setCurrentPlayer] = React.useState('x')
  const [gameActive, setGameActive] = React.useState<boolean>(true)
  const [pass] = React.useState<string[]>(Array(9).fill(''))
  const [modalMessage, setModalMessage] = React.useState<string>('')

  React.useEffect(() => {
    canvasRefs.current.forEach((canvasRef, index) => {
      if (canvasRef) {
        contexts.current[index] = canvasRef.getContext('2d')
      }
    });
  }, []);
  // console.log(!!pass)
  // console.log(contexts)
  const drawing = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number): void => {
    const divElement = event.target as HTMLDivElement
    const rect = divElement.getBoundingClientRect()
    // console.log(rect)
    // Вычисляем центр div элемента
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // console.log(centerX, centerY)
    const context = contexts.current[index]
    // console.log(context)
  
    if(!pass[index]) {
      if(currentPlayer === 'o') {
        if(context) {
          context.beginPath();
          context.ellipse(centerX, centerY, 40, 55, 0, 0, 2 * Math.PI)
          context.strokeStyle = 'red'
          context.stroke()
          context.closePath()
          pass[index] = '0'
        }
        setCurrentPlayer('x')
      } else {
       
        if(context) {
          context.beginPath();
          context.moveTo(rect.width - 20, 0 + 20)
          context.lineTo(0 + 20, rect.height - 20)
          context.moveTo(0 + 20, 0 + 20)
          context.lineTo(rect.width - 20, rect.height - 20)
          context.strokeStyle = 'blue'
          context.stroke()
          context.closePath()
          pass[index] = '1'
        }
        setCurrentPlayer('o')
      }
    }

    if(checkWin(pass)) {
      setModalMessage(`winner: ${currentPlayer}!!!`)
      setGameActive(false)
    } else if(checkDraw(pass)) {
      setModalMessage('draw!')
      setGameActive(false)
    }
  }

  console.log('check win', checkWin(pass))
  console.log('check draw', checkDraw(pass))
  console.log('passed', pass)

  console.log('mess', modalMessage)
  // console.log(!gameActive)
  return (
    <>
    <div className='canvas-wrapper'>
      {!gameActive && <Modal>{modalMessage}</Modal>}
      <div style={{width: size, height: size}}>
        <div className='div-row' style={{width: widhtSize, height: size}}>
          {[...Array(9)].map((_, index) => (
            <div key={index} className={`btn-row`} style={{width: size / 3, height: size / 3}}
            onClick={(e: any) => drawing(e, index)} aria-disabled={gameActive}>
              {/* {value === index + 1 ? value : null} */}
              <canvas
                ref={(canvasRef) => {
                  canvasRefs.current[index] = canvasRef;
                }} width={size / 3} height={size / 3}></canvas>
              </div>
          ))}
        </div>
      </div>    
    </div>
    </>
  );
};

export default Canvas;