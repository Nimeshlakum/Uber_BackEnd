import express from "express";
const router = express.Router();

import { getUserById, getAllUser } from "../controllers/User.controller.js";


router.get("/:id", getUserById)
router.get("/", getAllUser)


export default router;

