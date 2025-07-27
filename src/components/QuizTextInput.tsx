import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

interface QuizTextInputProps {
  question: string;
  description?: string;
  type: "textInput" | "numberInput";
  onAnswer: (value: string | number) => void;
  onBack?: () => void;
  onAskQuestion: (question: string) => void;
  compact?: boolean;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
  };
}

export function QuizTextInput({
  question,
  description,
  type,
  onAnswer,
  onBack,
  onAskQuestion,
  compact = false,
  validation,
}: QuizTextInputProps) {
  const [value, setValue] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = () => {
    if (validation?.required && !value.trim()) return;

    if (type === "numberInput") {
      const numValue = parseFloat(value);
      if (validation?.min && numValue < validation.min) return;
      if (validation?.max && numValue > validation.max) return;
      onAnswer(numValue);
    } else {
      onAnswer(value.trim());
    }
  };

  const handleAskQuestion = () => {
    setShowHelp(true);
  };

  const isValid = () => {
    if (validation?.required && !value.trim()) return false;

    if (type === "numberInput") {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return false;
      if (validation?.min && numValue < validation.min) return false;
      if (validation?.max && numValue > validation.max) return false;
    }

    return true;
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
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-center">{question}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {description && (
            <p className="text-muted-foreground text-sm text-center">
              {description}
            </p>
          )}

          {/* Input */}
          <div className="space-y-2">
            {type === "textInput" ? (
              <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-[100px] resize-none"
              />
            ) : (
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={
                  validation?.min
                    ? `Enter a number (${validation.min} - ${validation.max})`
                    : "Enter a number"
                }
                min={validation?.min}
                max={validation?.max}
              />
            )}

            {validation?.min && validation?.max && type === "numberInput" && (
              <p className="text-xs text-muted-foreground">
                Please enter a value between {validation.min} and{" "}
                {validation.max}
              </p>
            )}
          </div>

          {/* Help section */}
          {showHelp && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {type === "numberInput"
                  ? "Please enter an accurate number to help us provide the best recommendations for you."
                  : "Take your time to describe your goals. The more detail you provide, the better we can personalize your recommendations."}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/90 rounded-full py-3"
              size="lg"
              disabled={!isValid()}
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}