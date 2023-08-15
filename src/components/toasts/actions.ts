import * as constant from './constants';

export const createPromiseToast = (data: any) => {

    let toastId = new Date().getTime().toString();

    return ({
        type: constant.CREATE_PROMISE_TOAST,
        data: {
            ...data,
            type: 'promise',
            toShow: true
        },
        toastId
    })
}

export const successPromiseToast = (data: any) => ({
    type: constant.SUCCESS_PROMISE_TOAST,
    data
})

export const failedPromiseToast = (data: any) => ({
    type: constant.FAILED_PROMISE_TOAST,
    data
})

export const showToast = (data: any) => ({
    type: constant.SHOW_TOAST,
    data
})

export const updateToast = (toastId: string, data: any) => ({
    type: constant.UPDATE_TOAST,
    data: {
        toastId,
        data
    }
})

export const hideToast = (toastId: any) => ({
    type: constant.HIDE_TOAST,
    data: toastId
})

export const destroyToast = (toastId: any) => ({
    type: constant.DESTROY_TOAST,
    data: toastId
})