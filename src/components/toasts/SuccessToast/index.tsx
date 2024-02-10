import { ToastContainer } from "../ToastContainer";
import { ToastProps } from "../constants";

export function SuccessToast(props: ToastProps) {
  
  return (
    <ToastContainer {...props}>
      <div className="bg-green-400 rounded p-2 w-72 h-12 m-2 text-white select-none text-sm">
        <span>{props.message}</span>
      </div>
    </ToastContainer>
  );
}
