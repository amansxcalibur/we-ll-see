import React from 'react';
import { Home, Trophy, User, PlusCircle, Flame, Eye } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCreate: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onOpenCreate }) => {
  const navItems = [
    { id: 'feed', label: 'The Arena', icon: Home },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-brand-dark border-r border-brand-border px-4 py-6 z-50">
      <div className="flex items-center gap-2 mb-10 px-2">
        <Eye className="w-8 h-8 text-neon-green" />
        <h1 className="text-2xl font-black tracking-tighter italic text-white">
          We'll<span className="text-neon-green">SEE</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-brand-card text-white border border-brand-border'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 ${activeTab === item.id ? 'text-neon-green' : 'group-hover:text-neon-green transition-colors'}`} />
            <span className="font-semibold text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 rounded-xl border border-brand-border mb-6">
          <div className="flex items-center gap-2 text-neon-purple mb-2">
            <Flame className="w-4 h-4 fill-current" />
            <span className="text-xs font-bold uppercase tracking-widest">Current Streak</span>
          </div>
          <div className="text-2xl font-black text-white">5 Days</div>
          <div className="text-xs text-gray-500 mt-1">Keep the momentum.</div>
        </div>

        <button
          onClick={onOpenCreate}
          className="w-full bg-white text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          <PlusCircle className="w-5 h-5" />
          Declare Plan
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;