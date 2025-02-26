import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PollCardProps {
  title: string;
  votes: number;
  options: string[];
  onClick: () => void;
}

export function PollCard({ title, votes, options, onClick }: PollCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <ChevronRight className="text-gray-400" />
      </div>
      <div className="space-y-2">
        {options.slice(0, 2).map((option, index) => (
          <div key={index} className="text-gray-600">{option}</div>
        ))}
        {options.length > 2 && (
          <div className="text-gray-400 text-sm">+{options.length - 2} more options</div>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-500">
        {votes} {votes === 1 ? 'vote' : 'votes'}
      </div>
    </div>
  );
}