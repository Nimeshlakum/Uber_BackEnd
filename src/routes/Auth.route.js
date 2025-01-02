import express from "express";
const router = express.Router();

import { signUp, signIn, logout, getCurrentUser, changePassword, updateAccount } from "../controllers/Auth.controller.js"

router.get("/current-user", getCurrentUser)

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/logout", logout)

router.patch("/change-password", changePassword)
router.patch("/update-account", updateAccount)

export default router;

