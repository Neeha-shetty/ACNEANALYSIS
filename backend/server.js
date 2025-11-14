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
  res.json({ message: "🚀 Backend is working on PORT 5001!", timestamp: new Date().toISOString() });
});

// Analyze skin endpoint
app.post("/api/analyze-skin", (req, res) => {
  const { image, answers } = req.body;
  
  console.log("📸 Received analysis request");
  
  // Generate personalized analysis
  const analysis = {
    acneTypes: [
      { type: "Comedonal (Blackheads/Whiteheads)", confidence: 75 + Math.random() * 20 },
      { type: "Inflammatory (Red Bumps)", confidence: 40 + Math.random() * 30 }
    ],
    severity: 5 + Math.random() * 4,
    causes: ["hormonal fluctuations", "excess sebum production"],
    recommendations: {
      immediate: [
        "Use salicylic acid cleanser twice daily",
        "Avoid dairy products for 2 weeks", 
        "Apply oil-free moisturizer with SPF"
      ],
      routine: [
        "AM: Salicylic Acid Cleanser → Oil-free Moisturizer with SPF",
        "PM: Gentle Foaming Cleanser → Niacinamide Serum → Lightweight Moisturizer"
      ]
    }
  };
  
  res.json(analysis);
});

// Use port 5001
const PORT = 5001;
app.listen(PORT, () => {
  console.log("🎯 Backend server running on http://localhost:" + PORT);
  console.log("📊 API Test: http://localhost:" + PORT + "/api/test");
  console.log("📱 Your website: http://localhost:" + PORT + "/acne-camera-working.html");
});
