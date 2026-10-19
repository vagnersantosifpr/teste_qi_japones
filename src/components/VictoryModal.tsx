import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Clock, RotateCcw, Share2, Sparkles, CheckCircle2, User, Copy, Check, Edit2 } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  movesCount: number;
  timerSeconds: number;
  studentName: string;
  onStudentNameChange?: (name: string) => void;
  onRestart: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  movesCount,
  timerSeconds,
  studentName,
  onStudentNameChange,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);

  useEffect(() => {
    setTempName(studentName);
  }, [studentName]);

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
  const displayName = studentName.trim() ? studentName.trim() : 'Aluno(a)';

  const handleCopyReport = () => {
    const today = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const text = `🎓 COMPROVANTE · TESTE DE QI JAPONÊS (TRAVESSIA DO RIO)\n👤 Aluno(a): ${displayName}\n⏱️ Tempo Final: ${timeFormatted}\n⛵ Travessias: ${movesCount} (Mínimo teórico: 17)\n🏆 Status: Resolvido com Sucesso!\n📅 Data: ${today}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl max-w-lg w-full shadow-[0_0_50px_rgba(245,158,11,0.4)] text-white p-6 sm:p-8 text-center relative max-h-[95vh] overflow-y-auto">
        {/* Trophy Header */}
        <div className="w-20 h-20 mx-auto -mt-14 mb-4 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center shadow-xl ring-4 ring-slate-900">
          <Trophy className="w-10 h-10 text-slate-950" />
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
          <Sparkles className="w-4 h-4" />
          <span>DESAFIO CONCLUÍDO COM SUCESSO!</span>
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Student Name Certificate Plate */}
        <div className="my-3 bg-gradient-to-r from-blue-950 via-slate-800 to-blue-950 border border-blue-400/40 rounded-xl p-4 shadow-inner">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-300 block mb-1">
            Certificado de Mérito em Raciocínio Lógico
          </span>
          <div className="flex items-center justify-center gap-2">
            <User className="w-5 h-5 text-amber-400 shrink-0" />
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={() => {
                    setIsEditingName(false);
                    if (onStudentNameChange) onStudentNameChange(tempName);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditingName(false);
                      if (onStudentNameChange) onStudentNameChange(tempName);
                    }
                  }}
                  autoFocus
                  placeholder="Nome do aluno..."
                  className="bg-slate-900 border border-blue-400 px-3 py-1 rounded text-lg font-bold text-white text-center outline-none max-w-[200px]"
                />
                <button
                  onClick={() => {
                    setIsEditingName(false);
                    if (onStudentNameChange) onStudentNameChange(tempName);
                  }}
                  className="p-1 bg-blue-600 rounded text-xs"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-amber-300 tracking-tight">
                  {displayName}
                </span>
                {onStudentNameChange && (
                  <button
                    onClick={() => {
                      setTempName(studentName);
                      setIsEditingName(true);
                    }}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                    title="Editar nome"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-5">
          Todas as 8 pessoas atravessaram o rio em segurança, cumprindo rigorosamente todas as regras de proteção e navegação!
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Tempo Total</span>
            <div className="flex items-center justify-center gap-1 text-xl font-bold font-mono text-white">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{timeFormatted}</span>
            </div>
            <span className="text-[10px] text-emerald-400 mt-1 block">
              {isFasterThanJapanAvg ? '⚡ Mais rápido que a média no Japão!' : 'Tempo registrado'}
            </span>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Travessias Feitas</span>
            <div className="text-xl font-bold font-mono text-amber-400">
              {movesCount}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {isOptimal ? '⭐ Recorde Perfeito (17)!' : 'Mínimo teórico: 17'}
            </span>
          </div>
        </div>

        {/* Logical Evaluation Box */}
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-left text-xs text-slate-300 space-y-1.5 mb-5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Avaliação de Raciocínio Lógico:</span>
          </div>
          <p className="leading-relaxed">
            Parabéns, <strong>{displayName}</strong>! Você demonstrou domínio sobre espaço de estados e restrições cruzadas, habilidades fundamentais em lógica de programação e algoritmos.
          </p>
        </div>

        {/* Action Buttons: Copy Report & Play Again */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={handleCopyReport}
            className="w-full sm:w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:text-white"
            title="Copiar relatório formatado para colar no Classroom, WhatsApp ou Email"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copiado para Área de Transferência!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-blue-400" />
                <span>Copiar Relatório p/ Professor</span>
              </>
            )}
          </button>

          <button
            onClick={onRestart}
            className="w-full sm:w-1/2 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102 active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jogar Novamente</span>
          </button>
        </div>
      </div>
    </div>
  );
};
