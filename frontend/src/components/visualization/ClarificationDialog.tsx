"use client";

import { useState } from "react";
import { 
  AlertCircle, 
  HelpCircle, 
  X, 
  ChevronRight, 
  MessageSquareQuestion,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ClarificationRequest } from "@/lib/config";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ClarificationDialogProps {
  isVisible: boolean;
  errorMessage?: string;
  clarificationRequest?: ClarificationRequest;
  onClose: () => void;
  onSubmitResponse: (response: string) => void;
  className?: string;
}

export default function ClarificationDialog({
  isVisible,
  errorMessage,
  clarificationRequest,
  onClose,
  onSubmitResponse,
  className,
}: ClarificationDialogProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [customResponse, setCustomResponse] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  if (!isVisible) return null;

  const hasOptions = clarificationRequest?.options && clarificationRequest.options.length > 0;
  const isError = !!errorMessage && !clarificationRequest;

  const handleSubmit = () => {
    if (showCustomInput && customResponse) {
      onSubmitResponse(customResponse);
      setCustomResponse("");
      setShowCustomInput(false);
    } else if (selectedOption) {
      onSubmitResponse(selectedOption);
      setSelectedOption("");
    }
  };

  return (
    <div className={cn(
      "fixed inset-x-0 bottom-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-10 duration-300",
      className
    )}>
      <div className="max-w-2xl mx-auto bg-card rounded-xl border shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            {isError ? (
              <AlertCircle className="h-5 w-5 text-destructive" />
            ) : (
              <MessageSquareQuestion className="h-5 w-5 text-primary" />
            )}
            <h3 className="font-medium">
              {isError ? "Error" : "Clarification Needed"}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {isError ? (
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {errorMessage || "An error occurred while processing your request."}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={onClose}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">
                    {clarificationRequest?.message || "I need more information to process your request:"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 italic">
                    "{clarificationRequest?.query || ""}"
                  </p>
                </div>
              </div>

              {hasOptions && (
                <div className="mt-4 space-y-4">
                  <Separator />
                  <RadioGroup 
                    value={selectedOption} 
                    onValueChange={setSelectedOption}
                    className="space-y-3"
                  >
                    {clarificationRequest?.options?.map((option, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${i}`} />
                        <Label 
                          htmlFor={`option-${i}`}
                          className="cursor-pointer text-sm font-normal"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="custom" 
                        id="option-custom"
                        onClick={() => setShowCustomInput(true)}
                      />
                      <Label 
                        htmlFor="option-custom"
                        className="cursor-pointer text-sm font-normal"
                      >
                        Other (provide custom response)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {(showCustomInput || !hasOptions) && (
                <div className="mt-4 space-y-2">
                  <Separator />
                  <Label htmlFor="customResponse" className="text-sm">
                    Your response:
                  </Label>
                  <Textarea
                    id="customResponse"
                    placeholder="Type your clarification here..."
                    value={customResponse}
                    onChange={(e) => setCustomResponse(e.target.value)}
                    className="min-h-24 resize-none focus-visible:ring-primary"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSubmit}
                  disabled={(showCustomInput && !customResponse) || (!showCustomInput && !selectedOption && !customResponse)}
                  className="gap-1"
                >
                  <Send className="h-4 w-4 mr-1" />
                  Send Response
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 