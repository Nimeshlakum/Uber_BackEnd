// Impoert And Congig Dotenv 
import dotenv from "dotenv";
dotenv.config({
    path: "/.env"
});
import express from "express";

// Import Custom Filles
import connectToDataBase from "./src/database/dbConnect.js";
// connectToDataBase();
import userRoutes from "./src/routes/User.route.js"
import authRoutes from "./src/routes/Auth.route.js"
import captainRoutes from "./src/routes/Captain.router.js"

// Initialization App
const app = express();

// Custom Middelwares 
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/captain", captainRoutes);

// Export App
export default app;

