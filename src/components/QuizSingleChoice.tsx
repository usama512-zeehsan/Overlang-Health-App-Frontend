import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { QuizOption } from '@/types/quiz';

interface QuizSingleChoiceProps {
  question: string;
  description?: string;
  options: QuizOption[];
  onAnswer: (value: string) => void;
  onBack?: () => void;
  onAskQuestion: (question: string) => void;
  compact?: boolean;
}

export function QuizSingleChoice({ 
  question, 
  description, 
  options, 
  onAnswer, 
  onBack,
  onAskQuestion,
  compact = false
}: QuizSingleChoiceProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [showHelp, setShowHelp] = useState(false);

  const handleOptionSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleSubmit = () => {
    if (selectedValue) {
      onAnswer(selectedValue);
    }
  };

  const handleAskQuestion = () => {
    setShowHelp(true);
  };

  return (
    <div className={compact ? "w-full" : "w-full max-w-md mx-auto"}>
      <Card className={compact ? "p-4 bg-muted/30 shadow-sm border" : "p-6 bg-quiz-card shadow-quiz border-0"}>
        {/* Header */}
        <div className="flex items-center mb-6">
          {onBack && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="mr-2 p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-center">{question}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {description && (
            <p className="text-muted-foreground text-sm text-center">{description}</p>
          )}

          {/* Options */}
          <div className="space-y-3">
            {options.map((option) => (
              <Button
                key={option.id}
                variant={selectedValue === option.value ? "default" : "outline"}
                className={`w-full p-4 h-auto text-left justify-start rounded-lg hover:text-primary ${
                  selectedValue === option.value 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => handleOptionSelect(option.value as string)}
              >
                <span className="text-sm font-medium">{option.label}</span>
              </Button>
            ))}
          </div>

          {/* Help section */}
          {showHelp && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Choose the option that best describes your situation. This helps us personalize your recommendations.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/90 rounded-full py-3"
              size="lg"
              disabled={!selectedValue}
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}