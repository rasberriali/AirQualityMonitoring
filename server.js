const express = require("express");
const Groq = require("groq-sdk");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/groq-completion", async (req, res) => {
  try {
    const { aqiValue } = req.body;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `The AQI is ${aqiValue}. Provide health advice.`,
        },
      ],
      model: "llama3-8b-8192",
    });

    res.json({ advice: chatCompletion.choices[0]?.message?.content.trim() });
  } catch (error) {
    console.error("Error calling Groq API:", error);
    res.status(500).json({ error: "Failed to fetch advice" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
