import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Clock,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  User,
  Copy,
  Check,
  Edit2,
  Lightbulb,
  AlertOctagon,
  Zap,
  Award,
} from 'lucide-react';
import { LogicStats, GamePhase, ClassicSubtheme } from '../types/game';
import { Rocket } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  movesCount: number;
  timerSeconds: number;
  studentName: string;
  stats: LogicStats;
  phase?: GamePhase;
  subtheme?: ClassicSubtheme;
  onSelectNextPhase?: () => void;
  onStudentNameChange?: (name: string) => void;
  onRestart: () => void;
  onNewStudent?: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  movesCount,
  timerSeconds,
  studentName,
  stats,
  phase = 'classic',
  subtheme = 'teams',
  onSelectNextPhase,
  onStudentNameChange,
  onRestart,
  onNewStudent,
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

    const restartStatusText = stats.achievedWithoutRestart
      ? '⭐ CONSEGUIU DE 1ª TENTATIVA (SEM REINICIAR)'
      : `🔄 CONSEGUIU COM REINICIALIZAÇÃO (${stats.restartsCount} reinício(s) - Sucesso na Tentativa #${stats.attemptNumber})`;

    const phaseTitle = phase === 'space' 
      ? 'FASE 2: EVACUAÇÃO DA ESTAÇÃO ESPACIAL MARTE-01' 
      : subtheme === 'teams'
      ? 'FASE 1: GINCANA DAS EQUIPES (TRAVESSIA DO RIO)'
      : 'FASE 1: TESTE DE QI JAPONÊS (TRAVESSIA DO RIO)';
    const moveLabel = phase === 'space' ? 'Voos da Cápsula' : 'Travessias';

    const text =
      `🎓 COMPROVANTE DE AVALIAÇÃO · ${phaseTitle}\n` +
      `👤 Aluno(a): ${displayName}\n` +
      `🏅 Status de Resolução: ${restartStatusText}\n` +
      `🔢 Tentativa Vencedora: #${stats.attemptNumber} (${stats.restartsCount} reinicializações solicitadas)\n` +
      `⏱️ Tempo da Tentativa: ${timeFormatted}\n` +
      `${phase === 'space' ? '🚀' : '⛵'} ${moveLabel} da Tentativa: ${movesCount} (Mínimo Ideal: 17)\n` +
      `🎯 Índice de Eficiência da Tentativa: ${stats.efficiencyIndex}%\n` +
      `🌐 Índice de Eficiência Global da Sessão: ${stats.globalEfficiencyIndex}% (17 / ${stats.sessionTotalMoves} movimentos acumulados)\n` +
      `💡 Pedidos de Dica: ${stats.hintsUsedCount} nesta tentativa (Total na sessão: ${stats.sessionTotalHints})\n` +
      `⚠️ Movimentos Errados/Desnecessários: ${stats.totalWrongOrUnnecessary} nesta tentativa (Total na sessão: ${stats.sessionTotalWrongOrUnnecessary})\n` +
      `🧠 Classificação Final de Lógica: ${stats.rankTitle} (${stats.logicScore}%)\n` +
      `🏆 Status: Desafio Concluído com Sucesso!\n` +
      `📅 Data: ${today}`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {});
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
        <div className="my-2.5 bg-gradient-to-r from-blue-950 via-slate-800 to-blue-950 border border-blue-400/40 rounded-xl p-3.5 shadow-inner">
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

        {/* Restart Status Banner - Highlights whether solved with or without restarting */}
        <div
          className={`my-3 p-3 rounded-xl border flex items-center justify-between text-left ${
            stats.achievedWithoutRestart
              ? 'bg-emerald-950/80 border-emerald-500/70 text-emerald-200'
              : 'bg-amber-950/80 border-amber-500/70 text-amber-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{stats.achievedWithoutRestart ? '⭐' : '🔄'}</span>
            <div>
              <span className="font-extrabold text-xs sm:text-sm block text-white">
                {stats.achievedWithoutRestart
                  ? 'CONSEGUIU DE 1ª TENTATIVA (SEM REINICIAR!)'
                  : `CONSEGUIU APÓS ${stats.restartsCount} REINICIALIZAÇÃO(ÕES)`}
              </span>
              <span className="text-[10px] sm:text-[11px] opacity-90 block">
                {stats.achievedWithoutRestart
                  ? 'Excelente raciocínio direto: o aluno não precisou recomeçar nenhuma vez.'
                  : `Vitória alcançada na Tentativa #${stats.attemptNumber} (solicitou ${stats.restartsCount} reinício(s)).`}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0 pl-2">
            <span className="text-[10px] font-bold uppercase text-slate-300 block">Eficiência Global</span>
            <span className="text-lg font-black font-mono text-amber-300">{stats.globalEfficiencyIndex}%</span>
          </div>
        </div>

        {/* The Core Evaluative Metrics */}
        <div className="my-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2 text-left flex items-center justify-between">
            <span>Avaliação de Métricas Pedagógicas:</span>
            <span className="text-amber-400 font-mono text-[11px]">Ideal: 17 Travessias</span>
          </span>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* 1. Quantidade de pedidos de dicas */}
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700 flex flex-col justify-between">
              <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-400">
                <Lightbulb className="w-3 h-3" />
                <span>Dicas</span>
              </div>
              <div className="text-xl font-black font-mono text-white my-0.5">
                {stats.hintsUsedCount}
              </div>
              <span className="text-[9px] text-slate-400">
                {stats.restartsCount > 0
                  ? `Total sessão: ${stats.sessionTotalHints}`
                  : stats.hintsUsedCount === 0
                  ? 'Sem auxílio'
                  : `${stats.hintsUsedCount} pedida(s)`}
              </span>
            </div>

            {/* 2. Quantidade de movimentos errados ou desnecessários */}
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700 flex flex-col justify-between">
              <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-rose-400">
                <AlertOctagon className="w-3 h-3" />
                <span>Erros / Extras</span>
              </div>
              <div className="text-xl font-black font-mono text-rose-300 my-0.5">
                {stats.totalWrongOrUnnecessary}
              </div>
              <span className="text-[9px] text-slate-400" title={`Tentativa: ${stats.wrongAttemptsCount} inf. + ${stats.undosCount} undos + ${stats.unnecessaryMovesCount} ext. | Total sessão: ${stats.sessionTotalWrongOrUnnecessary}`}>
                {stats.restartsCount > 0 ? `Total sessão: ${stats.sessionTotalWrongOrUnnecessary}` : `${stats.wrongAttemptsCount} inf. + ${stats.unnecessaryMovesCount} ext.`}
              </span>
            </div>

            {/* 3. Índice de eficiência */}
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700 flex flex-col justify-between">
              <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-amber-400">
                <Zap className="w-3 h-3" />
                <span>Eficiência</span>
              </div>
              <div className="text-xl font-black font-mono text-amber-300 my-0.5">
                {stats.efficiencyIndex}%
              </div>
              <span className="text-[9px] text-slate-400">
                {stats.restartsCount > 0 ? `Global: ${stats.globalEfficiencyIndex}%` : `Base 17/${movesCount}`}
              </span>
            </div>
          </div>
        </div>

        {/* Global Time & Moves Summary */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/80">
            <span className="text-[11px] text-slate-400 block mb-0.5">Tempo da Tentativa</span>
            <div className="flex items-center justify-center gap-1 text-base font-bold font-mono text-white">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{timeFormatted}</span>
            </div>
            <span className="text-[9px] text-emerald-400 mt-0.5 block">
              {isFasterThanJapanAvg ? '⚡ Mais rápido que a média japonesa (15m)' : 'Tempo registrado'}
            </span>
          </div>

          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/80">
            <span className="text-[11px] text-slate-400 block mb-0.5">Travessias da Tentativa</span>
            <div className="text-base font-bold font-mono text-amber-400">
              {movesCount} {stats.restartsCount > 0 && <span className="text-xs text-slate-400 font-normal">({stats.sessionTotalMoves} tot)</span>}
            </div>
            <span className="text-[9px] text-slate-400 mt-0.5 block">
              {isOptimal ? '⭐ Recorde Teórico Mínimo (17)!' : 'Mínimo ideal: 17 travessias'}
            </span>
          </div>
        </div>

        {/* Logical Evaluation Box with Rank */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-left text-xs text-slate-300 space-y-1 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Parecer de Raciocínio Lógico:</span>
            </div>
            <div className="flex items-center gap-1 font-mono font-bold text-amber-300 text-xs">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{stats.rankTitle}</span>
            </div>
          </div>
          <p className="leading-relaxed text-slate-300 text-[11px]">
            Parabéns, <strong>{displayName}</strong>! Concluiu com eficiência de <strong>{stats.efficiencyIndex}%</strong> na tentativa #{stats.attemptNumber} {stats.restartsCount > 0 ? `(Eficiência global da sessão: ${stats.globalEfficiencyIndex}% com ${stats.restartsCount} reinicializações)` : `(concluído sem reiniciar na primeira tentativa!)`}.
          </p>
        </div>

        {/* Action Buttons: Next Phase & Copy Report & Play Again & New Student */}
        <div className="flex flex-col gap-2">
          {onSelectNextPhase && (
            <button
              onClick={onSelectNextPhase}
              className={`w-full py-3 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98 ${
                phase === 'classic'
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-cyan-500/30 ring-2 ring-cyan-400/50'
                  : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-emerald-500/30 ring-2 ring-emerald-400/50'
              }`}
            >
              <Rocket className="w-5 h-5 animate-pulse text-amber-300" />
              <span>
                {phase === 'classic'
                  ? '🚀 Avançar para Fase 2: Estação Espacial Marte-01'
                  : '🌊 Voltar para Fase 1: Rio Clássico'}
              </span>
            </button>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="w-full sm:w-1/2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:text-white"
              title="Copiar relatório formatado para colar no Classroom, WhatsApp ou Email"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Relatório Copiado!</span>
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

          {onNewStudent && (
            <button
              onClick={onNewStudent}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Avaliar Outro Aluno (Resetar Sessão)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

