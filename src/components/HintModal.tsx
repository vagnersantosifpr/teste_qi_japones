import React from 'react';
import { Lightbulb, X, Check, ArrowRight } from 'lucide-react';
import { SolverStep } from '../utils/solver';
import { CharacterId } from '../types/game';
import { CHARACTERS } from '../utils/characters';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hintStep: SolverStep | null;
  onApplyHint?: (passengers: CharacterId[]) => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  onClose,
  hintStep,
  onApplyHint,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-emerald-800/80 rounded-2xl max-w-lg w-full shadow-2xl text-white p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Fechar dica"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-md">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Dica Lógica / Próximo Passo</h3>
            <p className="text-xs text-slate-400">
              Análise algorítmica do estado atual
            </p>
          </div>
        </div>

        {hintStep ? (
          <div className="space-y-4">
            <div className="bg-emerald-950/40 border border-emerald-700/50 rounded-xl p-4 text-emerald-200 text-sm">
              <span className="font-bold text-emerald-400 block mb-1">
                💡 Sugestão para o próximo movimento:
              </span>
              <p className="text-white font-medium text-base">
                {hintStep.explanation}
              </p>
            </div>

            <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/80 text-xs text-slate-300">
              <span className="font-bold text-slate-200 block mb-2">
                Passageiros sugeridos para a jangada:
              </span>
              <div className="flex flex-wrap gap-2">
                {hintStep.passengers.map((id) => {
                  const c = CHARACTERS[id];
                  return (
                    <div
                      key={id}
                      className="px-2.5 py-1.5 bg-slate-700 rounded-lg flex items-center gap-1.5 font-semibold text-white"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{c.name}</span>
                      <span className="text-[10px] text-slate-300">
                        ({c.isPilot ? 'Condutor' : 'Passageiro'})
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              <strong>Dica pedagógica:</strong> Em problemas de travessia de rio com restrições mútuas, certifique-se de que a pessoa que fica para trás não desencadeia uma violação na margem desprotegida.
            </p>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors"
              >
                Vou tentar sozinho
              </button>

              {onApplyHint && (
                <button
                  onClick={() => {
                    onApplyHint(hintStep.passengers);
                    onClose();
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Embarcar Sugeridos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-800/60 p-4 rounded-xl text-center text-sm text-slate-300">
              Não foi possível encontrar um caminho direto a partir desta configuração, ou você já está na vitória! Se estiver preso em um estado proibido, clique no botão <strong>Desfazer</strong> para recuar um passo.
            </div>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
