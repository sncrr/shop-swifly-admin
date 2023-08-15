import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode,
  htmlFor?: string
}

export const FormLabel: React.FC<Props> = ({children, htmlFor}) => {

  return (
    <div className="w-40 flex justify-end pt-2">
      <label className="text-right font-semibold w-full" htmlFor={htmlFor}>
        {children}
      </label>
      <label className='font-semibold ml-2 mr-6'>
        :
      </label>
    </div>
  )
}