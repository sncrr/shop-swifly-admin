import { SuccessToast } from "./SuccessToast"
import { useSelector } from "react-redux";

export function ToastContainer({

}: any) {

    const toastState = useSelector((state:any) => state.toast);

    const { toasts } = toastState;

    if(toasts && toasts.length > 0) {
        return (
            <div className="absolute z-40 top-16 right-0">
                {
                    toasts.map((item:any, index:number) => {
                        switch (item.type) {
                            case "success":
                                return <SuccessToast key={index} message={item.message} />
                            default:
                                break;
                        }
                    })
                }
            </div>
        )
    }
    else {
        return null;
    }

    
}