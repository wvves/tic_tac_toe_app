import React from 'react';
import Rectangle from './Reactangle';

interface CanvasProps {
  size: number
}

const Canvas: React.FC<CanvasProps> = ({ size }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null)

  React.useEffect(() => {
    if(canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasRef.current.getContext('2d');
      const path2D = new Rectangle(size, new Path2D())
      ctx!.beginPath()
      ctx!.strokeStyle = '#fff'
      const rectangle = path2D.createField()
      ctx!.stroke(rectangle)
    }
  }, [])

  return (
    <>
    <div className='canvas-wrapper'>
      <canvas ref={canvasRef} width={size} height={size}></canvas>
    </div>
    </>
  );
};

export default Canvas;