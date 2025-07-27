"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { ChatMessage, QuizQuestion } from "@/types/quiz";
import { QuizSlider } from "./QuizSlider";
import { QuizMultiChoice } from "./QuizMultiChoice";
import { QuizSingleChoice } from "./QuizSingleChoice";
import { QuizTextInput } from "./QuizTextInput";
import { EmailCaptureInline } from "@/components/EmailCaptureInline";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
  currentQuestion?: QuizQuestion | null;
  onAnswer?: (value: any) => void;
  isComplete?: boolean;
}

export function ChatInterface({
  messages,
  onSendMessage,
  isTyping,
  currentQuestion,
  onAnswer,
  isComplete,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  console.log(messages);

return (
  <div className="flex flex-col h-full max-w-2xl mx-auto">
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`flex items-start space-x-2 max-w-[80%] ${
              message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {message.type === "user" ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>

            <div className="space-y-2">
              <Card
                className={`p-3 ${
                  message.type === "user"
                    ? "bg-chat-bubble-user text-primary-foreground border-0"
                    : "bg-chat-bubble-bot border border-border"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </Card>

              {messages.length - 1 === index &&
                currentQuestion &&
                onAnswer &&
                message.type === "bot" && (
                  <div className="ml-10">
                    {currentQuestion.type === "slider" && (
                      <QuizSlider
                        question={currentQuestion.question}
                        description={currentQuestion.description}
                        min={currentQuestion.validation?.min || 18}
                        max={currentQuestion.validation?.max || 100}
                        onAnswer={onAnswer}
                        onAskQuestion={(q) => onSendMessage(q)}
                        compact={true}
                      />
                    )}

                    {currentQuestion.type === "multiChoice" &&
                      currentQuestion.options && (
                        <QuizMultiChoice
                          question={currentQuestion.question}
                          description={currentQuestion.description}
                          options={currentQuestion.options}
                          onAnswer={onAnswer}
                          onAskQuestion={(q) => onSendMessage(q)}
                          compact={true}
                        />
                      )}

                    {currentQuestion.type === "singleChoice" &&
                      currentQuestion.options && (
                        <QuizSingleChoice
                          question={currentQuestion.question}
                          description={currentQuestion.description}
                          options={currentQuestion.options}
                          onAnswer={onAnswer}
                          onAskQuestion={(q) => onSendMessage(q)}
                          compact={true}
                        />
                      )}

                    {(currentQuestion.type === "textInput" ||
                      currentQuestion.type === "numberInput") && (
                      <QuizTextInput
                        question={currentQuestion.question}
                        description={currentQuestion.description}
                        type={currentQuestion.type}
                        validation={currentQuestion.validation}
                        onAnswer={onAnswer}
                        onAskQuestion={(q) => onSendMessage(q)}
                        compact={true}
                      />
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <Card className="bg-chat-bubble-bot border border-border p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Email Capture after chat ends */}
      {isComplete && <EmailCaptureInline />}
      <div ref={messagesEndRef} />
    </div>

    {/* You can keep the input field hidden if the quiz is complete */}
    {/* <div className="border-t border-border p-4"> ... </div> */}
  </div>
);

}