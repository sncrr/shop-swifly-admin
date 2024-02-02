export const create = (body: Response): Response => {
  return {
    ...body,
  };
};

export const success = (body: { message: string; data: any }): Response => {
  return {
    error: false,
    message: body?.message ? body.message : "success",
    data: body?.data ? body.data : null,
  };
};

export const internalError = (error: any): Response => {
  return {
    error: true,
    message: error ? error : "error",
  };
};

export interface Response {
  error?: boolean;
  message?: string;
  data?: any;
}

// export const response = {
//   create: create,
//   success: success,
//   internalError: internalError,
// }
