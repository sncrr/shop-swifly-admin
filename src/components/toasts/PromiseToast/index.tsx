import { hideToast, updateToast } from "../actions"
import { useEffect } from "react";
import { ANIMATION_SPEED, HIDE_DELAY, STATUS_FAILED, STATUS_SUCCESS } from "../constants";

interface Props {
  dispatch: any,
  toastId: string,
  message: string,
  result: string,
  toShow: boolean,
  toHide: boolean,
}

export function PromiseToast({
  dispatch,
  toastId,
  message,
  result,
  toShow,
  toHide,
}: Props) {

  useEffect(() => {

    setTimeout(() => {
      dispatch(updateToast(toastId, {
        toShow: false
      }))
    }, ANIMATION_SPEED)

  }, [])

  useEffect(() => {
    if(result) {
      setTimeout(() => {
        dispatch(hideToast(toastId))
      }, HIDE_DELAY)
    }
  }, [result])

  const handleClose = () => {
    dispatch(hideToast(toastId));
  }

  const getClassName = () => {
    let className = "p-4 w-64 text-sm m-2 rounded-md drop-shadow-md text-white select-none transition-colors";

    if (result === STATUS_SUCCESS) {
      className += " bg-green-500"
    }
    else if (result === STATUS_FAILED) {
      className += " bg-red-500"
    }
    else {
      className += " bg-yellow-600"
    }

    if (toHide) {
      className += " slide-out"
    }
    else if (toShow) {
      className += " slide-in"
    }

    return className;
  }

  return (
    <div
      className={getClassName()}
    >
      <div onClick={handleClose} className="absolute right-2 top-1 cursor-pointer">
        x
      </div>
      {message}
    </div>
  )
}