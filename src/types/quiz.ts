export interface QuizQuestion {
  id: string;
  type: 'singleChoice' | 'multiChoice' | 'textInput' | 'numberInput' | 'slider';
  question: string;
  description?: string;
  options?: QuizOption[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  next?: string | ((answer: any) => string);
}

export interface QuizOption {
  id: string;
  label: string;
  value: string | number;
}

export interface QuizAnswer {
  questionId: string;
  value: any;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  isQuestion?: boolean;
  questionId?: string;
  questionData?: QuizQuestion;
}

export interface QuizState {
  currentQuestionId: string | null;
  answers: Record<string, any>;
  chatMessages: ChatMessage[];
  isComplete: boolean;
  canAskQuestions: boolean;
}