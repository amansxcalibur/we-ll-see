import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PostCard from './components/PostCard';
import CreatePlanModal from './components/CreatePlanModal';
import Leaderboard from './pages/Leaderboard';
import { MOCK_PLANS, MOCK_USER } from './constants';
import { Plan } from './types';
import { HashRouter } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [plans, setPlans] = useState<Plan[]>(MOCK_PLANS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCreatePlan = (newPlanData: { title: string; description: string; deadline: string }) => {
    const newPlan: Plan = {
      id: Date.now().toString(),
      userId: MOCK_USER.id,
      user: MOCK_USER,
      title: newPlanData.title,
      description: newPlanData.description,
      deadline: newPlanData.deadline,
      createdAt: new Date().toISOString(),
      believers: 0,
      doubters: 0,
      status: 'ACTIVE' as any,
      comments: []
    };
    setPlans([newPlan, ...plans]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             {/* Header for Feed */}
             <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">THE ARENA</h1>
                <p className="text-gray-400 mt-2 max-w-lg">
                  Prove them wrong. Post your future, tank the hate, and earn your karma.
                </p>
             </div>

            {plans.map((plan) => (
              <PostCard key={plan.id} plan={plan} isCurrentUser={plan.userId === MOCK_USER.id} />
            ))}
          </div>
        );
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return (
            <div className="text-center py-20 animate-in zoom-in duration-300">
                <img src={MOCK_USER.avatarUrl} className="w-32 h-32 rounded-full mx-auto border-4 border-neon-purple mb-6" />
                <h2 className="text-3xl font-black text-white">{MOCK_USER.username}</h2>
                <p className="text-gray-400 uppercase tracking-widest font-bold mt-2">{MOCK_USER.title}</p>
                
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-8">
                    <div className="bg-brand-card p-4 rounded-xl border border-brand-border">
                        <div className="text-2xl font-black text-neon-green">{MOCK_USER.karma}</div>
                        <div className="text-xs text-gray-500 uppercase">Karma</div>
                    </div>
                    <div className="bg-brand-card p-4 rounded-xl border border-brand-border">
                        <div className="text-2xl font-black text-white">12</div>
                        <div className="text-xs text-gray-500 uppercase">Proven Plans</div>
                    </div>
                </div>
                <p className="mt-10 text-gray-500">Profile details under construction...</p>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-brand-dark text-gray-100 font-sans selection:bg-neon-green selection:text-black">
        <Sidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => { setActiveTab(tab); setMobileMenuOpen(false); }} 
            onOpenCreate={() => setIsCreateModalOpen(true)} 
        />

        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-brand-dark/90 backdrop-blur border-b border-brand-border z-50 flex items-center justify-between px-4">
             <div className="font-black text-xl italic text-white">We'll<span className="text-neon-green">SEE</span></div>
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                {mobileMenuOpen ? <X /> : <Menu />}
             </button>
        </div>
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
            <div className="fixed inset-0 z-40 bg-brand-dark pt-20 px-6 md:hidden">
                <div className="space-y-4">
                    {['feed', 'leaderboard', 'profile'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
                            className={`block w-full text-left py-4 text-2xl font-bold border-b border-zinc-800 ${activeTab === tab ? 'text-neon-green' : 'text-gray-500'}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                    <button 
                        onClick={() => { setIsCreateModalOpen(true); setMobileMenuOpen(false); }}
                        className="w-full bg-white text-black py-4 rounded-xl font-bold mt-8"
                    >
                        Declare Plan
                    </button>
                </div>
            </div>
        )}

        <main className={`md:pl-64 pt-20 md:pt-0 min-h-screen transition-all duration-300`}>
          <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12">
            {renderContent()}
          </div>
        </main>

        <CreatePlanModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePlan}
        />
      </div>
    </HashRouter>
  );
};

export default App;