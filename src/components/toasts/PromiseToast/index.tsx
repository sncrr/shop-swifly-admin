import styled from "styled-components"
import { hideToast, updateToast } from "../actions"
import { useEffect } from "react";
import { STATUS_FAILED, STATUS_SUCCESS } from "../constants";

interface Props {
  dispatch: any,
  toastId: string,
  message: string,
  toHide: boolean,
  result: string,
}

export function PromiseToast({ 
  dispatch, 
  toastId, 
  message, 
  toHide,
  result
}: Props) {

  useEffect(() => {
    if(result) {
      setTimeout(() => {
        dispatch(hideToast(toastId))
      }, 2000)
    }
  }, [result])

  const handleClose = () => {
      dispatch(hideToast(toastId));
  }

  const getClassName = () => {
    let className = "p-2 w-72 h-12 m-2 text-white select-none transition-colors";

    if(result === STATUS_SUCCESS) {
      className += " bg-green-400"
    }
    else if(result === STATUS_FAILED) {
      className += " bg-red-400"
    }
    else {
      className += " bg-yellow-600"
    }

    if(toHide) {
      className += " slide-out"
    }
    else {
      className += " slide-in"
    }
    
    return className;
  }

  return (
    <div
      className={getClassName()}
    >
      <h1 className="font-bold">{message}</h1>
      <button onClick={handleClose}>CLOSE</button>
    </div>
  )
}