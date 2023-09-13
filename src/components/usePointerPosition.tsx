import React, { useEffect } from 'react';

const usePointerPosition = () => {
  const [position, setPosition] = React.useState({x: 0, y: 0})

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      setPosition({x: event.clientX, y: event.clientY})
    }
    window.addEventListener('mousemove', handlePointerMove)
    return () => {
      window.addEventListener('mousemove', handlePointerMove)
    }
  }, []) 
  console.log(position)
  return position
  }

export default usePointerPosition;