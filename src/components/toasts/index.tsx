import { connect, useDispatch } from "react-redux";
import { PromiseToast } from "./PromiseToast";
import styled from "styled-components";

const Container = styled.div`
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .slide-in {
    animation: slideIn 0.5s ease-in-out forwards;
  }

  .slide-out {
    animation: slideOut 0.5s ease-in-out forwards;
  }
`


function Main ({state}:any) {

    const dispatch = useDispatch();

    const { toasts } = state;

    if(toasts && toasts.length > 0) {
        return (
            <Container className="absolute z-40 top-16 right-0 overflow-hidden">
                {
                    toasts.map((item:any, index:number) => (
                        <PromiseToast
                            key={index}
                            dispatch={dispatch}
                            toastId={item.toastId}
                            message={item.message}
                            toHide={item.toHide}
                            result={item.result}
                        />
                    ))
                }
            </Container>
        )
    }
    else {
        return null;
    }
}

const mapStateToProps = (state: any) => ({
  state: state.toast
});

export const ToastContainer = connect(mapStateToProps)(Main);

// import { SuccessToast } from "./SuccessToast"
// import { useSelector } from "react-redux";

// export function ToastContainer({

// }: any) {

//     const toastState = useSelector((state:any) => state.toast);

//     const { toasts } = toastState;

//     if(toasts && toasts.length > 0) {
//         return (
//             <div className="absolute z-40 top-16 right-0">
//                 {
//                     toasts.map((item:any, index:number) => {
//                         switch (item.type) {
//                             case "success":
//                                 return <SuccessToast key={index} message={item.message} />
//                             default:
//                                 break;
//                         }
//                     })
//                 }
//             </div>
//         )
//     }
//     else {
//         return null;
//     }

    
// }