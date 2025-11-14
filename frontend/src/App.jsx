import React, { useState } from "react"
import AcneCamera from "./components/Camera/AcneCamera"
import AcneQuestionnaire from "./components/Questionnaire/AcneQuestionnaire" 
import ResultsDisplay from "./components/Results/ResultsDisplay"
import "./App.css"

function App() {
  const [currentStep, setCurrentStep] = useState("camera")
  const [analysisData, setAnalysisData] = useState(null)
  const [capturedImage, setCapturedImage] = useState(null)

  const handleImageAnalysis = (imageAnalysis) => {
    setAnalysisData(prev => ({
      ...prev,
      imageAnalysis
    }))
    setCurrentStep("questionnaire")
  }

  const handleQuestionnaireComplete = async (questionnaireAnswers) => {
    try {
      console.log("Sending data for analysis...")
      
      const response = await fetch("http://localhost:5000/api/analyze-skin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: capturedImage,
          answers: questionnaireAnswers
        })
      })
      
      if (!response.ok) {
        throw new Error("Server response was not ok")
      }
      
      const result = await response.json()
      console.log("Analysis complete:", result)
      
      setAnalysisData(prev => ({
        ...prev,
        questionnaireAnswers,
        causeAnalysis: result.causes,
        recommendations: result.recommendations
      }))
      
      setCurrentStep("results")
    } catch (error) {
      console.error("Analysis error:", error)
      alert("Analysis failed. Please make sure the backend server is running on port 5000.")
    }
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🧴 AcneAI Analyzer</h1>
        <p>AI-powered acne recognition and treatment guidance</p>
      </header>

      <main className="app-main">
        {currentStep === "camera" && (
          <div className="step-container">
            <h2>📸 Step 1: Capture Skin Image</h2>
            <p>Take a clear photo of your skin for AI analysis</p>
            <AcneCamera 
              onAnalysisComplete={handleImageAnalysis}
              onCapture={setCapturedImage}
            />
          </div>
        )}

        {currentStep === "questionnaire" && (
          <div className="step-container">
            <h2>📋 Step 2: Lifestyle Assessment</h2>
            <p>Help us understand potential causes and triggers</p>
            {capturedImage && (
              <div className="image-preview">
                <img src={capturedImage} alt="Captured skin" className="preview-img" />
              </div>
            )}
            <AcneQuestionnaire onComplete={handleQuestionnaireComplete} />
          </div>
        )}

        {currentStep === "results" && analysisData && (
          <div className="step-container">
            <h2>📊 Analysis Results</h2>
            <ResultsDisplay data={analysisData} />
            <button 
              onClick={() => setCurrentStep("camera")}
              className="restart-btn"
            >
              🔄 Start New Analysis
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
