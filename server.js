const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve your existing frontend files
app.use(express.static(path.join(__dirname, "..")));

// API Routes
app.get("/api/test", (req, res) => {
  res.json({ message: "🚀 Backend is working!", timestamp: new Date().toISOString() });
});

// Analyze skin endpoint
app.post("/api/analyze-skin", (req, res) => {
  const { image, answers } = req.body;
  
  console.log("📸 Received analysis request");
  console.log("Skin type:", answers.skin_type);
  
  // Your analysis logic here...
  const analysis = {
    acneTypes: [
      { type: "Comedonal (Blackheads/Whiteheads)", confidence: 75 },
      { type: "Inflammatory (Red Bumps)", confidence: 45 }
    ],
    severity: 6.5,
    causes: ["hormonal", "stress"],
    recommendations: {
      immediate: [
        "Use salicylic acid cleanser twice daily",
        "Avoid dairy products for 2 weeks"
      ],
      routine: [
        "AM: Salicylic Acid Cleanser → Oil-free Moisturizer with SPF",
        "PM: Gentle Foaming Cleanser → Niacinamide Serum"
      ]
    }
  };

  res.json(analysis);
});

// Use port 3001 instead of 5000
const PORT = 3001;
app.listen(PORT, () => {
  console.log("🎯 Backend server running on http://localhost:" + PORT);
  console.log("📊 API Test: http://localhost:" + PORT + "/api/test");
  console.log("📱 Your website: http://localhost:" + PORT + "/acne-camera-simple.html");
});
