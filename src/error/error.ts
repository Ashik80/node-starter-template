export type TError = {
  status: number;
  message: string;
};

export function newServerError(message: string): TError {
  return { status: 500, message };
}

export function newBadRequestError(message: string): TError {
  return { status: 400, message };
}

export function newNotFoundError(message: string): TError {
  return { status: 400, message };
}

export function newUnauthorizedError(message: string): TError {
  return { status: 401, message };
}
