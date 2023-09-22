import React from 'react';
import { Modal } from '@components/Modal';
import { winCombinations } from '@utils/constants';
import { checkDraw, checkWin } from '@utils/helpers';
interface CanvasProps {
  size: number
}

interface IScore {
  x: number
  o: number
}
export const Canvas: React.FC<CanvasProps> = ({ size }) => {
  const canvasRefs = React.useRef<Array<HTMLCanvasElement | null>>([])
  const contexts = React.useRef<Array<CanvasRenderingContext2D | null>>([]);
  const [gameActive, setGameActive] = React.useState<boolean>(true)
  const widhtSize = size + 6
  const [currentPlayer, setCurrentPlayer] = React.useState('x')
  
  const [pass, setPass] = React.useState<string[]>(Array(9).fill(''))
  const [modalMessage, setModalMessage] = React.useState<string>('')

  const [score, setScore] = React.useState<IScore>({
    x: 0,
    o: 1
  })
  React.useEffect(() => {
    canvasRefs.current.forEach((canvasRef, index) => {
      if (canvasRef) {
        contexts.current[index] = canvasRef.getContext('2d')
      }
    });
  }, []);

  const changeActiveToDisable = (isActive: boolean) => {
    setGameActive(isActive)
  }

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
          context.ellipse(centerX, centerY, 30, 30, 0, 0, 2 * Math.PI)
          context.strokeStyle = 'red'
          context.lineWidth = 15
          context.stroke()
          context.closePath()
          pass[index] = '0'
        }
        setCurrentPlayer('x')
      } else {
       
        if(context) {
          context.beginPath();
          context.moveTo(rect.width - 30, 0 + 30)
          context.lineTo(0 + 30, rect.height - 30)
          context.moveTo(0 + 30, 0 + 30)
          context.lineTo(rect.width - 30, rect.height - 30)
          context.strokeStyle = 'blue'
          context.lineWidth = 15
          context.stroke()
          context.closePath()
          pass[index] = '1'
        }
        setCurrentPlayer('o')
      }
    }

    if(checkWin(pass, winCombinations)) {
      setModalMessage(`winner: ${currentPlayer}!!!`)
      if(currentPlayer === 'x') {
        setScore({... score, x: score.x + 1})
      }
      else {
        setScore({... score, o: score.o + 1})
      }
      changeActiveToDisable(false)
    } else if(checkDraw(pass)) {
      setModalMessage('draw!')
      changeActiveToDisable(false)
    }
  }

  const onNewGame = () => {
    console.log('123')
    changeActiveToDisable(true)
    contexts.current.forEach((ctx) => {
      ctx!.reset()
    })
    setPass(Array(9).fill(''))
  }

  console.log('check win', checkWin(pass, winCombinations))
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
    {/**right panel */}
    <div className='right-panel'>
        <div>
          <div>name</div>
          <button>login</button>
        </div>
        <div>
          <div>your turn</div>
          <button onClick={onNewGame}>new game</button>
          <div>score</div>
          <div>{score.x} : {score.o}</div>
        </div>
      </div>
    </>
  );
};