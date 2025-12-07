import { useState, useEffect, useRef } from 'react'
import './InterviewScreen.css'

function InterviewScreen({ sessionData, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [recording, setRecording] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)

  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const streamRef = useRef(null)
  const timerRef = useRef(null)
  const uploadLockedRef = useRef(false) // prevents duplicate uploads

  const questions = sessionData.questions || []
  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (cameraReady && currentQuestion) {
      startRecording()
    }
  }, [currentQuestionIndex, cameraReady])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setCameraReady(true)
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Please allow camera and microphone access to continue')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
  }

  const startRecording = async () => {
    if (!streamRef.current || recording) return

    audioChunksRef.current = []
    uploadLockedRef.current = false

    try {
      const audioTracks = streamRef.current.getAudioTracks()
      if (!audioTracks || audioTracks.length === 0) {
        throw new Error('No audio track found.')
      }

      let options = {}
      const types = [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus'
      ]

      for (const t of types) {
        if (MediaRecorder.isTypeSupported(t)) {
          options.mimeType = t
          break
        }
      }

      let mediaRecorder
      try {
        mediaRecorder = new MediaRecorder(streamRef.current, options)
      } catch {
        mediaRecorder = new MediaRecorder(streamRef.current)
      }

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = handleRecordingStop

      mediaRecorder.start()
      mediaRecorderRef.current = mediaRecorder
      setRecording(true)

      const questionTime = currentQuestion?.estimated_seconds || 90
      setTimeLeft(questionTime)

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            stopRecording()
            return 0
          }
          return prev - 1
        })
      }, 1000)

    } catch (error) {
      console.error("Recorder Error:", error)
      alert("Recording could not start. Check microphone permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      uploadLockedRef.current = true
      mediaRecorderRef.current.stop()
      setRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

const handleNextQuestion = async () => {
  uploadLockedRef.current = true;

  if (!mediaRecorderRef.current) return;

  // 1. Stop recorder and WAIT for it to finish
  const recorder = mediaRecorderRef.current;

  const waitForStop = new Promise(resolve => {
    recorder.onstop = () => {
      resolve();
    };
  });

  if (recording) {
    setRecording(false);
    recorder.stop();
  }

  await waitForStop;  // <-- WAIT HERE so chunks finalize

  // 2. Now check chunks
  if (audioChunksRef.current.length === 0) {
    const silentBlob = new Blob([], { type: "audio/webm" });
    uploadAnswer(silentBlob);
    return;
  }

  const mime = recorder.mimeType || "audio/webm";
  const audioBlob = new Blob(audioChunksRef.current, { type: mime });

  uploadAnswer(audioBlob);
};


const handleRecordingStop = async () => {
  if (uploadLockedRef.current) {
    uploadLockedRef.current = false;
    return;
  }

  if (audioChunksRef.current.length === 0) return;

  const mime = mediaRecorderRef.current?.mimeType || "audio/webm";
  const audioBlob = new Blob(audioChunksRef.current, { type: mime });

  await uploadAnswer(audioBlob);
};


  const uploadAnswer = async (audioBlob) => {
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("audio", audioBlob, "answer.webm")

      const response = await fetch(
        `http://localhost:8000/api/upload-answer/${sessionData.session_id}/${currentQuestion.id}`,
        { method: "POST", body: formData }
      )

      if (!response.ok) throw new Error("Upload failed")

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else {
        await analyzeInterview()
      }

    } catch (err) {
      console.error("Upload error:", err)
      alert("Failed to upload answer.")
    } finally {
      setUploading(false)
    }
  }

  const analyzeInterview = async () => {
    setAnalyzing(true)
    stopCamera()

    try {
      const response = await fetch(
        `http://localhost:8000/api/analyze/${sessionData.session_id}`,
        { method: 'POST' }
      )

      if (!response.ok) throw new Error("Analysis failed")

      onComplete()
    } catch (error) {
      console.error("Analysis error:", error)
      alert("Failed to analyze. Check backend.")
      onComplete()
    }
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = String(seconds % 60).padStart(2, "0")
    return `${m}:${s}`
  }

  return (
    <div className="interview-screen">
      <div className="interview-header">
        <div className="progress-info">
          <span className="question-number">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="interview-content">
        <div className="video-section">
          <video ref={videoRef} autoPlay playsInline muted className="video-feed" />

          {recording && (
            <div className="recording-indicator">
              <span className="recording-dot"></span> Recording
            </div>
          )}

          <div className="timer">{formatTime(timeLeft)}</div>
        </div>

        <div className="question-section">
          <button
            className="next-btn"
            onClick={handleNextQuestion}
            disabled={uploading || analyzing}
          >
            Next
          </button>

          <h2 className="question-title">Your Question</h2>
          <p className="question-text">{currentQuestion?.text}</p>

          {uploading && <div className="status-message">Uploading your answer...</div>}
          {analyzing && <div className="status-message analyzing">Analyzing interview...</div>}
        </div>
      </div>

      <div className="interview-footer">
        <div className="question-grid">
          {questions.map((q, i) => (
            <div
              key={q.id}
              className={`question-indicator ${
                i < currentQuestionIndex ? "completed" :
                i === currentQuestionIndex ? "active" : ""
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InterviewScreen
