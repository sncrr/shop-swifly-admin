import { ReactNode } from "react";

interface Props {
  children: ReactNode
}
export const FormError = (props: Props) => {

  if (props.children) {
    return (
      <div className="bg-red-100 text-red-500 text-sm rounded mx-8 p-4">
        <span className="font-bold pr-2">Errors:</span>
        {props.children}
      </div>
    )
  }
}