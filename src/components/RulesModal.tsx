import React from 'react';
import { X, CheckCircle, AlertTriangle, BookOpen, Clock, Users, ArrowRightLeft } from 'lucide-react';
import { CHARACTERS } from '../utils/characters';
import { CharacterId } from '../types/game';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ALL_CHARS: CharacterId[] = [
  'father',
  'mother',
  'boy1',
  'boy2',
  'girl1',
  'girl2',
  'police',
  'prisoner',
];

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-white p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Regras e Instruções do Jogo</h3>
            <p className="text-xs text-slate-400">
              Guia didático para o Teste de QI Japonês da Travessia do Rio
            </p>
          </div>
        </div>

        {/* Objective */}
        <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 mb-5 text-sm text-blue-200">
          <strong className="text-white block mb-1">🎯 Objetivo Principal:</strong>
          Transportar <strong>todas as 8 pessoas</strong> da margem esquerda para a margem direita do rio, utilizando a jangada de madeira sem infringir nenhuma das 5 restrições lógicas.
        </div>

        {/* The 5 Official Rules */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            As 5 Regras Oficiais:
          </h4>

          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs sm:text-sm">
            <span className="font-bold text-blue-400 mr-2">1. Capacidade:</span>
            No máximo <strong>duas pessoas</strong> podem passar de cada vez na jangada.
          </div>

          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs sm:text-sm">
            <span className="font-bold text-blue-400 mr-2">2. Pai e Filhas:</span>
            O <strong>Pai não pode ficar com nenhuma das meninas</strong> sem a presença da Mãe (nem na margem, nem na jangada).
          </div>

          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs sm:text-sm">
            <span className="font-bold text-blue-400 mr-2">3. Mãe e Filhos:</span>
            A <strong>Mãe não pode ficar na presença dos meninos</strong> sem a presença do Pai (nem na margem, nem na jangada).
          </div>

          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs sm:text-sm">
            <span className="font-bold text-blue-400 mr-2">4. Prisioneira Ruiva:</span>
            A <strong>mulher de cabelo ruivo que está presa</strong> não pode ficar na presença de nenhum dos membros da família sem a presença do policial.
          </div>

          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs sm:text-sm">
            <span className="font-bold text-blue-400 mr-2">5. Pilotos da Jangada:</span>
            <strong>Só o policial e os pais podem conduzir a jangada.</strong> Filhos e prisioneira não sabem navegar sozinhos.
          </div>
        </div>

        {/* How to Play / Controls */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
            Como Jogar e Comandos:
          </h4>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
            <li>
              <strong>Embarcar:</strong> Clique em uma pessoa na mesma margem onde a jangada está atracada para que ela suba na jangada.
            </li>
            <li>
              <strong>Desembarcar:</strong> Clique em uma pessoa que está dentro da jangada para que ela retorne à margem atual.
            </li>
            <li>
              <strong>Navegar:</strong> Clique no <strong>ponto vermelho</strong> (alavanca) na margem da jangada ou no botão <em>"Atravessar"</em> na própria jangada.
            </li>
            <li>
              <strong>Desfazer:</strong> Errou um movimento? Use o botão <em>Desfazer</em> para voltar um passo atrás no histórico sem perder o ritmo.
            </li>
          </ul>
        </div>

        {/* Roles Table */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            Tabela de Personagens e Funções:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {ALL_CHARS.map((id) => {
              const c = CHARACTERS[id];
              return (
                <div
                  key={id}
                  className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/60 flex items-start justify-between gap-2"
                >
                  <div>
                    <span className="font-bold text-white block">{c.name}</span>
                    <span className="text-[11px] text-slate-400">{c.description}</span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-semibold whitespace-nowrap ${
                      c.isPilot
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {c.isPilot ? '⛵ Condutor' : 'Passageiro'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Curiosidade / Origem */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
            <Clock className="w-4 h-4" />
            História do Teste de QI Japonês:
          </div>
          Este teste clássico ficou mundialmente famoso nos anos 2000 em versão Flash interativa no Japão, sendo utilizado em dinâmicas de raciocínio lógico em vestibulares e seleções de empresas de Tecnologia da Informação. O tempo médio medido de resolução é de <strong>15 minutos</strong>, e a solução ótima teórica requer no mínimo <strong>17 travessias de jangada</strong>!
        </div>

        {/* Close Button Bottom */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            Fechar e Continuar Jogando
          </button>
        </div>
      </div>
    </div>
  );
};
