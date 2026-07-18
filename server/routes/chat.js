import express from "express";
import { generateResponse } from "../services/gemini.js";
import { handleIntent } from "../services/intentRouter.js";

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

    // STEP 1: Check if it's a known stadium intent
    const intent = handleIntent(message);

    if (intent.handled) {
      return res.json({
        success: true,
        data: {
          reply: intent.reply,
        },
      });
    }

    // STEP 2: Otherwise ask Gemini
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