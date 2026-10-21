import React from 'react';
import { X, BarChart3, Lightbulb, AlertOctagon, Zap, Award, Clock, ArrowRightLeft, User } from 'lucide-react';
import { LogicStats } from '../types/game';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: LogicStats;
  timerSeconds: number;
  studentName: string;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  timerSeconds,
  studentName,
}) => {
  if (!isOpen) return null;

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds.toString().padStart(2, '0')}s`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full shadow-2xl text-white p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Fechar painel de estatísticas"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-md">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Painel de Desempenho Lógico</h3>
            <p className="text-xs text-slate-400">
              Acompanhamento intermediário do raciocínio e eficiência
            </p>
          </div>
        </div>

        {/* Student identification badge */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-slate-300">Aluno(a):</span>
            <span className="text-sm font-bold text-white">
              {studentName.trim() ? studentName : 'Aluno(a) Participante'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/80 px-2 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono">{timeFormatted}</span>
          </div>
        </div>

        {/* Restart Status Banner */}
        <div
          className={`p-3 rounded-xl border mb-4 text-xs flex items-center justify-between ${
            stats.achievedWithoutRestart
              ? 'bg-blue-950/70 border-blue-600/50 text-blue-200'
              : 'bg-amber-950/70 border-amber-600/50 text-amber-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{stats.achievedWithoutRestart ? '⭐' : '🔄'}</span>
            <div>
              <span className="font-bold block text-white text-xs">
                {stats.achievedWithoutRestart
                  ? 'Resolução em 1ª Tentativa Direta (Sem Reiniciar)'
                  : `Tentativa #${stats.attemptNumber} · ${stats.restartsCount} Reinicialização(ões)`}
              </span>
              <span className="text-[10px] opacity-80">
                {stats.achievedWithoutRestart
                  ? 'O aluno ainda não solicitou nenhum reinício nesta sessão.'
                  : `O aluno reiniciou o teste ${stats.restartsCount} vez(es) durante a resolução.`}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold block text-slate-300">Eficiência Global</span>
            <span className="font-mono font-black text-amber-300 text-sm">{stats.globalEfficiencyIndex}%</span>
          </div>
        </div>

        {/* The 3 Core Required Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
          {/* 1. Quantidade de pedidos de dicas */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80 text-center flex flex-col justify-between">
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-400 mb-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Pedidos de Dica</span>
            </div>
            <div className="text-2xl font-black font-mono text-white my-1">
              {stats.hintsUsedCount}
            </div>
            <span className="text-[10px] text-slate-400">
              {stats.restartsCount > 0 ? `Total sessão: ${stats.sessionTotalHints}` : stats.hintsUsedCount === 0 ? 'Sem auxílio' : `${stats.hintsUsedCount} pedida(s)`}
            </span>
          </div>

          {/* 2. Quantidade de movimentos errados ou desnecessários */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80 text-center flex flex-col justify-between">
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-rose-400 mb-1">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Movimentos Errados</span>
            </div>
            <div className="text-2xl font-black font-mono text-rose-300 my-1">
              {stats.totalWrongOrUnnecessary}
            </div>
            <span className="text-[10px] text-slate-400">
              {stats.restartsCount > 0 ? `Total sessão: ${stats.sessionTotalWrongOrUnnecessary}` : 'Erros & desnecessários'}
            </span>
          </div>

          {/* 3. Índice de eficiência */}
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80 text-center flex flex-col justify-between">
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-amber-400 mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Índice Eficiência</span>
            </div>
            <div className="text-2xl font-black font-mono text-amber-300 my-1">
              {stats.efficiencyIndex}%
            </div>
            <span className="text-[10px] text-slate-400">
              {stats.restartsCount > 0 ? `Global: ${stats.globalEfficiencyIndex}%` : 'Ideal: 17 travessias'}
            </span>
          </div>
        </div>

        {/* Detailed Breakdown Section */}
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2 mb-4 text-xs">
          <div className="text-slate-300 font-bold flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span>Detalhamento dos Movimentos:</span>
            <span className="text-slate-400 font-mono">
              Tentativa: {stats.movesCount} | Sessão Total: {stats.sessionTotalMoves}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span>Tentativas de travessia bloqueadas (regras):</span>
            <span className="font-mono text-rose-400 font-semibold">
              {stats.wrongAttemptsCount} {stats.restartsCount > 0 && `(Total: ${stats.sessionTotalWrongAttempts})`}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span>Passos desfeitos (Undos):</span>
            <span className="font-mono text-slate-300 font-semibold">
              {stats.undosCount} {stats.restartsCount > 0 && `(Total: ${stats.sessionTotalUndos})`}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span>Reinicializações solicitadas pelo usuário:</span>
            <span className={`font-mono font-bold ${stats.restartsCount === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {stats.restartsCount} {stats.restartsCount === 0 ? '(Nenhuma - 1ª tentativa)' : 'vez(es)'}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400">
            <span>Travessias excedentes ao ideal de 17:</span>
            <span className="font-mono text-amber-400 font-semibold">+{stats.unnecessaryMovesCount}</span>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-blue-300 font-bold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Classificação Atual:</span>
            </div>
            <div className="text-right">
              <span className="text-base font-extrabold text-white font-mono">{stats.logicScore}%</span>
              <span className="text-[10px] text-emerald-400 block">{stats.rankTitle}</span>
            </div>
          </div>
        </div>

        {/* Pedagogical Explanation */}
        <div className="text-[11px] text-slate-400 bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/60 leading-relaxed mb-4">
          <strong>Fórmula de Avaliação Pedagógica:</strong> A eficiência é calculada relacionando as 17 travessias ótimas com o total de tentativas efetuadas (17 / total de travessias × 100%). O índice global avalia a autonomia do aluno sem recorrer a dicas ou violar as restrições mútuas.
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            Continuar Teste
          </button>
        </div>
      </div>
    </div>
  );
};
