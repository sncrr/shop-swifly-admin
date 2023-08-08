import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode,
  htmlFor?: string
}

export const FormLabel: React.FC<Props> = ({children, htmlFor}) => {

  return (
    <label className="text-sm" htmlFor={htmlFor}>
      {children}
    </label>
  )
}