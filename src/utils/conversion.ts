import { Request } from "express";

export const getParamAsNumber = (req: Request, key: string): number => {
  if (!req.params[key]) {
    return 0;
  }
  const num = Number(req.params[key]);
  if (isNaN(num)) {
    return 0;
  }
  return num;
};
