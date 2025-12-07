import { useState } from 'react'
import SetupScreen from './components/SetupScreen'
import InterviewScreen from './components/InterviewScreen'
import ResultsScreen from './components/ResultsScreen'
import './App.css'

function App() {
  const [screen, setScreen] = useState('setup')
  const [sessionData, setSessionData] = useState(null)

  const handleSessionCreated = (data) => {
    setSessionData(data)
    setScreen('interview')
  }

  const handleInterviewComplete = () => {
    setScreen('results')
  }

  const handleStartNew = () => {
    setSessionData(null)
    setScreen('setup')
  }

  return (
    <div className="app">
      {screen === 'setup' && (
        <SetupScreen onSessionCreated={handleSessionCreated} />
      )}
      {screen === 'interview' && sessionData && (
        <InterviewScreen
          sessionData={sessionData}
          onComplete={handleInterviewComplete}
        />
      )}
      {screen === 'results' && sessionData && (
        <ResultsScreen
          sessionId={sessionData.session_id}
          onStartNew={handleStartNew}
        />
      )}
    </div>
  )
}

export default App
