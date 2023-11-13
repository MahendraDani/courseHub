import express from "express";
const router = express.Router();

import { loginUser } from "../../../controllers/users/auth/login.controller";

router.post("/login", loginUser);

export default router;
