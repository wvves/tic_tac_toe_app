import React, { MouseEventHandler, useEffect } from 'react';
import Rectangle from './Reactangle';
import ReactDOM from 'react-dom';

interface CanvasProps {
  size: number
}

function matrixArray(arr: string[], length: number) {
  const defArray = [...arr]
  const resArray: Array<any> = []
  for(let index = 0; index < length; index++) {
    const rowArray: Array<string | undefined> = []
    for (let jndex = 0; jndex < length; jndex++) {
      rowArray[jndex] = defArray.shift()
    }
    resArray.push(rowArray)
  }
  return resArray
}

const Canvas: React.FC<CanvasProps> = ({ size }) => {
  // const canvasRefs: Array<React.RefObject<HTMLCanvasElement | null>> = Array(9).fill(null);
  // const canvasRefs = React.useRef<(HTMLCanvasElement | null)[]>(Array(9).fill(null))
  // const resArray: Array<Array<string | null>> = Array(3).fill(Array(3).fill(null))
  // console.log(resArray)
  const canvasRefs = React.useRef<Array<HTMLCanvasElement | null>>([])
  const contexts = React.useRef<Array<CanvasRenderingContext2D | null>>([]);
  const widhtSize = size + 6
  const [isTurn, setIsTurn] = React.useState(false)
  const [value, setValue] = React.useState<number | undefined>()
  const [pass, setPass] = React.useState<string[]>(Array(9).fill(null))

  React.useEffect(() => {
    canvasRefs.current.forEach((canvasRef, index) => {
      if (canvasRef) {
        contexts.current[index] = canvasRef.getContext('2d')
        // if (context) {
        //   contexts.current[index]!.strokeStyle = 'red';
        //   contexts.current[index]?.beginPath();
        //   contexts.current[index]?.rect(0, 0, 20, 40);
        //   contexts.current[index]?.stroke()
        //   console.log('123')
        // }
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
    // setPass()
    // setPass([...pass, context!.isPointInPath(centerX, centerY)])
    
    // setPass([pass[index] = passed])
    
    if(!pass[index]) {
      // pass[index] = passed
      if(isTurn) {
        setIsTurn(false)
        if(context) {
          context.beginPath();
          context.ellipse(centerX, centerY, 40, 55, 0, 0, 2 * Math.PI)
          context.strokeStyle = 'red'
          context.stroke()
          context.closePath()
          // let passed = context!.isPointInPath(centerX, centerY)
          pass[index] = '0'
          // console.log('isPoint', passed)
          // console.log('passIndex', pass[index])
          // setPass(pass.map((item, indexItem) => index === indexItem ? item = passed: item))
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
          // let passed = context!.isPointInStroke(centerX, centerY)
          pass[index] = '1'
          // console.log('isPoint', passed)
          // console.log('passIndex', pass[index])
        }
      }
    }
    // console.log(matrixArray(pass, 3))
    
  }
  console.log(matrixArray(pass, 3))
  console.log('passed', pass)
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