import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Vote, PlusCircle, BarChart3, ArrowLeft } from 'lucide-react';
import { CreatePollForm } from './components/CreatePollForm';
import { PollCard } from './components/PollCard';
import { VoteHistogram } from './components/VoteHistogram';

interface Poll {
  id: number;
  title: string;
  options: {
    text: string;
    votes: number;
  }[];
  totalVotes: number;
}

// Initial mock data
const initialPolls: Poll[] = [
  {
    id: 1,
    title: "What's your favorite programming language?",
    options: [
      { text: 'JavaScript', votes: 150 },
      { text: 'Python', votes: 120 },
      { text: 'Java', votes: 80 },
      { text: 'C++', votes: 60 }
    ],
    totalVotes: 410
  },
  {
    id: 2,
    title: "Best framework for web development?",
    options: [
      { text: 'React', votes: 200 },
      { text: 'Vue', votes: 150 },
      { text: 'Angular', votes: 100 },
      { text: 'Svelte', votes: 80 }
    ],
    totalVotes: 530
  }
];

function PollDetails({ polls, onVote }: { polls: Poll[], onVote: (pollId: number, option: string) => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>();
  
  const poll = polls.find(p => p.id === Number(id));
  
  if (!poll) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Poll not found</h2>
          <p className="mt-2 text-gray-600">The poll you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={20} />
            Back to Polls
          </button>
        </div>
      </div>
    );
  }

  const handleVote = (option: string) => {
    setSelectedOption(option);
    onVote(poll.id, option);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Polls
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{poll.title}</h2>
        <VoteHistogram
          options={poll.options}
          totalVotes={poll.totalVotes}
          selectedOption={selectedOption}
          onVote={handleVote}
        />
      </div>
    </div>
  );
}

function Home({ polls }: { polls: Poll[] }) {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2">
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            title={poll.title}
            options={poll.options.map(o => o.text)}
            votes={poll.totalVotes}
            onClick={() => navigate(`/poll/${poll.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

function CreatePoll({ onCreatePoll }: { onCreatePoll: (title: string, options: string[]) => void }) {
  const navigate = useNavigate();

  const handleCreatePoll = (title: string, options: string[]) => {
    onCreatePoll(title, options);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Poll</h1>
      <CreatePollForm onSubmit={handleCreatePoll} />
    </div>
  );
}

function App() {
  const [polls, setPolls] = useState<Poll[]>(initialPolls);

  const handleCreatePoll = (title: string, options: string[]) => {
    const newPoll: Poll = {
      id: Math.max(...polls.map(p => p.id)) + 1,
      title,
      options: options.map(text => ({ text, votes: 0 })),
      totalVotes: 0
    };

    setPolls([...polls, newPoll]);
  };

  const handleVote = (pollId: number, option: string) => {
    setPolls(currentPolls => 
      currentPolls.map(poll => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map(opt => ({
            ...opt,
            votes: opt.text === option ? opt.votes + 1 : opt.votes
          }));
          return {
            ...poll,
            options: updatedOptions,
            totalVotes: poll.totalVotes + 1
          };
        }
        return poll;
      })
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-2 text-blue-600">
                  <Vote size={24} />
                  <span className="font-semibold text-xl">PollMaster</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to="/create"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <PlusCircle size={20} />
                  <span>Create Poll</span>
                </Link>
                <Link
                  to="/results"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <BarChart3 size={20} />
                  <span>Results</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home polls={polls} />} />
          <Route path="/create" element={<CreatePoll onCreatePoll={handleCreatePoll} />} />
          <Route path="/poll/:id" element={<PollDetails polls={polls} onVote={handleVote} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;