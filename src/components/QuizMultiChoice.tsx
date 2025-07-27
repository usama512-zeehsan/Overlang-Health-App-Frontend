import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft } from 'lucide-react';
import { QuizOption } from '@/types/quiz';

interface QuizMultiChoiceProps {
  question: string;
  description?: string;
  options: QuizOption[];
  onAnswer: (selectedValues: string[]) => void;
  onBack?: () => void;
  onAskQuestion: (question: string) => void;
  compact?: boolean;
}

export function QuizMultiChoice({ 
  question, 
  description, 
  options, 
  onAnswer, 
  onBack,
  onAskQuestion,
  compact = false
}: QuizMultiChoiceProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  const handleOptionChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      setSelectedValues(prev => [...prev, optionValue]);
    } else {
      setSelectedValues(prev => prev.filter(value => value !== optionValue));
    }
  };

  const handleSubmit = () => {
    onAnswer(selectedValues);
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
              <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={option.id}
                  checked={selectedValues.includes(option.value as string)}
                  onCheckedChange={(checked) => 
                    handleOptionChange(option.value as string, checked as boolean)
                  }
                  className="h-5 w-5"
                />
                <label 
                  htmlFor={option.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>

          {/* Help section */}
          {showHelp && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Select all conditions that apply to you. This information helps us provide personalized recommendations and is kept completely confidential.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/90 rounded-full py-3"
              size="lg"
              disabled={selectedValues.length === 0}
            >
              Continue
            </Button>
            
            
          </div>
        </div>
      </Card>
    </div>
  );
}