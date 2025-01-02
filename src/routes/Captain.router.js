import express from "express";
const router = express.Router();

import { captianProfile, captainsignUp, captainignIn, captianLogout } from "../controllers/Captain.controller.js"

router.get("/profile", captianProfile)

router.post("/signUp", captainsignUp)
router.post("/signIn", captainignIn)
router.post("/logout", captianLogout)

export default router;