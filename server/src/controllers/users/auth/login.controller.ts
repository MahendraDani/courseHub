import { Request, Response } from "express";
import { STATUSMESSAGES } from "../../../utils/statusMessages";
import { STATUSCODES } from "../../../utils/statusCodes";
import { User } from "../../../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(STATUSCODES.UNAUTHORIZED)
      .json({ message: STATUSMESSAGES.INVALID_CREDENTIALS });
  }
  //@ts-ignore
  const isPasswordMatch = bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res
      .status(STATUSCODES.UNAUTHORIZED)
      .json({ message: STATUSMESSAGES.INVALID_CREDENTIALS });
  }

  const payload = {
    name: user.name,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt,
    createdOn: user.createdOn,
    role: user.role,
  };
  //@ts-ignore
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return res.status(STATUSCODES.OK).json({
    message: STATUSMESSAGES.LOGIN_SUCCESS,
    userId: user._id,
    token: accessToken,
  });
};
