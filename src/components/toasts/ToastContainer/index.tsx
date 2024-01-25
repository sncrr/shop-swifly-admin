import { ReactNode, useEffect } from "react";
import { ANIMATION_SPEED, HIDE_DELAY, ToastProps } from "../constants";
import { hideToast, updateToast } from "../slice";

interface Props extends ToastProps{
    children: ReactNode
}
export const ToastContainer = (props: Props) => {

    useEffect(() => {
        
        setTimeout(() => {
            props.dispatch(updateToast({
                toastId: props.toastId,
                data: {
                    toShow: false,
                }
            }))
        }, ANIMATION_SPEED);
    }, [])

    useEffect(() => {
        if(!props.toShow) {
            setTimeout(() => {
                props.dispatch(hideToast(props.toastId))
            }, HIDE_DELAY)
        }
    }, [props.toShow])

    return props.toShow ? (
            <div className="slide-in">{props.children}</div>
        ) : 
        props.toHide ? (
            <div className="slide-out">{props.children}</div>
        ) : (
            <div>{props.children}</div>
        )
}