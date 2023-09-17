import React, { MouseEventHandler, useEffect } from 'react';
import Rectangle from './Reactangle';
import ReactDOM from 'react-dom';

interface CanvasProps {
  size: number
}

const Canvas: React.FC<CanvasProps> = ({ size }) => {
  // const canvasRefs: Array<React.RefObject<HTMLCanvasElement | null>> = Array(9).fill(null);
  // const canvasRefs = React.useRef<(HTMLCanvasElement | null)[]>(Array(9).fill(null))
  const canvasRefs = React.useRef<Array<HTMLCanvasElement | null>>([])
  const contexts = React.useRef<Array<CanvasRenderingContext2D | null>>([]);

  const widhtSize = size + 6
  const [isTurn, setIsTurn] = React.useState(false)
  const [value, setValue] = React.useState<number | undefined>()

  React.useEffect(() => {
    canvasRefs.current.forEach((canvasRef, index) => {
      if (canvasRef) {
        const context = canvasRef.getContext('2d');
        contexts.current[index] = canvasRef.getContext('2d')
        if (context) {
          contexts.current[index]!.strokeStyle = 'red';
          // contexts.current[index]?.beginPath();
          // contexts.current[index]?.rect(0, 0, 20, 40);
          // contexts.current[index]?.stroke()
          // console.log('123')
        }
      }
    });
  }, []);
  // console.log(contexts)
  const drawing = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number): void => {
    const divElement = event.target as HTMLDivElement
    const rect = divElement.getBoundingClientRect()
    console.log(rect)
    // Вычисляем центр div элемента
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    console.log(centerX, centerY)
    const context = contexts.current[index]
    console.log(context)
    // if(context) {
    //   context.strokeStyle = 'red'
    //   context.beginPath();
    //   context.moveTo(rect.width - 20, 0 + 20)
    //   context.lineTo(0 + 20, rect.height - 20)
    //   context.moveTo(0 + 20, 0 + 20)
    //   context.lineTo(rect.width - 20, rect.height - 20)
    //   context.stroke()
    //   console.log('123')
    // }

    if(isTurn) {
      setIsTurn(false)
      if(context) {
        context.beginPath();
        context.ellipse(centerX, centerY, 40, 55, 0, 0, 2 * Math.PI)
        context.strokeStyle = 'red'
        context.stroke()
        context.closePath()
      }
    } else {
      setIsTurn(true)
      if(context) {
        context.beginPath();
        context.moveTo(rect.width - 20, 0 + 20)
        context.lineTo(0 + 20, rect.height - 20)
        context.moveTo(0 + 20, 0 + 20)
        context.lineTo(rect.width - 20, rect.height - 20)
        context.strokeStyle = 'blue'
        context.stroke()
        context.closePath()
      }

    }
    context!.closePath()
    // setValue(index)
    console.log(isTurn)
  }
  return (
    <>
    <div className='canvas-wrapper'>
      {/* <canvas ref={canvasRef} width={size} height={size}></canvas> */}
      {/* <button>123</button> */}
      {/* {[...Array(10)].map((x, i) => 
      <div key={i}><button>123</button></div>
      )} */}
      <div style={{width: size, height: size}}>
        {/* {[...Array(3)].map((_, index) => (

        ))} */}
        <div className='div-row' style={{width: widhtSize, height: size}}>
          {[...Array(9)].map((_, index) => (
            <div key={index} className='btn-row' style={{width: size / 3, height: size / 3}}
            onClick={(e: any) => drawing(e, index)}>
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