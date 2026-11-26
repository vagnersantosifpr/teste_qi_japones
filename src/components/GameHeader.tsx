import React from 'react';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Lightbulb, Undo2, BarChart3 } from 'lucide-react';
import { LogicStats, GamePhase } from '../types/game';

interface GameHeaderProps {
  timerSeconds: number;
  movesCount: number;
  canUndo: boolean;
  soundEnabled: boolean;
  isWon?: boolean;
  studentName?: string;
  stats: LogicStats;
  phase?: GamePhase;
  onSelectPhase?: (phase: GamePhase) => void;
  onUndo: () => void;
  onRestart: () => void;
  onToggleSound: () => void;
  onOpenRules: () => void;
  onOpenHint: () => void;
  onOpenStats: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  timerSeconds,
  movesCount,
  canUndo,
  soundEnabled,
  isWon = false,
  studentName = '',
  stats,
  phase = 'wolf',
  onSelectPhase,
  onUndo,
  onRestart,
  onToggleSound,
  onOpenRules,
  onOpenHint,
  onOpenStats,
}) => {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseSubtitle = () => {
    if (studentName.trim()) {
      return (
        <span>
          Aluno(a): <strong className="text-blue-300">{studentName.trim()}</strong>
        </span>
      );
    }
    if (phase === 'wolf') return 'Fase 1: Lobo, Cordeiro e Alface';
    if (phase === 'space') return 'Fase 3: Evacuação Orbital Marte-01';
    return 'Fase 2: Travessia do Rio (Gincana & Teste de QI Japonês)';
  };

  return (
    <header className="w-full bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 px-4 lg:px-8 py-3 shrink-0 shadow-lg z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Zone 1: Brand Title & Phase Selector */}
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white shadow-md text-base shrink-0 ${
              phase === 'space'
                ? 'bg-gradient-to-tr from-cyan-600 to-blue-700 shadow-cyan-500/30'
                : phase === 'wolf'
                ? 'bg-emerald-600 shadow-emerald-500/30'
                : 'bg-blue-600 shadow-blue-500/30'
            }`}
          >
            {phase === 'space' ? '🪐' : phase === 'wolf' ? '🐺' : '川'}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base lg:text-lg font-bold tracking-tight text-white whitespace-nowrap">
                Desafios de Lógica
              </h1>
              {/* Phase Switch Tabs */}
              {onSelectPhase && (
                <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[10px] font-bold">
                  <button
                    onClick={() => onSelectPhase('wolf')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                      phase === 'wolf'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Fase 1 (Inicial): Lobo, Cordeiro e Alface"
                  >
                    1. Lobo e Cordeiro
                  </button>
                  <button
                    onClick={() => onSelectPhase('classic')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                      phase === 'classic'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Fase 2: Travessia do Rio (Gincana das Equipes / Teste de QI Japonês)"
                  >
                    2. Travessia do Rio
                  </button>
                  <button
                    onClick={() => onSelectPhase('space')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                      phase === 'space'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Fase 3: Estação Espacial Marte-01"
                  >
                    3. Estação Espacial
                  </button>
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">{getPhaseSubtitle()}</p>
          </div>
        </div>

        {/* Zone 2: Telemetry & In-Game Metrics */}
        <div className="flex items-center gap-2.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
          {/* Attempt indicator */}
          <div className="flex items-center gap-1">
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider whitespace-nowrap ${
                stats.restartsCount === 0
                  ? 'bg-blue-950 text-blue-300 border border-blue-600/50'
                  : 'bg-amber-950 text-amber-300 border border-amber-600/50'
              }`}
              title={
                stats.restartsCount === 0
                  ? 'Primeira tentativa (sem reiniciar)'
                  : `Tentativa atual #${stats.attemptNumber} (${stats.restartsCount} reinício(s) solicitado(s))`
              }
            >
              {stats.restartsCount === 0 ? '1ª Tentativa' : `Tentativa #${stats.attemptNumber}`}
            </span>
          </div>

          <span className="text-slate-600" aria-hidden="true">
            |
          </span>

          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-400">Tempo:</span>
            <span
              className={`font-mono tabular-nums font-semibold ${
                isWon ? 'text-emerald-400 font-bold' : 'text-white'
              }`}
            >
              {formatTime(timerSeconds)}
            </span>
            {isWon && (
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600/50 px-1 py-0.2 rounded font-bold uppercase tracking-wider">
                Parado
              </span>
            )}
          </div>

          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">
            |
          </span>

          <div className="flex items-center gap-1 text-slate-300">
            <span className="text-slate-400">Travessias:</span>
            <span className="font-mono tabular-nums font-bold text-amber-400">{movesCount}</span>
          </div>

          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">
            |
          </span>

          {/* Live Efficiency & Global Efficiency */}
          <div
            className="hidden sm:flex items-center gap-1.5 text-slate-300"
            title={`Tentativa atual: ${stats.efficiencyIndex}% | Eficiência Global da Sessão: ${stats.globalEfficiencyIndex}% (${stats.idealMoves} / ${stats.sessionTotalMoves} travessias acumuladas)`}
          >
            <span className="text-slate-400">Efic:</span>
            <span
              className={`font-mono tabular-nums font-bold ${
                stats.efficiencyIndex >= 85
                  ? 'text-emerald-400'
                  : stats.efficiencyIndex >= 65
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}
            >
              {stats.efficiencyIndex}%
            </span>
            {stats.restartsCount > 0 && (
              <span className="text-[10px] font-mono text-slate-400" title="Eficiência Global Acumulada">
                (Global: {stats.globalEfficiencyIndex}%)
              </span>
            )}
          </div>

          <span className="text-slate-600 hidden md:inline" aria-hidden="true">
            |
          </span>

          <div
            className="hidden md:flex items-center gap-1 text-slate-300"
            title={`Erros na tentativa: ${stats.totalWrongOrUnnecessary} | Acumulado na sessão: ${stats.sessionTotalWrongOrUnnecessary}`}
          >
            <span className="text-slate-400">Erros:</span>
            <span
              className={`font-mono tabular-nums font-bold ${
                stats.totalWrongOrUnnecessary > 0 ? 'text-rose-400' : 'text-slate-300'
              }`}
            >
              {stats.totalWrongOrUnnecessary}
            </span>
          </div>

          <span className="text-slate-600 hidden lg:inline" aria-hidden="true">
            |
          </span>

          <div
            className="hidden lg:flex items-center gap-1 text-slate-300"
            title={`Dicas na tentativa: ${stats.hintsUsedCount} | Acumulado: ${stats.sessionTotalHints}`}
          >
            <span className="text-slate-400">Dicas:</span>
            <span className="font-mono tabular-nums font-bold text-emerald-400">{stats.hintsUsedCount}</span>
          </div>
        </div>

        {/* Zone 3: Interactive Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenStats}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-900/40 flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
            title="Abrir painel intermediário de métricas de lógica"
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Desempenho</span>
          </button>

          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all whitespace-nowrap ${
              canUndo
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer'
                : 'bg-slate-800/40 text-slate-500 border border-slate-800 cursor-not-allowed'
            }`}
            title="Desfazer último movimento"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desfazer</span>
          </button>

          <button
            onClick={onOpenHint}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
            title="Dica de lógica do próximo passo"
          >
            <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Dica</span>
          </button>

          <button
            onClick={onOpenRules}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
            title="Ver regras completas da fase"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Regras</span>
          </button>

          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            title={soundEnabled ? 'Silenciar som' : 'Ativar som'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          <button
            onClick={onRestart}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-md flex items-center gap-1.5 border border-blue-400/30 cursor-pointer whitespace-nowrap"
            title="Reiniciar fase do início"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
