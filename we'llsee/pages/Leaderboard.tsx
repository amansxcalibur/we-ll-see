import React from 'react';
import { MOCK_LEADERBOARD } from '../constants';
import { Trophy, TrendingUp, Medal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Leaderboard: React.FC = () => {
  
  // Prepare data for the chart
  const chartData = MOCK_LEADERBOARD.map(entry => ({
    name: entry.user.username,
    karma: entry.user.karma,
  }));

  const getRankColor = (rank: number) => {
    switch(rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-300';
      case 3: return 'text-amber-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Global Rankings</h2>
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-brand-border">
            <button className="px-4 py-1 text-xs font-bold bg-white text-black rounded">Weekly</button>
            <button className="px-4 py-1 text-xs font-bold text-gray-400 hover:text-white">All Time</button>
        </div>
      </div>

      {/* Top 3 Visual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {MOCK_LEADERBOARD.slice(0, 3).map((entry) => (
             <div key={entry.user.id} className="bg-brand-card border border-brand-border p-6 rounded-2xl flex flex-col items-center relative overflow-hidden">
                 {entry.rank === 1 && <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none"/>}
                 <div className={`absolute top-4 right-4 font-black text-4xl opacity-10 ${getRankColor(entry.rank)}`}>#{entry.rank}</div>
                 <img src={entry.user.avatarUrl} className="w-20 h-20 rounded-full border-4 border-brand-dark shadow-xl z-10" />
                 <div className="mt-4 text-center relative z-10">
                     <h3 className="font-bold text-white text-lg">{entry.user.username}</h3>
                     <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-2">{entry.user.title}</p>
                     <div className="text-neon-green font-black text-2xl">{entry.user.karma.toLocaleString()}</div>
                     <div className="text-xs text-gray-500">Karma</div>
                 </div>
             </div>
         ))}
      </div>

      {/* Chart */}
      <div className="bg-brand-card border border-brand-border p-6 rounded-2xl h-64">
        <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Karma Distribution
        </h3>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                    itemStyle={{ color: '#10b981' }}
                    cursor={{fill: '#27272a'}}
                />
                <Bar dataKey="karma" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#fbbf24' : '#8b5cf6'} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
      </div>

      {/* List View */}
      <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
              <thead className="bg-zinc-900/50 text-gray-500 font-bold uppercase text-xs">
                  <tr>
                      <th className="p-4">Rank</th>
                      <th className="p-4">User</th>
                      <th className="p-4 text-right">Proven Plans</th>
                      <th className="p-4 text-right">Streak</th>
                      <th className="p-4 text-right">Karma</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                  {MOCK_LEADERBOARD.map((entry) => (
                      <tr key={entry.user.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-bold text-gray-400">
                              <span className={`flex items-center justify-center w-6 h-6 rounded ${entry.rank <= 3 ? 'bg-white text-black' : ''}`}>
                                {entry.rank}
                              </span>
                          </td>
                          <td className="p-4 flex items-center gap-3">
                              <img src={entry.user.avatarUrl} className="w-8 h-8 rounded-full" />
                              <span className="font-semibold text-white">{entry.user.username}</span>
                          </td>
                          <td className="p-4 text-right text-gray-300">{entry.plansCompleted}</td>
                          <td className="p-4 text-right">
                              <span className="text-orange-500 font-bold flex items-center justify-end gap-1">
                                  <Medal className="w-3 h-3" /> {entry.streak}
                              </span>
                          </td>
                          <td className="p-4 text-right font-mono font-bold text-neon-green">
                              {entry.user.karma.toLocaleString()}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default Leaderboard;