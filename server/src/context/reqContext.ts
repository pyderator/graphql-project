import { Request, Response } from "express";

export type ReqContext = {
  req: Request;
  res: Response;
};
