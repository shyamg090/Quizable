import { Routes, Route } from 'react-router-dom';
import ThemeOptions from './pages/ThemeOptions';
import Landing from './pages/Landing';
import QuizBoard from './pages/QuizBoard';
import Results from './pages/Results';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ThemeOptions />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/quiz" element={<QuizBoard />} />
        <Route path="/quizboard" element={<QuizBoard />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
