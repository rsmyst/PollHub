import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface CreatePollFormProps {
  onSubmit: (title: string, options: string[]) => void;
}

export function CreatePollForm({ onSubmit }: CreatePollFormProps) {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty options
    const validOptions = options.filter(option => option.trim() !== '');
    
    if (validOptions.length < 2) {
      alert('Please add at least 2 options');
      return;
    }

    onSubmit(title, validOptions);
    
    // Reset form
    setTitle('');
    setOptions(['', '']);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Poll Question
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="What would you like to ask?"
          required
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        {options.map((option, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={`Option ${index + 1}`}
              required
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addOption}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
      >
        <Plus size={16} />
        Add Option
      </button>

      <button
        type="submit"
        className={cn(
          "w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        )}
      >
        Create Poll
      </button>
    </form>
  );
}