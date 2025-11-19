import React, { useState } from 'react';
import { Plan, PlanStatus } from '../types';
import { ThumbsUp, ThumbsDown, MessageCircle, Clock, CheckCircle, AlertTriangle, Bot } from 'lucide-react';
import { generateAIReaction } from '../services/geminiService';

interface PostCardProps {
  plan: Plan;
  isCurrentUser: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ plan, isCurrentUser }) => {
  const [believers, setBelievers] = useState(plan.believers);
  const [doubters, setDoubters] = useState(plan.doubters);
  const [userVote, setUserVote] = useState<'believe' | 'doubt' | null>(null);
  const [comments, setComments] = useState(plan.comments);
  const [isGeneratingComment, setIsGeneratingComment] = useState(false);

  const totalVotes = believers + doubters;
  const believePercent = totalVotes === 0 ? 50 : Math.round((believers / totalVotes) * 100);

  const handleVote = (type: 'believe' | 'doubt') => {
    if (userVote === type) return; // Already voted this way

    if (type === 'believe') {
      setBelievers((prev) => prev + 1);
      if (userVote === 'doubt') setDoubters((prev) => prev - 1);
    } else {
      setDoubters((prev) => prev + 1);
      if (userVote === 'believe') setBelievers((prev) => prev - 1);
    }
    setUserVote(type);
  };

  const triggerAIComment = async (type: 'hater' | 'believer') => {
    setIsGeneratingComment(true);
    try {
      const text = await generateAIReaction(plan.title, plan.description, type);
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          userId: 'ai-bot',
          username: type === 'hater' ? 'AI Doubter' : 'AI Hype',
          text,
          isHater: type === 'hater',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsGeneratingComment(false);
    }
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-6 mb-6 hover:border-zinc-600 transition-colors relative overflow-hidden group">
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        {plan.status === PlanStatus.COMPLETED ? (
          <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-xs font-bold border border-neon-green/50 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> PROVEN
          </span>
        ) : plan.status === PlanStatus.FAILED ? (
          <span className="bg-neon-red/20 text-neon-red px-3 py-1 rounded-full text-xs font-bold border border-neon-red/50 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> FAILED
          </span>
        ) : (
          <span className="bg-yellow-500/20 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/50 flex items-center gap-1 animate-pulse">
            <Clock className="w-3 h-3" /> PENDING
          </span>
        )}
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={plan.user.avatarUrl}
          alt={plan.user.username}
          className="w-12 h-12 rounded-full object-cover border-2 border-brand-border"
        />
        <div>
          <h3 className="font-bold text-white text-lg leading-none">{plan.user.username}</h3>
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{plan.user.title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-black text-white mb-2 italic">{plan.title}</h2>
        <p className="text-gray-300 leading-relaxed">{plan.description}</p>
        <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
           <Clock className="w-4 h-4" /> Deadline: {new Date(plan.deadline).toLocaleDateString()}
        </div>
      </div>

      {/* Proof Section if Completed */}
      {plan.status === PlanStatus.COMPLETED && plan.proofImageUrl && (
        <div className="mb-6 mt-4 rounded-xl overflow-hidden border border-neon-green/30 relative">
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Proof of Execution</div>
            <img src={plan.proofImageUrl} alt="Proof" className="w-full h-64 object-cover" />
        </div>
      )}

      {/* Voting Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
          <span className="text-neon-green">{believers} Believers</span>
          <span className="text-neon-red">{doubters} Doubters</span>
        </div>
        <div className="h-4 bg-zinc-800 rounded-full overflow-hidden flex relative">
          <div
            style={{ width: `${believePercent}%` }}
            className="h-full bg-neon-green transition-all duration-500 relative"
          >
              <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="flex-1 bg-neon-red relative"></div>
          
          {/* Separator Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black z-10 opacity-50" style={{ left: `${believePercent}%` }}></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => handleVote('believe')}
          className={`flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            userVote === 'believe'
              ? 'bg-neon-green text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]'
              : 'bg-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-700'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          BELIEVE
        </button>

        <button
          onClick={() => handleVote('doubt')}
          className={`flex-1 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            userVote === 'doubt'
              ? 'bg-neon-red text-white shadow-[0_0_10px_rgba(244,63,94,0.4)]'
              : 'bg-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-700'
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          DOUBT
        </button>
        
        {!isCurrentUser && (
            <div className="flex gap-1">
                 <button 
                    onClick={() => triggerAIComment('hater')}
                    disabled={isGeneratingComment}
                    className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-neon-red hover:bg-neon-red/10 transition-colors"
                    title="Summon AI Hater"
                 >
                    <Bot className="w-5 h-5" />
                 </button>
            </div>
        )}
      </div>

      {/* Comments Section (Preview) */}
      {comments.length > 0 && (
        <div className="mt-6 pt-6 border-t border-brand-border space-y-3">
          {comments.slice(-3).map((comment) => (
            <div key={comment.id} className={`flex gap-3 text-sm p-3 rounded-lg ${comment.isHater ? 'bg-neon-red/5 border border-neon-red/10' : 'bg-zinc-800/50'}`}>
              <div className={`font-bold ${comment.isHater ? 'text-neon-red' : 'text-gray-300'}`}>
                {comment.username}:
              </div>
              <div className="text-gray-400 flex-1">{comment.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;