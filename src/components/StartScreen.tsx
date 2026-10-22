import React from 'react';
import { Play, Sparkles, Clock, ShieldAlert, Award, User, Rocket, Waves, GraduationCap, History } from 'lucide-react';
import { CharacterFigure } from './CharacterFigure';
import { CharacterId, GamePhase, ClassicSubtheme } from '../types/game';

interface StartScreenProps {
  studentName: string;
  onStudentNameChange: (name: string) => void;
  onStart: () => void;
  phase: GamePhase;
  onPhaseChange: (phase: GamePhase) => void;
  subtheme?: ClassicSubtheme;
  onSubthemeChange?: (subtheme: ClassicSubtheme) => void;
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
  phase,
  onPhaseChange,
  subtheme = 'teams',
  onSubthemeChange,
}) => {
  const isSpace = phase === 'space';
  const isTeams = !isSpace && subtheme === 'teams';

  return (
    <div className="relative min-h-[calc(100vh-65px)] w-full flex items-center justify-center p-4 lg:p-8 bg-slate-950/85 backdrop-blur-md z-40">
      <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 lg:p-10 text-white flex flex-col items-center text-center">
        {/* Phase Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-950/90 border border-slate-800 rounded-2xl mb-4 shadow-inner max-w-md w-full">
          <button
            onClick={() => onPhaseChange('classic')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              !isSpace
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Fase 1: Travessia do Rio</span>
          </button>
          <button
            onClick={() => onPhaseChange('space')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isSpace
                ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fase 2: Estação Espacial</span>
          </button>
        </div>

        {/* Subtheme switcher for Phase 1 (Rio) */}
        {!isSpace && onSubthemeChange && (
          <div className="flex items-center gap-1 bg-slate-950/70 border border-slate-800/90 rounded-xl p-1 mb-3 text-xs">
            <span className="text-slate-400 px-2 font-medium">Temática da Fase 1:</span>
            <button
              onClick={() => onSubthemeChange('teams')}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                subtheme === 'teams'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Adaptação pedagógica recomendada: duas equipes escolares, código de ética e regras com sentido social pleno"
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              <span>Gincana das Equipes (Recomendado)</span>
            </button>
            <button
              onClick={() => onSubthemeChange('family')}
              className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                subtheme === 'family'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Versão histórica do puzzle japonês original de 2009"
            >
              <History className="w-3.5 h-3.5 text-slate-300" />
              <span>Clássico 2009 (Família)</span>
            </button>
          </div>
        )}

        {/* Title Badge */}
        <div
          className={`flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border mb-3 ${
            isSpace
              ? 'text-cyan-300 bg-cyan-950/80 border-cyan-800/80 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              : isTeams
              ? 'text-emerald-300 bg-emerald-950/80 border-emerald-800'
              : 'text-blue-400 bg-blue-950/80 border-blue-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {isSpace
              ? 'NOVA FASE · DESAFIO ORBITAL SCI-FI'
              : isTeams
              ? 'ADAPTAÇÃO PEDAGÓGICA ÉTICA · GINCANA DE LÓGICA'
              : 'DESAFIO HISTÓRICO DE LÓGICA'}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
          {isSpace
            ? 'Fase 2: Estação Espacial Marte-01'
            : isTeams
            ? 'Fase 1: Gincana das Equipes · Travessia do Rio'
            : 'Teste de QI Japonês · Travessia do Rio'}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mb-5">
          {isSpace ? (
            <span>
              O objetivo é evacuar <strong>todos os 8 tripulantes e espécimes</strong> do Módulo Alfa para a Nave de Fuga através da cápsula de vácuo, obedecendo às restrições de comando e contenção biológica.
            </span>
          ) : isTeams ? (
            <span>
              Duas equipes rivais (<strong>Equipe Alfa</strong> e <strong>Equipe Beta</strong>) precisam cruzar o rio para a Grande Final da Olimpíada de Robótica. Para evitar suspeitas de espionagem do projeto ou sabotagem, todos devem cumprir rigorosamente o <strong>Código de Imparcialidade e Ética</strong>!
            </span>
          ) : (
            <span>
              O objetivo é passar <strong>todas as 8 pessoas</strong> para a outra margem do rio usando a jangada, respeitando rigorosamente as regras originais de segurança e condução.
            </span>
          )}
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
            Seu nome será registrado no <strong>relatório final de lógica</strong> do professor.
          </span>
        </div>

        {/* Big Circular Button */}
        <div className="relative my-2 flex flex-col items-center">
          <button
            onClick={onStart}
            className={`group relative w-32 h-32 sm:w-36 sm:h-36 rounded-full text-white font-extrabold text-lg sm:text-xl hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer ring-4 ${
              isSpace
                ? 'bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-500 shadow-[0_0_40px_rgba(6,182,212,0.8)] hover:shadow-[0_0_60px_rgba(56,189,248,1)] ring-cyan-400/60'
                : 'bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-400 shadow-[0_0_35px_rgba(37,99,235,0.7)] hover:shadow-[0_0_55px_rgba(59,130,246,0.95)] ring-blue-400/50'
            }`}
            aria-label="Carregue no botão para começar"
          >
            <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping pointer-events-none opacity-40" />
            {isSpace ? (
              <Rocket className="w-9 h-9 text-white group-hover:scale-110 transition-transform" />
            ) : (
              <Play className="w-9 h-9 fill-white translate-x-0.5 group-hover:scale-110 transition-transform" />
            )}
            <span className="tracking-wide text-xs sm:text-sm uppercase font-black">
              {isSpace ? 'DECOLAR' : 'COMEÇAR'}
            </span>
          </button>
          <span className="mt-3 text-xs text-blue-300 font-medium animate-pulse">
            👆 Carregue no botão circular para iniciar
          </span>
        </div>

        {/* Character Lineup Preview */}
        <div className="w-full my-6 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <h3 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-wider">
            {isSpace
              ? 'Os 8 Integrantes da Missão Espacial'
              : isTeams
              ? 'Os 8 Participantes da Gincana Fluvial'
              : 'Os 8 Integrantes da Travessia'}
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 justify-items-center">
            {LINEUP.map((id) => (
              <div key={id} className="flex flex-col items-center pointer-events-none">
                <CharacterFigure id={id} phase={phase} subtheme={subtheme} size="sm" disabled={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Rules Grid */}
        <div className="w-full text-left my-4 bg-slate-800/40 border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            {isSpace
              ? 'Os 5 Protocolos de Segurança Orbital:'
              : isTeams
              ? 'As 5 Regras Éticas da Gincana das Equipes:'
              : 'As 5 Regras Obrigatórias do Desafio:'}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="font-bold text-blue-400 shrink-0">1.</span>
              <span>
                No máximo <strong>duas pessoas</strong> podem passar na{' '}
                {isSpace ? 'cápsula de vácuo' : 'jangada'} de cada vez.
              </span>
            </li>
            <li className="flex items-start gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="font-bold text-blue-400 shrink-0">2.</span>
              <span>
                {isSpace ? (
                  <>
                    O <strong>Comandante Silva</strong> não pode ficar com os <strong>Cadetes</strong> sem a presença da <strong>Engenheira Elena</strong>.
                  </>
                ) : isTeams ? (
                  <>
                    O <strong>Mentor Carlos (Equipe Alfa)</strong> não pode ficar com as alunas da <strong>Equipe Beta</strong> sem a presença da <strong>Mentora Beatriz</strong> <em>(anti-espionagem de projeto e garantia de integridade)</em>.
                  </>
                ) : (
                  <>
                    O <strong>pai não pode ficar com nenhuma das meninas</strong> sem a presença da mãe.
                  </>
                )}
              </span>
            </li>
            <li className="flex items-start gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="font-bold text-blue-400 shrink-0">3.</span>
              <span>
                {isSpace ? (
                  <>
                    A <strong>Engenheira Elena</strong> não pode ficar com os <strong>Astrofísicos</strong> sem a presença do <strong>Comandante Silva</strong>.
                  </>
                ) : isTeams ? (
                  <>
                    A <strong>Mentora Beatriz (Equipe Beta)</strong> não pode ficar com os alunos da <strong>Equipe Alfa</strong> sem a presença do <strong>Mentor Carlos</strong> <em>(anti-espionagem de projeto e supervisão justa)</em>.
                  </>
                ) : (
                  <>
                    A <strong>mãe não pode ficar na presença dos meninos</strong> sem a presença do pai.
                  </>
                )}
              </span>
            </li>
            <li className="flex items-start gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="font-bold text-blue-400 shrink-0">4.</span>
              <span>
                {isSpace ? (
                  <>
                    O <strong>Espécime Alienígena</strong> não pode ficar com nenhum tripulante humano sem a presença do <strong>Androide Unit-7</strong>.
                  </>
                ) : isTeams ? (
                  <>
                    A <strong>competidora penalizada por tentativa de sabotagem</strong> não pode ficar com nenhum aluno ou mentor sem o <strong>Fiscal de Prova Marcos</strong>.
                  </>
                ) : (
                  <>
                    A <strong>mulher de cabelo ruivo que está presa</strong> não pode ficar com a família sem a presença do <strong>policial</strong>.
                  </>
                )}
              </span>
            </li>
            <li className="flex items-start gap-2 md:col-span-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
              <span className="font-bold text-blue-400 shrink-0">5.</span>
              <span>
                {isSpace ? (
                  <>
                    <strong>Só o Comandante, a Engenheira e o Androide Unit-7</strong> têm credencial biométrica para pilotar a cápsula pressurizada.
                  </>
                ) : isTeams ? (
                  <>
                    <strong>Só os dois Mentores e o Fiscal de Prova</strong> possuem habilitação náutica e brevê para pilotar o barco. Alunos e a infratora não sabem conduzir.
                  </>
                ) : (
                  <>
                    <strong>Só o policial e os pais podem conduzir a jangada.</strong> Filhos e prisioneira não sabem navegar sozinhos.
                  </>
                )}
              </span>
            </li>
          </ul>
        </div>

        {/* Historical & Pedagogical Context Footer */}
        <div className="w-full flex flex-col gap-3 pt-3 border-t border-slate-800 text-slate-400 text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{isSpace ? 'Desafio de Algoritmos e Estados Ótimos' : 'Tempo médio de resolução: 15 minutos'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Mínimo Teórico: <strong>17 travessias</strong></span>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 text-center italic border-t border-slate-800 pt-2">
            Versão e temática desenvolvidas por: Prof. Me. Vagner Simões Santos (IFPR - Campus Assis Chateaubriand), 2026.
          </div>
        </div>
      </div>
    </div>
  );
};
