import { LogicStats } from '../types/game';

export const MINIMUM_IDEAL_MOVES = 17;

export function calculateLogicStats(
  movesCount: number,
  hintsUsedCount: number,
  wrongAttemptsCount: number,
  undosCount: number,
  restartsCount: number = 0,
  accumulatedPastMoves: number = 0,
  accumulatedPastHints: number = 0,
  accumulatedPastWrong: number = 0,
  accumulatedPastUndos: number = 0
): LogicStats {
  const unnecessaryMovesCount = Math.max(0, movesCount - MINIMUM_IDEAL_MOVES);
  const totalWrongOrUnnecessary = wrongAttemptsCount + undosCount + unnecessaryMovesCount;

  // Índice de eficiência da tentativa atual (17 / total de travessias)
  const efficiencyIndex =
    movesCount === 0
      ? 100
      : Math.min(
          100,
          Math.round((MINIMUM_IDEAL_MOVES / Math.max(MINIMUM_IDEAL_MOVES, movesCount)) * 100)
        );

  // Totais globais acumulados na sessão (todas as tentativas somadas)
  const sessionTotalMoves = accumulatedPastMoves + movesCount;
  const sessionTotalHints = accumulatedPastHints + hintsUsedCount;
  const sessionTotalWrongAttempts = accumulatedPastWrong + wrongAttemptsCount;
  const sessionTotalUndos = accumulatedPastUndos + undosCount;
  const sessionUnnecessaryMoves = Math.max(0, sessionTotalMoves - MINIMUM_IDEAL_MOVES);
  const sessionTotalWrongOrUnnecessary =
    sessionTotalWrongAttempts + sessionTotalUndos + sessionUnnecessaryMoves;

  // Índice de Eficiência Global da Sessão:
  // Calculado estritamente com base no total global de movimentos realizados e o mínimo ideal (17)
  const globalEfficiencyIndex =
    sessionTotalMoves === 0
      ? 100
      : Math.min(
          100,
          Math.round(
            (MINIMUM_IDEAL_MOVES / Math.max(MINIMUM_IDEAL_MOVES, sessionTotalMoves)) * 100
          )
        );

  // Pontuação lógica da tentativa atual
  const hintPenalties = hintsUsedCount * 5;
  const errorPenalties = wrongAttemptsCount * 4 + undosCount * 2;
  const logicScore = Math.max(0, Math.min(100, efficiencyIndex - hintPenalties - errorPenalties));

  // Pontuação lógica global (penaliza reinicializações e acúmulo de tentativas erradas)
  const restartPenalty = restartsCount * 8;
  const globalHintPenalties = sessionTotalHints * 5;
  const globalErrorPenalties = sessionTotalWrongAttempts * 4 + sessionTotalUndos * 2;
  const globalLogicScore = Math.max(
    0,
    Math.min(
      100,
      globalEfficiencyIndex - globalHintPenalties - globalErrorPenalties - restartPenalty
    )
  );

  const achievedWithoutRestart = restartsCount === 0;

  let rankTitle = 'Em Desenvolvimento';
  if (
    achievedWithoutRestart &&
    movesCount === MINIMUM_IDEAL_MOVES &&
    hintsUsedCount === 0 &&
    wrongAttemptsCount === 0
  ) {
    rankTitle = 'Gênio da Lógica (1ª Tentativa Perfeita ⭐)';
  } else if (achievedWithoutRestart && efficiencyIndex >= 85) {
    rankTitle = 'Excelente (1ª Tentativa Sem Reiniciar ⭐)';
  } else if (achievedWithoutRestart) {
    rankTitle = 'Conclusão Direta (Sem Reiniciar)';
  } else if (restartsCount === 1) {
    rankTitle = 'Superação Rápida (1 Reinicialização)';
  } else if (restartsCount <= 3) {
    rankTitle = `Resolução com Persistência (${restartsCount} Reinicializações)`;
  } else {
    rankTitle = `Treinamento com Reinicializações (${restartsCount} Reinicializações)`;
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
    restartsCount,
    attemptNumber: restartsCount + 1,
    achievedWithoutRestart,
    sessionTotalMoves,
    sessionTotalHints,
    sessionTotalWrongAttempts,
    sessionTotalUndos,
    sessionTotalWrongOrUnnecessary,
    globalEfficiencyIndex,
    globalLogicScore,
  };
}
