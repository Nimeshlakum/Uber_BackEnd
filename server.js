// Import And Config Dotenv
import dotenv from "dotenv";
dotenv.config({
    path: "/.env"
});
import http from "http";
import app from "./app.js";

// Import Port Form .env File
const port = process.env.PORT || 8000;


// Create Server
const server = http.createServer(app);

// Server Listen On Port 8000
server.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})

