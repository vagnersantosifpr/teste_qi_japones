import React from 'react';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Lightbulb, Undo2, User, BarChart3, Zap } from 'lucide-react';
import { LogicStats } from '../types/game';

interface GameHeaderProps {
  timerSeconds: number;
  movesCount: number;
  canUndo: boolean;
  soundEnabled: boolean;
  isWon?: boolean;
  studentName?: string;
  stats: LogicStats;
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

  return (
    <header className="w-full bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 px-4 lg:px-8 py-3 shrink-0 shadow-lg z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Zone 1: Title & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            川
          </div>
          <div>
            <h1 className="text-base lg:text-lg font-bold tracking-tight text-white whitespace-nowrap">
              Teste de QI Japonês
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {studentName.trim() ? (
                <span>Aluno(a): <strong className="text-blue-300">{studentName.trim()}</strong></span>
              ) : (
                'Enigma da Travessia do Rio (日本川渡りパズル)'
              )}
            </p>
          </div>
        </div>

        {/* Zone 2: Telemetry & In-Game Metrics (Timer + Moves + Live Efficiency & Errors) */}
        <div className="flex items-center gap-3 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
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
            <span className="font-mono tabular-nums font-bold text-amber-400">
              {movesCount}
            </span>
          </div>

          <span className="text-slate-600 hidden sm:inline" aria-hidden="true">
            |
          </span>

          {/* 3) Live Efficiency Indicator */}
          <div className="hidden sm:flex items-center gap-1 text-slate-300" title="Eficiência: 17 / total de travessias realizadas">
            <span className="text-slate-400">Eficiência:</span>
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
          </div>

          <span className="text-slate-600 hidden md:inline" aria-hidden="true">
            |
          </span>

          {/* 2) Movimentos Errados ou Desnecessários */}
          <div className="hidden md:flex items-center gap-1 text-slate-300" title="Movimentos errados ou desnecessários">
            <span className="text-slate-400">Erros/Extras:</span>
            <span className={`font-mono tabular-nums font-bold ${stats.totalWrongOrUnnecessary > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
              {stats.totalWrongOrUnnecessary}
            </span>
          </div>

          <span className="text-slate-600 hidden md:inline" aria-hidden="true">
            |
          </span>

          {/* 1) Quantidade de pedidos de dicas */}
          <div className="hidden md:flex items-center gap-1 text-slate-300" title="Quantidade de pedidos de dicas">
            <span className="text-slate-400">Dicas:</span>
            <span className="font-mono tabular-nums font-bold text-emerald-400">
              {stats.hintsUsedCount}
            </span>
          </div>
        </div>

        {/* Zone 3: Interactive Controls */}
        <div className="flex items-center gap-2">
          {/* Intermediate Performance Stats Button */}
          <button
            onClick={onOpenStats}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-900/40 flex items-center gap-1 transition-all cursor-pointer"
            title="Abrir painel intermediário de métricas de lógica"
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Desempenho</span>
          </button>

          {/* Undo */}
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
              canUndo
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer'
                : 'bg-slate-800/40 text-slate-500 border border-slate-800 cursor-not-allowed'
            }`}
            title="Desfazer último movimento"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desfazer</span>
          </button>

          {/* Hint */}
          <button
            onClick={onOpenHint}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 flex items-center gap-1 transition-all cursor-pointer"
            title="Dica de lógica do próximo passo"
          >
            <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Dica</span>
          </button>

          {/* Rules */}
          <button
            onClick={onOpenRules}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition-all"
            title="Ver as 5 regras completas"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Regras</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            title={soundEnabled ? 'Silenciar som' : 'Ativar som'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Classic Japanese Restart Button "重玩" */}
          <button
            onClick={onRestart}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-md flex items-center gap-1.5 border border-blue-400/30"
            title="Reiniciar jogo do início"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重玩 (Reiniciar)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
