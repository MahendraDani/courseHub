import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { STATUSCODES } from "../utils/statusCodes";
import { STATUSMESSAGES } from "../utils/statusMessages";
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(STATUSCODES.NOT_FOUND)
        .json({ message: STATUSMESSAGES.ACCEES_TOKEN_NOT_FOUND });
    }
    //@ts-ignore
    const isMatch = jwt.verify(token, process.env.JWT_SECRET);

    if (!isMatch) {
      return res
        .status(STATUSCODES.FORBIDDEN)
        .json({ message: STATUSMESSAGES.ACCESS_TOKEN_INVALID });
    }

    next();
  } catch (error) {
    return res
      .status(STATUSCODES.BAD_REQUEST)
      .json({ message: STATUSMESSAGES.ACCESS_TOKEN_INVALID });
  }
};
