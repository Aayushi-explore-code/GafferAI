import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
    res.send("GAFFER Backend Running 🚀");
});

app.get("/api/status", (req, res) => {
    res.json({
        status: "success",
        message: "Hello from Gaffer Backend!"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});