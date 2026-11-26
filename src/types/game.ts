export type ClassicCharacterId =
  | 'father'
  | 'mother'
  | 'boy1'
  | 'boy2'
  | 'girl1'
  | 'girl2'
  | 'police'
  | 'prisoner';

export type WolfCharacterId = 'farmer' | 'wolf' | 'lamb' | 'cabbage';

export type CharacterId = ClassicCharacterId | WolfCharacterId;

export type Bank = 'left' | 'right';

export type GamePhase = 'wolf' | 'classic' | 'space';
export type ClassicSubtheme = 'teams' | 'family';

export interface CharacterDef {
  id: CharacterId;
  name: string;
  role: string;
  isPilot: boolean;
  category: 'parent' | 'child' | 'police' | 'prisoner' | 'farmer' | 'wolf' | 'lamb' | 'cabbage';
  description: string;
  accentColor: string;
}

export interface CharacterState {
  bank: Bank;
  onRaft: boolean;
}

export type CharacterStateMap = Partial<Record<CharacterId, CharacterState>>;

export interface RuleViolation {
  ruleNumber: number;
  title: string;
  message: string;
  location:
    | 'Margem Esquerda'
    | 'Margem Direita'
    | 'Jangada'
    | 'Barco'
    | 'Cápsula'
    | 'Módulo Alfa'
    | 'Nave de Evacuação'
    | string;
  violatorIds: CharacterId[];
  targetIds: CharacterId[];
}

export interface GameSnapshot {
  raftBank: Bank;
  characters: CharacterStateMap;
  movesCount: number;
  description: string;
}

export interface LogicStats {
  idealMoves: number;
  movesCount: number;
  hintsUsedCount: number;
  wrongAttemptsCount: number;
  undosCount: number;
  unnecessaryMovesCount: number;
  totalWrongOrUnnecessary: number;
  efficiencyIndex: number;
  logicScore: number;
  rankTitle: string;
  // Métricas Globais e de Reinicialização
  restartsCount: number;
  attemptNumber: number;
  achievedWithoutRestart: boolean;
  sessionTotalMoves: number;
  sessionTotalHints: number;
  sessionTotalWrongAttempts: number;
  sessionTotalUndos: number;
  sessionTotalWrongOrUnnecessary: number;
  globalEfficiencyIndex: number;
  globalLogicScore: number;
}
