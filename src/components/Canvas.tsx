import React from 'react';
import Rectangle from './Reactangle';
import usePointerPosition from './usePointerPosition';

interface CanvasProps {
  size: number
}

const Canvas: React.FC<CanvasProps> = ({ size }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null)
  const [drawing, setDrawing] = React.useState(false)
  const [turn, setTurn] = React.useState(false)

  React.useEffect(() => {
    if(canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;
      const path2D = new Rectangle(size, new Path2D())
      ctx!.beginPath()
      ctx!.strokeStyle = '#fff' 
      ctx!.lineJoin = 'round'
      ctx!.lineCap = 'round'
      const rectangle = path2D.createField()
      ctx!.stroke(rectangle)
    }
  }, [size])

  // const pointermove = usePointerPosition();
  // chat gpt enjoyer
  let ctxDraw: any

  const handleMouseDown = (event: any) => {
    setDrawing(true);
    if(ctxDraw) {
      ctxDraw?.beginPath();
      const firstX = event.clientX - canvasRef.current!.getBoundingClientRect().left;
      const firstY = event.clientY - canvasRef.current!.getBoundingClientRect().top;
      console.log('firstX', firstX, 'firstY', firstY)
    }
  };

  const handleMouseUp = (event: any) => {
    setDrawing(false);
    if(ctxDraw) {
      ctxDraw?.beginPath();
      const lastX = event.clientX - canvasRef.current!.getBoundingClientRect().left;
      const lastY = event.clientY - canvasRef.current!.getBoundingClientRect().top;
      console.log('lastX', lastX, 'lastY', lastY)
    }
  };

  const handleMouseMove = (event: MouseEvent) => {

    if (drawing && ctxDraw) {
      const x = event.clientX - canvasRef.current!.getBoundingClientRect().left;
      const y = event.clientY - canvasRef.current!.getBoundingClientRect().top;
      ctxDraw.lineTo(x, y)
      
      ctxDraw.stroke();


    }
  };

  const handleMouseOut = () => {
    setDrawing(false);
  };

  React.useEffect(() => {
    if(canvasRef.current) {
      ctxDraw = canvasRef.current.getContext('2d');
      if(!turn) {
        ctxDraw!.strokeStyle = '#646cff'
      } else {
        ctxDraw!.strokeStyle = 'red'
      }
      ctxDraw!.lineWidth = 2
      ctxDraw!.lineJoin = 'round'
      ctxDraw!.lineCap = 'round'
    }
  }, )

  return (
    <>
    <div className='canvas-wrapper'
      // onMouseMove={() => pointermove}
    >
      <canvas ref={canvasRef} width={size} height={size}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={(e: any) => handleMouseMove(e)}
              onMouseOut={handleMouseOut}
      ></canvas>
      {turn ? 
      <div>
        <span>your turn</span>
        <button onClick={() => setTurn(false)}>next player</button>
      </div>
      :
      <div>
        <span>another player turn</span>
        <button onClick={() => setTurn(true)}>next player</button>
      </div>
      }
      
    </div>
    </>
  );
};

export default Canvas;