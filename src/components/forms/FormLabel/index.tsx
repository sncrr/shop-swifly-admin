import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode,
  htmlFor?: string,
  required?: boolean
}

export const FormLabel: React.FC<Props> = ({children, htmlFor}) => {

  if(children) {
    return (
      <td className="text-right p-1 flex">
        <label className="form-control-label font-semibold text-sm w-full" htmlFor={htmlFor}>
          {children}
        </label>
        <label className='form-control-require font-semibold text-sm text-red-500 text-center pt-4 w-6'>
          *
        </label>
      </td>
    )
  }
  else {
    return <td></td>
  }
  
}