export type CharacterId =
  | 'father'
  | 'mother'
  | 'boy1'
  | 'boy2'
  | 'girl1'
  | 'girl2'
  | 'police'
  | 'prisoner';

export type Bank = 'left' | 'right';

export interface CharacterDef {
  id: CharacterId;
  name: string;
  role: string;
  isPilot: boolean;
  category: 'parent' | 'child' | 'police' | 'prisoner';
  description: string;
  accentColor: string;
}

export interface CharacterState {
  bank: Bank;
  onRaft: boolean;
}

export interface RuleViolation {
  ruleNumber: number;
  title: string;
  message: string;
  location: 'Margem Esquerda' | 'Margem Direita' | 'Jangada';
  violatorIds: CharacterId[];
  targetIds: CharacterId[];
}

export interface GameSnapshot {
  raftBank: Bank;
  characters: Record<CharacterId, CharacterState>;
  movesCount: number;
  description: string;
}

export interface LogicStats {
  movesCount: number;
  hintsUsedCount: number;
  wrongAttemptsCount: number;
  undosCount: number;
  unnecessaryMovesCount: number;
  totalWrongOrUnnecessary: number;
  efficiencyIndex: number;
  logicScore: number;
  rankTitle: string;
}
