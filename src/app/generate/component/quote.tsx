"use client";
import React, { useState } from "react";
import { generateQuote } from "@/app/api/generate-quote";

export const tones: { label: string }[] = [
  {
    label: "Motivational",
  },
  {
    label: "Inspirational",
  },
  {
    label: "Life",
  },
  {
    label: "Humorous",
  },
  {
    label: "Love",
  },
  {
    label: "Sarcastic",
  },
];

export const Quote: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState<string>("");
  const [generatedQuote, setGeneratedQuote] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateQuote = async () => {
    try {
      setIsLoading(true);
      const quote = await generateQuote(selectedTone);
      setGeneratedQuote(quote);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto bg-white/80 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 shadow-sm rounded-lg p-6 space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Choose a Tone
        </label>
        <select
          value={selectedTone}
          onChange={(e) => {
            setSelectedTone(e.target.value);
          }}
          className="w-full max-w-md rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>-- Select Tone --</option>
          {tones.map((tone) => (
            <option key={tone.label} value={tone.label}>
              {tone.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Output
        </label>
        <div className="relative">
          <textarea
            value={generatedQuote}
            onChange={(e) => setGeneratedQuote(e.target.value)}
            rows={6}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 pr-14 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your quote will appear here..."
          />

          <button
            type="button"
            aria-label="Copy to clipboard"
            title="Copy"
            onClick={() => navigator.clipboard?.writeText(generatedQuote || "")}
            className="absolute right-2 top-2 inline-flex items-center justify-center w-9 h-9 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 21H8a2 2 0 0 1-2-2V7h2v12h8v2z"
              />
              <rect
                x="9"
                y="3"
                width="10"
                height="12"
                rx="2"
                ry="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 justify-end mt-3">
          <button
            type="button"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer transition"
            onClick={handleGenerateQuote}
          >
            {isLoading ? "Generating...." : "Generate"}
          </button>

          <button
            type="button"
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
            onClick={() => {
              setSelectedTone("");
              setGeneratedQuote("");
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
