import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Clock, RotateCcw, Share2, Sparkles, CheckCircle2 } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  movesCount: number;
  timerSeconds: number;
  onRestart: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  movesCount,
  timerSeconds,
  onRestart,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Confetti burst
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  const isOptimal = movesCount === 17;
  const isFasterThanJapanAvg = timerSeconds < 15 * 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl max-w-lg w-full shadow-[0_0_50px_rgba(245,158,11,0.4)] text-white p-6 sm:p-8 text-center relative">
        {/* Trophy Header */}
        <div className="w-20 h-20 mx-auto -mt-14 mb-4 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center shadow-xl ring-4 ring-slate-900">
          <Trophy className="w-10 h-10 text-slate-950" />
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
          <Sparkles className="w-4 h-4" />
          <span>DESAFIO CONCLUÍDO COM SUCESSO!</span>
          <Sparkles className="w-4 h-4" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Parabéns! Você Venceu!
        </h3>

        <p className="text-sm text-slate-300 mb-6">
          Todas as 8 pessoas atravessaram o rio em segurança, cumprindo rigorosamente todas as regras de proteção e navegação!
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Tempo Total</span>
            <div className="flex items-center justify-center gap-1 text-xl font-bold font-mono text-white">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{timeFormatted}</span>
            </div>
            <span className="text-[10px] text-emerald-400 mt-1 block">
              {isFasterThanJapanAvg ? '⚡ Mais rápido que a média japonesa (15m)!' : 'Tempo registrado'}
            </span>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Travessias Feitas</span>
            <div className="text-xl font-bold font-mono text-amber-400">
              {movesCount}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isOptimal ? '⭐ Recorde Perfeito (Mínimo de 17)!' : 'Mínimo teórico: 17 travessias'}
            </span>
          </div>
        </div>

        {/* Logical Evaluation Box */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-left text-xs text-slate-300 space-y-2 mb-6">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Avaliação de Raciocínio Lógico:</span>
          </div>
          <p className="leading-relaxed">
            Você demonstrou excelente controle sobre o espaço de estados e restrições cruzadas. Esse mesmo raciocínio é base para algoritmos de busca em grafos, planejamento em inteligência artificial e resolução de problemas combinatórios.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onRestart}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Jogar Novamente / Novo Teste</span>
        </button>
      </div>
    </div>
  );
};
