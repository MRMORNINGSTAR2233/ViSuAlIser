"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ErrorMessageDisplayProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  isQueryClarification?: boolean;
  onSubmitResponse?: (response: string) => void;
}

export function ErrorMessageDisplay({
  isVisible,
  message,
  onClose,
  isQueryClarification = false,
  onSubmitResponse,
}: ErrorMessageDisplayProps) {
  const [response, setResponse] = useState("");
  
  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <div className={`flex items-center justify-center h-5 w-5 ${isQueryClarification ? "text-blue-500" : "text-red-500"}`}>
              {isQueryClarification ? "?" : "!"} 
            </div>
            <h3 className="font-medium">
              {isQueryClarification ? "Clarification Needed" : "Error"}
            </h3>
          </div>
          <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {message}
          </p>
          
          {isQueryClarification && onSubmitResponse && (
            <div className="mt-4 space-y-2">
              <textarea
                placeholder="Type your clarification here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="w-full min-h-24 resize-none border border-gray-300 dark:border-gray-600 rounded-md p-2"
              />
              
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
                  onClick={() => {
                    if (response.trim() && onSubmitResponse) {
                      onSubmitResponse(response);
                      setResponse("");
                    }
                  }}
                  disabled={!response.trim()}
                >
                  Send Response
                </Button>
              </div>
            </div>
          )}
          
          {!isQueryClarification && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClose}
              className="mt-4"
            >
              Dismiss
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 