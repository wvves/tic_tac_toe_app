import React from 'react';

interface ModalProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children: string
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return(
      <div className='modal-window'>
        {children}
      </div>
  )
}

export default Modal;