import React from 'react';
import { Play, Sparkles, Clock, Compass, ShieldAlert, Award, User } from 'lucide-react';
import { CharacterFigure } from './CharacterFigure';
import { CharacterId } from '../types/game';

interface StartScreenProps {
  studentName: string;
  onStudentNameChange: (name: string) => void;
  onStart: () => void;
}

const LINEUP: CharacterId[] = [
  'father',
  'mother',
  'boy1',
  'boy2',
  'girl1',
  'girl2',
  'police',
  'prisoner',
];

export const StartScreen: React.FC<StartScreenProps> = ({
  studentName,
  onStudentNameChange,
  onStart,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-65px)] w-full flex items-center justify-center p-4 lg:p-8 bg-slate-950/80 backdrop-blur-sm z-40">
      <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 lg:p-10 text-white flex flex-col items-center text-center">
        {/* Japanese Title Badge */}
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>DESAFIO DE LÓGICA E ALGORITMOS</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
          Teste de QI Japonês · Travessia do Rio
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mb-5">
          O objetivo é passar <strong>todas as 8 pessoas</strong> para a outra margem do rio usando a jangada, respeitando rigorosamente as regras de segurança familiar e condução.
        </p>

        {/* Student Name Input Field */}
        <div className="w-full max-w-md mx-auto mb-5 bg-slate-800/80 p-3.5 sm:p-4 rounded-xl border border-slate-700/80 shadow-md flex flex-col items-center text-left">
          <label
            htmlFor="student-name-input"
            className="w-full text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
          >
            <User className="w-4 h-4 text-blue-400" />
            Nome do(a) Aluno(a) / Participante:
          </label>
          <input
            id="student-name-input"
            type="text"
            value={studentName}
            onChange={(e) => onStudentNameChange(e.target.value)}
            placeholder="Digite o seu nome completo..."
            className="w-full px-3.5 py-2 bg-slate-900/90 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 rounded-lg text-sm text-white placeholder-slate-400 outline-none transition-all text-center font-medium"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onStart();
              }
            }}
          />
          <span className="text-[11px] text-slate-400 mt-1.5 text-center w-full">
            Seu nome será exibido no <strong>painel final de pontuação</strong> e relatório.
          </span>
        </div>

        {/* Big Circular Blue Button - As requested in the brief! */}
        <div className="relative my-2 flex flex-col items-center">
          <button
            onClick={onStart}
            className="group relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-400 text-white font-extrabold text-lg sm:text-xl shadow-[0_0_35px_rgba(37,99,235,0.7)] hover:shadow-[0_0_55px_rgba(59,130,246,0.95)] hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer ring-4 ring-blue-400/50"
            aria-label="Carregue no botão azul circular para começar"
          >
            <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping pointer-events-none opacity-40" />
            <Play className="w-9 h-9 fill-white translate-x-0.5 group-hover:scale-110 transition-transform" />
            <span className="tracking-wide text-xs sm:text-sm uppercase font-black">
              COMEÇAR
            </span>
          </button>
          <span className="mt-3 text-xs text-blue-300 font-medium animate-pulse">
            👆 Carregue no botão azul circular para começar
          </span>
        </div>

        {/* Character Lineup Preview */}
        <div className="w-full my-6 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <h3 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-wider">
            Os 8 Integrantes da Travessia
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 justify-items-center">
            {LINEUP.map((id) => (
              <div key={id} className="flex flex-col items-center pointer-events-none">
                <CharacterFigure id={id} size="sm" disabled={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Rules Grid */}
        <div className="w-full text-left my-4 bg-slate-800/40 border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            As 5 Regras Obrigatórias do Desafio:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="font-bold text-blue-400 shrink-0">1.</span>
              <span>No máximo <strong>duas pessoas</strong> podem passar na jangada de cada vez.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="font-bold text-blue-400 shrink-0">2.</span>
              <span>O <strong>pai não pode ficar com nenhuma das meninas</strong> sem a presença da mãe.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="font-bold text-blue-400 shrink-0">3.</span>
              <span>A <strong>mãe não pode ficar na presença dos meninos</strong> sem a presença do pai.</span>
            </li>
            <li className="flex items-start gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="font-bold text-blue-400 shrink-0">4.</span>
              <span>A <strong>mulher de cabelo ruivo que está presa</strong> não pode ficar com nenhum membro da família sem a presença do policial.</span>
            </li>
            <li className="flex items-start gap-2 md:col-span-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="font-bold text-blue-400 shrink-0">5.</span>
              <span><strong>Só o policial e os pais podem conduzir a jangada.</strong> Filhos e prisioneira não sabem navegar sozinhos.</span>
            </li>
          </ul>
        </div>

        {/* Historical Context Footer */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 text-slate-400 text-xs">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Tempo médio de resolução no Japão: <strong>15 minutos</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>Utilizado em seleção de Universidades e empresas de T.I.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
