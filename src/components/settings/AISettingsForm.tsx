"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import {
  useAISettingsStore,
  type AIProvider,
} from "@/lib/store/useAISettingsStore";
import { DEFAULT_MODELS } from "@/lib/ai/aiService";
import { toast } from "sonner";

interface AISettingsFormProps {
  onSave?: () => void;
  onCancel?: () => void;
}

export function AISettingsForm({ onSave, onCancel }: AISettingsFormProps) {
  const settings = useAISettingsStore();

  // Local state
  const [localKeys, setLocalKeys] = useState({
    openai: "",
    google: "",
    anthropic: "",
  });

  const [localModel, setLocalModel] = useState("");

  // Sync with store on mount
  useEffect(() => {
    setLocalKeys({
      openai: settings.openaiKey,
      google: settings.googleKey,
      anthropic: settings.anthropicKey,
    });
    setLocalModel(
      settings.selectedModel || DEFAULT_MODELS[settings.selectedProvider],
    );
  }, [
    settings.openaiKey,
    settings.googleKey,
    settings.anthropicKey,
    settings.selectedProvider,
    settings.selectedModel,
  ]);

  const handleSave = () => {
    settings.setOpenAIKey(localKeys.openai);
    settings.setGoogleKey(localKeys.google);
    settings.setAnthropicKey(localKeys.anthropic);

    // Only save model if it's changed (or defaulting)
    if (localModel) {
      settings.setSelectedModel(localModel);
    }

    toast.success("AI settings saved successfully");
    if (onSave) onSave();
  };

  const handleProviderChange = (provider: AIProvider) => {
    settings.setSelectedProvider(provider);
    // Reset model to default for that provider
    setLocalModel(DEFAULT_MODELS[provider]);
  };

  return (
    <div className="space-y-6">
      {/* Provider Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Provider
          </Label>
          <Select
            value={settings.selectedProvider}
            onValueChange={(val) => handleProviderChange(val as AIProvider)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">
                <div className="flex items-center gap-2">
                  <span>OpenAI</span>
                  {settings.openaiKey ? (
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  ) : null}
                </div>
              </SelectItem>
              <SelectItem value="google">
                <div className="flex items-center gap-2">
                  <span>Google Gemini</span>
                  {settings.googleKey ? (
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  ) : null}
                </div>
              </SelectItem>
              <SelectItem value="anthropic">
                <div className="flex items-center gap-2">
                  <span>Anthropic Claude</span>
                  {settings.anthropicKey ? (
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  ) : null}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Model
          </Label>
          <Select value={localModel} onValueChange={setLocalModel}>
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {settings.selectedProvider === "openai" && (
                <>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                </>
              )}
              {settings.selectedProvider === "google" && (
                <>
                  <SelectItem value="gemini-1.5-flash">
                    Gemini 1.5 Flash
                  </SelectItem>
                  <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                </>
              )}
              {settings.selectedProvider === "anthropic" && (
                <>
                  <SelectItem value="claude-3-haiku-20240307">
                    Claude 3 Haiku
                  </SelectItem>
                  <SelectItem value="claude-3-5-sonnet-20240620">
                    Claude 3.5 Sonnet
                  </SelectItem>
                  <SelectItem value="claude-3-opus-20240229">
                    Claude 3 Opus
                  </SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t" />

      {/* API Keys */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">API Keys</h4>

        {/* OpenAI Key */}
        <div
          className={`space-y-2 ${
            settings.selectedProvider !== "openai"
              ? "opacity-50 hover:opacity-100 transition-opacity"
              : ""
          }`}
        >
          <Label
            htmlFor="openai-key"
            className="flex items-center gap-2 text-xs"
          >
            <span>OpenAI API Key</span>
            {settings.openaiKey && <Check className="h-3 w-3 text-green-500" />}
          </Label>
          <div className="relative">
            <Input
              id="openai-key"
              type="password"
              placeholder="sk-..."
              className="h-9 text-sm"
              value={localKeys.openai}
              onChange={(e) =>
                setLocalKeys({ ...localKeys, openai: e.target.value })
              }
            />
          </div>
        </div>

        {/* Google Key */}
        <div
          className={`space-y-2 ${
            settings.selectedProvider !== "google"
              ? "opacity-50 hover:opacity-100 transition-opacity"
              : ""
          }`}
        >
          <Label
            htmlFor="google-key"
            className="flex items-center gap-2 text-xs"
          >
            <span>Google API Key</span>
            {settings.googleKey && <Check className="h-3 w-3 text-green-500" />}
          </Label>
          <div className="relative">
            <Input
              id="google-key"
              type="password"
              placeholder="AIzaSy..."
              className="h-9 text-sm"
              value={localKeys.google}
              onChange={(e) =>
                setLocalKeys({ ...localKeys, google: e.target.value })
              }
            />
          </div>
        </div>

        {/* Anthropic Key */}
        <div
          className={`space-y-2 ${
            settings.selectedProvider !== "anthropic"
              ? "opacity-50 hover:opacity-100 transition-opacity"
              : ""
          }`}
        >
          <Label
            htmlFor="anthropic-key"
            className="flex items-center gap-2 text-xs"
          >
            <span>Anthropic API Key</span>
            {settings.anthropicKey && (
              <Check className="h-3 w-3 text-green-500" />
            )}
          </Label>
          <div className="relative">
            <Input
              id="anthropic-key"
              type="password"
              placeholder="sk-ant-..."
              className="h-9 text-sm"
              value={localKeys.anthropic}
              onChange={(e) =>
                setLocalKeys({ ...localKeys, anthropic: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSave}>Save Configuration</Button>
      </div>
    </div>
  );
}
