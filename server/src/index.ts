import express, { Response, Request } from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/database";

import signupUserRoute from "./routes/users/auth/signup.route";
import { verifyToken } from "./middlewares/verifyToken";

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
app.get("/", verifyToken, (req: Request, res: Response) => {
  res.send("Top secret");
});

startServer();
