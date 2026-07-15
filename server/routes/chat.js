import express from "express";
import { generateResponse } from "../services/gemini.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const reply = await generateResponse(message);

    res.json({
      success: true,
      data: {
        reply,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response.",
    });
  }
});

export default router;