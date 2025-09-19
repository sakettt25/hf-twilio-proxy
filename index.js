const express = require("express");
const axios = require("axios");
const FormData = require("form-data");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Root GET route for browser
app.get("/", (req, res) => {
  res.send("HF-Twilio Proxy is running. Use POST /chat to interact.");
});

// Endpoint for Twilio to call
app.post("/chat", async (req, res) => {
  const { user_input, user_id } = req.body;

  try {
    const form = new FormData();
    form.append("user_input", user_input);
    form.append("user_id", user_id);

    // Call Hugging Face Spaces API
    const hfResponse = await axios.post(
      "https://ayanosenpai123-chatbot.hf.space/chat",
      form,
      { headers: form.getHeaders() }
    );

    res.json(hfResponse.data);

  } catch (err) {
    console.error("HF Proxy Error:", err.message);
    res.status(500).json({ error: "HF API call failed" });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(HF Proxy running on port ${port}));