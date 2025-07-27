"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { ChatInterface } from './ChatInterface';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { quizQuestions } from '@/data/quizQuestions';
import { ChatMessage, QuizState } from '@/types/quiz';
import { DailyStreakTip } from "@/components/DailyStreakTip";

import { EmailCaptureForm } from "@/components/EmailCaptureForm";

export function QuizEngine() {
  const router = useRouter();

  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionId: 'welcome',
    answers: {},
    chatMessages: [],
    isComplete: false,
    canAskQuestions: false,
  });
  const [isTyping, setIsTyping] = useState(false);
  const [recommendationLoading, setRecommendationLoading] = useState(false);

  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: '1',
      type: 'bot',
      content: "Welcome to Overang AI Health Platform! I'm here to help you get personalized health recommendations. Let's start with a few questions to understand your health profile better.",
      timestamp: new Date(),
    };

    setTimeout(() => {
      const firstQuestion = quizQuestions['age'];
      const questionMessage: ChatMessage = {
        id: '2',
        type: 'bot',
        content: firstQuestion.question,
        timestamp: new Date(),
        questionData: firstQuestion,
      };

      setQuizState(prev => ({
        ...prev,
        currentQuestionId: 'age',
        chatMessages: [welcomeMessage, questionMessage],
        canAskQuestions: true,
      }));
    }, 1500);
  }, []);

  const currentQuestion = quizState.currentQuestionId
    ? quizQuestions[quizState.currentQuestionId]
    : null;

  const handleAnswer = (value: any) => {
    if (!currentQuestion) return;
    const newAnswers = { ...quizState.answers, [currentQuestion.id]: value };

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: formatAnswerForChat(currentQuestion, value),
      timestamp: new Date(),
    };

    let nextQuestionId: string | null = null;
    if (typeof currentQuestion.next === 'function') {
      nextQuestionId = currentQuestion.next(value);
    } else if (typeof currentQuestion.next === 'string') {
      nextQuestionId = currentQuestion.next;
    }
    const isComplete = nextQuestionId === 'complete' || !nextQuestionId;

    setQuizState(prev => ({
      ...prev,
      answers: newAnswers,
      currentQuestionId: isComplete ? null : nextQuestionId,
      isComplete,
      chatMessages: [...prev.chatMessages, userMessage],
    }));

    if (!isComplete && nextQuestionId) {
      setTimeout(() => {
        const nextQuestion = quizQuestions[nextQuestionId];
        if (nextQuestion) {
          const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            content: `Great! Now let's move on to: ${nextQuestion.question}`,
            timestamp: new Date(),
          };

          setQuizState(prev => ({
            ...prev,
            chatMessages: [...prev.chatMessages, botMessage],
          }));
        }
      }, 1000);
    } else if (isComplete) {
      setTimeout(() => {
        const completionMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `Thanks for completing! Your personalized health recommendations are ready.Just click the "Get Recommendations" button to check them out.`,
          timestamp: new Date(),
        };

        setQuizState(prev => ({
          ...prev,
          chatMessages: [...prev.chatMessages, completionMessage],
        }));
      }, 1000);
    }
  };

  const handleChatMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setQuizState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, userMessage],
    }));

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = generateBotResponse(message, currentQuestion);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };

      setQuizState(prev => ({
        ...prev,
        chatMessages: [...prev.chatMessages, botMessage],
      }));
    }, 1500);
  };

  const handleRecommendationsClick = async () => {
    setRecommendationLoading(true);
    try {
      const payload = Object.entries(quizState.answers).map(([question_id, answer]) => ({ question_id, answer }));
      const res = await fetch("http://localhost:8000/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const encoded = encodeURIComponent(JSON.stringify(data));
      router.push(`/recommendation?data=${encoded}`);
    } catch (err) {
      alert("Failed to fetch recommendations.");
    } finally {
      setRecommendationLoading(false);
    }
  };

  const formatAnswerForChat = (question: any, value: any): string => {
    switch (question.type) {
      case 'multiChoice':
        return Array.isArray(value) ? `Selected: ${value.join(', ')}` : `Selected: ${value}`;
      case 'slider':
        return `Age: ${value}`;
      case 'numberInput':
        return `${question.id === 'weight' ? 'Weight:' : 'Value:'} ${value}`;
      case 'textInput':
        return value;
      default:
        return `Selected: ${value}`;
    }
  };

  const generateBotResponse = (msg: string, question: any): string => {
    if (msg.toLowerCase().includes('help') || msg.toLowerCase().includes('explain')) {
      if (question?.id === 'age') return 'Age helps us understand life-stage specific needs.';
      if (question?.id === 'weight') return 'Weight info helps shape nutritional recommendations.';
      return "Happy to help! Let me know if there is anything specific you'd like me to explain.";
    }
    return 'Happy to help!';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">O</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Overang</h1>
              <p className="text-sm text-muted-foreground">AI Health Platform</p>
            </div>
          </div>
          {quizState.isComplete && (
            <Button onClick={handleRecommendationsClick} disabled={recommendationLoading} className="bg-primary">
              <FileText className="w-4 h-4 mr-2" />
              {recommendationLoading ? "Loading..." : "Get Recommendations"}
            </Button>
          )}
        </div>
      </header>

     <main className="container mx-auto h-[calc(100vh-80px)] flex flex-col">
  {quizState.isComplete && (
    <>
      <div className="mb-6">
        <DailyStreakTip />
      </div>
    </>
  )}

  <ChatInterface
    messages={quizState.chatMessages}
    onSendMessage={handleChatMessage}
    isTyping={isTyping}
    currentQuestion={currentQuestion}
    onAnswer={handleAnswer}
    isComplete={quizState.isComplete}
  />
</main>


    </div>
  );
}
