export const HIDE_DELAY = 4000;
export const ANIMATION_SPEED = 500;
export const STATUS_SUCCESS = "success";
export const STATUS_FAILED = "failed";

export interface ToastProps {
  dispatch: any;
  toastId: string;
  message: string;
  result: string;
  toShow: boolean;
  toHide: boolean;
}
