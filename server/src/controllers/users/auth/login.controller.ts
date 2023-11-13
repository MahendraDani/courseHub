import { Request, Response } from "express";
import { STATUSMESSAGES } from "../../../utils/statusMessages";
import { STATUSCODES } from "../../../utils/statusCodes";
import { User } from "../../../models/users";

interface LoginRequestBody {
  email: string;
  password: string;
}
export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: LoginRequestBody = req.body;
  if (!email || !password) {
    return res
      .status(STATUSCODES.UNAUTHORIZED)
      .json({ message: STATUSMESSAGES.INVALID_CREDENTIALS });
  }

  const isUser = await User.findOne({ email });
  if (!isUser) {
    return res
      .status(STATUSCODES.UNAUTHORIZED)
      .json({ message: STATUSMESSAGES.INVALID_CREDENTIALS });
  }
};
