import { Request, Response } from "express";
import { User } from "../../../models/users";
import { getDate } from "../../../utils/date";
import { getTime } from "../../../utils/time";
import { STATUSMESSAGES } from "../../../utils/statusMessages";
import { STATUSCODES } from "../../../utils/statusCodes";
import jwt from "jsonwebtoken";
import bcrpyt from "bcryptjs";
import { z } from "zod";
/*
@ users
POST /users/signup
*/
interface RequestBody {
  name: string;
  email: string;
  password: string;
  createdOn?: string;
  createdAt?: string;
  role?: string;
  token?: string;
}

const signupUser = async (req: Request, res: Response) => {
  try {
    const signupSchema = z.object({
      name: z.string(),
      email: z.string().email().min(6),
      password: z.string().min(6),
    });
    const parsedInput = signupSchema.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(STATUSCODES.BAD_REQUEST).json({ parsedInput });
    }
    const name = parsedInput.data.name;
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;

    if (!email || !password) {
      return res
        .status(STATUSCODES.UNAUTHORIZED)
        .json({ message: STATUSMESSAGES.INVALID_CREDENTIALS });
    }

    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res
        .status(STATUSCODES.FORBIDDEN)
        .json({ message: STATUSMESSAGES.USER_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrpyt.hash(password, 10);
    const payload: RequestBody = {
      name,
      email,
      password: hashedPassword,
      createdOn: getDate(),
      createdAt: getTime(),
      role: "user",
    };
    const newUser = new User(payload);

    await newUser.save();

    //@ts-ignore
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(STATUSCODES.CREATED).json({
      message: STATUSMESSAGES.SIGNUP_SUCCESS,
      userId: newUser._id,
      token: token,
    });
  } catch (error) {
    return res
      .status(STATUSCODES.INTERNAL_SERVER_ERROR)
      .json({ message: STATUSMESSAGES.INTERNAL_SERVER_ERROR, error: error });
  }
};

export { signupUser };
