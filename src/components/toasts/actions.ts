import { addToast, removeToast } from "./reducer";

export function showSuccessMessage (dispatch:any, message : string) {
    const id = (new Date).getTime().toString();

    dispatch(addToast({
        id: id,
        type: "success",
        message: message
    }))

    setTimeout(() => {
        dispatch(removeToast(id));
    }, 3000);
}