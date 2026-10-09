import React from 'react';
import { ShieldAlert, Undo2, X } from 'lucide-react';
import { RuleViolation } from '../types/game';

interface ViolationBannerProps {
  violation: RuleViolation | null;
  onDismiss: () => void;
  onUndo: () => void;
}

export const ViolationBanner: React.FC<ViolationBannerProps> = ({
  violation,
  onDismiss,
  onUndo,
}) => {
  if (!violation) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-xl animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-red-950/95 border-2 border-red-500 rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(239,68,68,0.5)] text-white backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-red-600 rounded-xl text-white shrink-0 shadow-md animate-bounce">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-wider text-red-400">
                Regra {violation.ruleNumber} Infringida · {violation.location}
              </span>
              <button
                onClick={onDismiss}
                className="text-red-300 hover:text-white p-1 rounded-lg transition-colors"
                title="Fechar alerta"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="text-base font-bold text-white mt-0.5">
              {violation.title}
            </h4>

            <p className="text-sm text-red-100 mt-1.5 leading-relaxed">
              {violation.message}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={onUndo}
                className="px-3.5 py-1.5 bg-white text-red-900 hover:bg-red-50 rounded-lg text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Desfazer Movimento</span>
              </button>
              <button
                onClick={onDismiss}
                className="px-3 py-1.5 bg-red-900/60 hover:bg-red-900 text-red-200 rounded-lg text-xs font-medium transition-colors"
              >
                Entendi, vou reorganizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
