import { Confirmation } from "./Confirmation";
import ReactDOM from 'react-dom/client';
import React from "react";

export interface DialogProps {
  title?: string,
  content?: string,
  onConfirm?: any,
  onCancel?: any,
  buttons?: any
}


const rootDiv:any = document.getElementById('root');


export function createAlert (element:React.ReactNode) {

  const alertContainer = document.createElement('div');
  alertContainer.id = "alert-container"
  alertContainer.className = "absolute z-50 w-full h-full top-0 left-0";

  const firstChild = rootDiv.firstChild;

  rootDiv.insertBefore(alertContainer, firstChild);

  ReactDOM.createRoot(alertContainer).render(
    element
  );
}


export function showConfirmDialog (props: DialogProps) {
  createAlert(
    <Confirmation
      {...props}
    />
  )
}

export function clearAlert () {
  rootDiv.removeChild(document.getElementById('alert-container'));
}