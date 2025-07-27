import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ChevronLeft } from 'lucide-react';

interface QuizSliderProps {
  question: string;
  description?: string;
  min: number;
  max: number;
  onAnswer: (value: number) => void;
  onBack?: () => void;
  onAskQuestion: (question: string) => void;
  compact?: boolean;
}

export function QuizSlider({
  question,
  description,
  min,
  max,
  onAnswer,
  onBack,
  onAskQuestion,
  compact = false,
}: QuizSliderProps) {
  const [value, setValue] = useState([Math.floor((min + max) / 2)]);
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = () => {
    onAnswer(value[0]);
  };

  const handleAskQuestion = () => {
    setShowHelp(true);
  };

  const generateMarkers = () => {
    const count = 9; // show 9 ticks
    return Array.from({ length: count }, (_, i) =>
      Math.round(min + ((max - min) / (count - 1)) * i)
    );
  };

  return (
    <div className={compact ? "w-full" : "w-full max-w-md mx-auto"}>
      <Card
        className={
          compact
            ? "p-4 bg-muted/30 shadow-sm border"
            : "p-6 bg-quiz-card shadow-quiz border-0"
        }
      >
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
          <div className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold text-lg flex-1 text-center">
            {question}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2">Your age</h3>
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
          </div>

          {/* Age display */}
          <div className="text-center">
            <span className="text-4xl font-bold text-primary">{value[0]}</span>
          </div>

          {/* Slider */}
          <div className="px-4">
            <Slider
              value={value}
              onValueChange={setValue}
              max={max}
              min={min}
              step={1}
              className="w-full"
            />
            {/* Dynamic Tick Marks */}
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              {generateMarkers().map((marker, index) => (
                <span key={index}>{marker}</span>
              ))}
            </div>
          </div>

          {/* Help section */}
          {showHelp && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Age helps us provide recommendations that are appropriate for your life stage and health considerations.
              </p>
            </div>
          )}

          {/* Action button */}
          <div className="space-y-3">
            <Button
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/90 rounded-full py-3"
              size="lg"
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
