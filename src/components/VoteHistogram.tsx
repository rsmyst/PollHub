import React from 'react';
import { cn } from '../lib/utils';

interface VoteHistogramProps {
  options: {
    text: string;
    votes: number;
  }[];
  totalVotes: number;
  selectedOption?: string;
  onVote?: (option: string) => void;
}

export function VoteHistogram({ options, totalVotes, selectedOption, onVote }: VoteHistogramProps) {
  const maxVotes = Math.max(...options.map(option => option.votes));

  return (
    <div className="space-y-4">
      {options.map((option) => {
        const percentage = totalVotes === 0 ? 0 : (option.votes / totalVotes) * 100;
        
        return (
          <div key={option.text} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-700">{option.text}</span>
              <span className="text-gray-500">{option.votes} votes ({percentage.toFixed(1)}%)</span>
            </div>
            <div className="relative h-14 flex items-center">
              <div 
                className="absolute h-8 bg-blue-100 rounded-md transition-all duration-500 ease-out"
                style={{ 
                  width: `${maxVotes === 0 ? 0 : (option.votes / maxVotes) * 100}%`,
                  minWidth: '2rem'
                }}
              />
              <button
                onClick={() => onVote?.(option.text)}
                disabled={!onVote || selectedOption !== undefined}
                className={cn(
                  "relative w-full h-8 px-4 text-left",
                  "rounded-md transition-colors duration-200",
                  "hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
                  selectedOption === option.text && "bg-blue-500 text-white hover:bg-blue-500",
                  !onVote && "cursor-default",
                  selectedOption !== undefined && selectedOption !== option.text && "opacity-50"
                )}
              >
                {onVote && !selectedOption && (
                  <span className="text-sm text-blue-600">Click to vote</span>
                )}
              </button>
            </div>
          </div>
        );
      })}
      <div className="text-sm text-gray-500 mt-4">
        Total votes: {totalVotes}
      </div>
    </div>
  );
}