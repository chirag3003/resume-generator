"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2, Bot, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/lib/store/useChatStore";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { useAISettingsStore } from "@/lib/store/useAISettingsStore";
import { chatEditResume } from "@/lib/ai/aiService";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const EMPTY_MESSAGES: any[] = []; // Typed as any[] or ChatMessage[] to avoid issues, better to infer or import type if needed but any[] is safe for empty. actually let's use the type from store if possible or just infer.

export function ChatPanel({ resumeId }: { resumeId: string }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = useChatStore(
    (state) => state.chats[resumeId] || EMPTY_MESSAGES,
  );
  const addMessage = useChatStore((state) => state.addMessage);
  const clearChat = useChatStore((state) => state.clearChat);

  const { resumeData, setResumeData } = useResumeStore();
  const settings = useAISettingsStore();

  // Auto-scroll to bottom
  // biome-ignore lint/correctness/useExhaustiveDependencies: <side effect>
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");

    // Add user message
    addMessage(resumeId, {
      role: "user",
      content: userMsg,
    });

    setIsLoading(true);

    try {
      // Check API key
      const provider = settings.selectedProvider;
      if (!settings.hasKey(provider)) {
        addMessage(resumeId, {
          role: "assistant",
          content: `Please configure your ${provider} API key in settings to use the chat assistant.`,
        });
        setIsLoading(false);
        return;
      }

      // Prepare history for AI (exclude IDs and timestamps)
      const historyForAI = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Call AI
      const result = await chatEditResume({
        currentResume: resumeData,
        userMessage: userMsg,
        history: historyForAI,
        settings,
      });

      // Apply updates if any
      if (result.updatedResume) {
        setResumeData(result.updatedResume);
        toast.success("Resume updated!");
      }

      // Add AI response
      addMessage(resumeId, {
        role: "assistant",
        content: result.responseMessage,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to process request");
      addMessage(resumeId, {
        role: "assistant",
        content:
          "Sorry, I encountered an error while processing your request. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-sm">AI Assistant</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-500 hover:text-red-500"
          onClick={() => {
            if (confirm("Clear chat history?")) clearChat(resumeId);
          }}
          title="Clear Chat"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden relative">
        <div ref={scrollRef} className="h-full overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-slate-500 text-sm mt-8 px-4">
              <p>Hi! I can help you edit your resume.</p>
              <p className="mt-2 text-xs">Try saying:</p>
              <ul className="mt-2 space-y-1 text-xs bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                <li>"Change my summary to be more professional"</li>
                <li>"Add a skill for React"</li>
                <li>"Fix the typos in my experience"</li>
              </ul>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-start gap-3 text-sm",
                msg.role === "user" ? "flex-row-reverse" : "flex-row",
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-slate-200 dark:bg-slate-800",
                )}
              >
                {msg.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={cn(
                  "px-3 py-2 rounded-lg max-w-[85%]",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none",
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg rounded-tl-none">
                <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me to edit your resume..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
