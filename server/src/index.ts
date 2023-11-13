import express, { Response, Request } from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/database";

import signupUserRoute from "./routes/users/auth/signup.route";
import loginUserRoute from "./routes/users/auth/login.route";
import { verifyToken } from "./middlewares/verifyToken";
import { z } from "zod";

const app = express();
const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running at port: ${port}`);
    });
  } catch (error) {
    console.log("Error starting the server : ");
    console.log(error);
  }
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// connectDB();

app.use("/users", signupUserRoute);
app.use("/users", loginUserRoute);
app.get("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const nameSchema = z.string();
    const parsedOutput = nameSchema.safeParse(name);
    return res.json(parsedOutput);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.send("THis is zod error");
    }
  }
});

startServer();
