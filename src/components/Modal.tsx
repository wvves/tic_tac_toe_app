import React from 'react';

interface ModalProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children: string
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  return(
      <div className='modal-window'>
        {children}
      </div>
  )
}