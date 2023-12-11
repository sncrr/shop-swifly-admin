import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode,
  htmlFor?: string
}

export const FormLabel: React.FC<Props> = ({children, htmlFor}) => {

  return (
    <td className="text-right p-1 flex">
      <label className="font-semibold text-sm w-full" htmlFor={htmlFor}>
        {children}
      </label>
      <label className='font-semibold text-sm ml-2 mr-6'>
        :
      </label>
    </td>
  )
}