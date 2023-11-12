import express from "express";
const router = express.Router();

import { signupUser } from "../../../controllers/users/auth/signup.controller";

router.post("/signup", signupUser);

export default router;
