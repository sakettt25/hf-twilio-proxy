// index.js
const express = require("express");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { user_id, user_input } = req.body;

    const form = new FormData();
    form.append("user_id", user_id || "test_user");
    form.append("user_input", user_input || "Hello");

    const response = await axios.post(
      "https://ayanosenpai123-chatbot.hf.space/chat",
      form,
      { headers: form.getHeaders() }
    );

    // Return HF response to Twilio
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error fetching API response" });
  }
});

app.listen(3000, () => console.log("Proxy server running on port 3000"));