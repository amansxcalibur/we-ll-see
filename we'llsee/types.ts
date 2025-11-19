export enum PlanStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION'
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  karma: number;
  title: string; // e.g., "The Prover", "All Talk"
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  isHater: boolean; // If true, styled as a "doubt" comment
  timestamp: number;
}

export interface Plan {
  id: string;
  userId: string;
  user: User;
  title: string;
  description: string;
  deadline: string;
  createdAt: string;
  believers: number;
  doubters: number;
  status: PlanStatus;
  proofImageUrl?: string;
  comments: Comment[];
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  plansCompleted: number;
  streak: number;
}