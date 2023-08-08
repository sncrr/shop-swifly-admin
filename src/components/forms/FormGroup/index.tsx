import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode
}

export const FormGroup: React.FC<Props> = ({children}) => {

  return (
    <div className='form-group my-2 p-1'>
      {children}
    </div>
  )
}