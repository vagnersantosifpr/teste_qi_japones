import React from 'react';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Lightbulb, Undo2 } from 'lucide-react';

interface GameHeaderProps {
  timerSeconds: number;
  movesCount: number;
  canUndo: boolean;
  soundEnabled: boolean;
  onUndo: () => void;
  onRestart: () => void;
  onToggleSound: () => void;
  onOpenRules: () => void;
  onOpenHint: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  timerSeconds,
  movesCount,
  canUndo,
  soundEnabled,
  onUndo,
  onRestart,
  onToggleSound,
  onOpenRules,
  onOpenHint,
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
              Enigma da Travessia do Rio (日本川渡りパズル)
            </p>
          </div>
        </div>

        {/* Zone 2: Telemetry & In-Game Metrics (Timer + Moves) */}
        <div className="flex items-center gap-4 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="text-slate-400">Tempo:</span>
            <span className="font-mono tabular-nums font-semibold text-white">
              {formatTime(timerSeconds)}
            </span>
          </div>

          <span className="text-slate-600" aria-hidden="true">
            |
          </span>

          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="text-slate-400">Travessias:</span>
            <span className="font-mono tabular-nums font-bold text-amber-400">
              {movesCount}
            </span>
          </div>
        </div>

        {/* Zone 3: Interactive Controls */}
        <div className="flex items-center gap-2">
          {/* Undo */}
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
              canUndo
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
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
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 flex items-center gap-1 transition-all"
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
