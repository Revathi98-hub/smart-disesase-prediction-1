import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, User, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { chatbotAI } from "@/services/chatbotAI";
import { datasetLoader } from "@/services/datasetLoader";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  urgency?: "low" | "moderate" | "high";
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI health assistant powered by comprehensive medical datasets including symptoms, diseases, precautions, workouts, and dietary recommendations. I can provide complete health solutions to solve your problems. What health concerns can I help you with today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    // Load the comprehensive health dataset when component mounts
    datasetLoader.loadSampleDataset();
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userMessage: string): Promise<{ text: string; urgency?: "low" | "moderate" | "high" }> => {
    try {
      const response = await chatbotAI.generateResponse(userMessage);
      
      // Determine urgency based on response content
      let urgency: "low" | "moderate" | "high" = "low";
      if (response.includes("🚨") || response.includes("EMERGENCY")) {
        urgency = "high";
      } else if (response.includes("⚠️") || response.includes("seek medical")) {
        urgency = "moderate";
      }
      
      return { text: response, urgency };
    } catch (error) {
      console.error("Error getting AI response:", error);
      return { 
        text: "I'm having trouble processing your request. For immediate health concerns, please consult a healthcare professional or use our Symptom Checker below.",
        urgency: "low"
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToProcess = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      // Get AI-powered response
      const aiResponse = await generateBotResponse(messageToProcess);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: "bot",
        timestamp: new Date(),
        urgency: aiResponse.urgency,
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error processing message:", error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm experiencing technical difficulties. Please try again or consult a healthcare professional for immediate concerns.",
        sender: "bot",
        timestamp: new Date(),
        urgency: "low",
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-300 z-50",
          "bg-gradient-primary hover:shadow-[var(--shadow-medical)] hover:scale-110",
          isOpen && "opacity-0 pointer-events-none"
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-80 h-96 z-50 transition-all duration-300 transform",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <Card className="h-full flex flex-col medical-card border-primary/20">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary rounded-t-xl">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary-foreground" />
              <div className="flex flex-col">
                <span className="font-semibold text-primary-foreground">AI Health Assistant</span>
                <span className="text-xs text-primary-foreground/80">Powered by Medical AI</span>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === "bot" && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  <div className="flex flex-col max-w-[80%]">
                    <div
                      className={cn(
                        "p-3 rounded-lg text-sm",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {message.text}
                    </div>
                    {message.sender === "bot" && message.urgency && message.urgency !== "low" && (
                      <Badge 
                        variant={message.urgency === "high" ? "destructive" : "secondary"}
                        className="mt-1 w-fit text-xs"
                      >
                        {message.urgency === "high" ? "🚨 Emergency" : "⚠️ Important"}
                      </Badge>
                    )}
                  </div>
                  {message.sender === "user" && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <User className="h-3 w-3 text-accent-foreground" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your health..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};