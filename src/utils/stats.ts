import { LogicStats } from '../types/game';

export const MINIMUM_IDEAL_MOVES = 17;

export function calculateLogicStats(
  movesCount: number,
  hintsUsedCount: number,
  wrongAttemptsCount: number,
  undosCount: number
): LogicStats {
  const unnecessaryMovesCount = Math.max(0, movesCount - MINIMUM_IDEAL_MOVES);
  const totalWrongOrUnnecessary = wrongAttemptsCount + undosCount + unnecessaryMovesCount;

  // Índice de eficiência calculado estritamente com base no total de movimentos realizados e o mínimo ideal (17)
  const efficiencyIndex =
    movesCount === 0
      ? 100
      : Math.min(100, Math.round((MINIMUM_IDEAL_MOVES / Math.max(MINIMUM_IDEAL_MOVES, movesCount)) * 100));

  // Índice de Lógica Global (0 a 100%), penalizando pedidos de dicas e tentativas erradas
  const hintPenalties = hintsUsedCount * 5;
  const errorPenalties = wrongAttemptsCount * 4 + undosCount * 2;
  const logicScore = Math.max(0, Math.min(100, efficiencyIndex - hintPenalties - errorPenalties));

  let rankTitle = 'Em Desenvolvimento';
  if (logicScore >= 95 && hintsUsedCount === 0 && unnecessaryMovesCount === 0) {
    rankTitle = 'Mestre da Lógica (Recorde Perfeito)';
  } else if (logicScore >= 85) {
    rankTitle = 'Excelente Raciocínio Lógico';
  } else if (logicScore >= 70) {
    rankTitle = 'Bom Raciocínio Lógico';
  } else if (logicScore >= 50) {
    rankTitle = 'Raciocínio Regular';
  } else {
    rankTitle = 'Necessita de Treinamento Lógico';
  }

  return {
    movesCount,
    hintsUsedCount,
    wrongAttemptsCount,
    undosCount,
    unnecessaryMovesCount,
    totalWrongOrUnnecessary,
    efficiencyIndex,
    logicScore,
    rankTitle,
  };
}
