import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeTheme, applyColorScheme } from "@/lib/themeManager";
import TopicSelection from "./pages/TopicSelection";
import Landing from "./pages/Landing";
import QuizBoard from "./pages/QuizBoard";
import GameEnd from "./pages/GameEnd";
import NotFound from "./pages/NotFound";
import quizData from "@/football_quiz_100_questions.json";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Check if there's a selected theme in localStorage
    const storedTheme = localStorage.getItem('selectedTheme');
    
    if (storedTheme) {
      try {
        const parsedTheme = JSON.parse(storedTheme);
        // Apply the stored theme
        applyColorScheme(parsedTheme.colorScheme);
      } catch (error) {
        console.warn('Failed to parse stored theme:', error);
        // Fallback to default theme if parsing fails
        const defaultTheme = quizData[0]?.football?.theme;
        initializeTheme(defaultTheme);
      }
    } else {
      // Initialize with default theme if no stored theme
      const defaultTheme = quizData[0]?.football?.theme;
      initializeTheme(defaultTheme);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TopicSelection />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/quiz" element={<QuizBoard />} />
            <Route path="/results" element={<GameEnd />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
