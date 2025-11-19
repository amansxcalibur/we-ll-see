import { Plan, PlanStatus, User, LeaderboardEntry } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  username: 'AlexChase',
  avatarUrl: 'https://picsum.photos/seed/alex/200/200',
  karma: 1250,
  title: 'Underdog',
};

export const MOCK_PLANS: Plan[] = [
  {
    id: 'p1',
    userId: 'u2',
    user: {
      id: 'u2',
      username: 'SarahG',
      avatarUrl: 'https://picsum.photos/seed/sarah/200/200',
      karma: 3400,
      title: 'Iron Will',
    },
    title: 'Run a sub-3 hour marathon',
    description: 'I have been training for 4 months. The race is this Sunday. I will post my official time chip photo.',
    deadline: '2023-11-15T12:00:00Z',
    createdAt: '2023-10-01T09:00:00Z',
    believers: 142,
    doubters: 89,
    status: PlanStatus.ACTIVE,
    comments: [
      { id: 'c1', userId: 'u3', username: 'HaterBot', text: 'Your splits are too slow based on your Strava history.', isHater: true, timestamp: Date.now() }
    ]
  },
  {
    id: 'p2',
    userId: 'u4',
    user: {
      id: 'u4',
      username: 'CodeMaster',
      avatarUrl: 'https://picsum.photos/seed/code/200/200',
      karma: 800,
      title: 'Dreamer',
    },
    title: 'Launch my SaaS MVP in 7 days',
    description: 'No sleep until "Ship It". Building a We ensure tool for designers.',
    deadline: '2023-11-12T23:59:00Z',
    createdAt: '2023-11-05T10:00:00Z',
    believers: 45,
    doubters: 120,
    status: PlanStatus.ACTIVE,
    comments: []
  },
  {
    id: 'p3',
    userId: 'u1',
    user: MOCK_USER,
    title: 'Learn French to B2 level',
    description: 'Exam is booked. Proof will be the certificate.',
    deadline: '2023-12-20T10:00:00Z',
    createdAt: '2023-09-15T14:00:00Z',
    believers: 12,
    doubters: 4,
    status: PlanStatus.COMPLETED,
    proofImageUrl: 'https://picsum.photos/seed/cert/800/600',
    comments: []
  }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, user: { id: 'u2', username: 'SarahG', avatarUrl: 'https://picsum.photos/seed/sarah/200/200', karma: 3400, title: 'Iron Will' }, plansCompleted: 42, streak: 12 },
  { rank: 2, user: { id: 'u5', username: 'GymRat99', avatarUrl: 'https://picsum.photos/seed/gym/200/200', karma: 3150, title: 'Grinder' }, plansCompleted: 38, streak: 8 },
  { rank: 3, user: { id: 'u6', username: 'CryptoKing', avatarUrl: 'https://picsum.photos/seed/crypto/200/200', karma: 2900, title: 'Risk Taker' }, plansCompleted: 15, streak: 2 },
  { rank: 4, user: MOCK_USER, plansCompleted: 12, streak: 5 },
];