import React, { useRef, useState, useCallback } from "react"
import Webcam from "react-webcam"

const AcneCamera = ({ onAnalysisComplete, onCapture }) => {
  const webcamRef = useRef(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)

  const captureAndAnalyze = useCallback(async () => {
    if (!webcamRef.current) return

    const imageSrc = webcamRef.current.getScreenshot()
    if (!imageSrc) return

    onCapture(imageSrc)
    setIsAnalyzing(true)

    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const analysis = {
        acneTypes: [
          { type: "Comedonal", confidence: 0.85 },
          { type: "Inflammatory", confidence: 0.45 }
        ],
        severity: 6.5,
        affectedAreas: ["Forehead", "Chin"],
        confidence: 0.78
      }
      
      onAnalysisComplete(analysis)
    } catch (error) {
      console.error("Analysis error:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }, [onAnalysisComplete, onCapture])

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  }

  return (
    <div className="camera-container">
      <div className="camera-frame">
        {cameraActive ? (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="webcam-view"
          />
        ) : (
          <div className="camera-placeholder">
            <p>Camera access required for skin analysis</p>
            <button 
              onClick={() => setCameraActive(true)}
              className="enable-camera-btn"
            >
              📸 Enable Camera
            </button>
          </div>
        )}
      </div>
      
      <div className="camera-controls">
        {cameraActive && (
          <>
            <button 
              onClick={captureAndAnalyze}
              disabled={isAnalyzing}
              className={\`capture-btn \${isAnalyzing ? "analyzing" : ""}\`}
            >
              {isAnalyzing ? "🔍 Analyzing..." : "📷 Capture & Analyze"}
            </button>
            <button 
              onClick={() => setCameraActive(false)}
              className="secondary-btn"
            >
              🔄 Switch Camera
            </button>
          </>
        )}
      </div>

      {isAnalyzing && (
        <div className="analysis-overlay">
          <div className="spinner"></div>
          <p>AI is analyzing your skin condition...</p>
        </div>
      )}
    </div>
  )
}

export default AcneCamera
