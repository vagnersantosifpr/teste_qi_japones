import React from 'react';
import { X, CheckCircle, AlertTriangle, BookOpen, Clock, Users, ArrowRightLeft, Rocket, GraduationCap } from 'lucide-react';
import { getCharacterDef } from '../utils/characters';
import { CharacterId, GamePhase, ClassicSubtheme } from '../types/game';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  phase?: GamePhase;
  subtheme?: ClassicSubtheme;
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

export const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
  phase = 'classic',
  subtheme = 'teams',
}) => {
  if (!isOpen) return null;

  const isSpace = phase === 'space';
  const isTeams = !isSpace && subtheme === 'teams';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-white p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`p-2.5 rounded-xl text-white shadow-md ${isSpace ? 'bg-cyan-600' : isTeams ? 'bg-emerald-600' : 'bg-blue-600'}`}>
            {isSpace ? <Rocket className="w-6 h-6" /> : isTeams ? <GraduationCap className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {isSpace
                ? 'Fase 2: Protocolos de Segurança Orbital'
                : isTeams
                ? 'Fase 1: Regras da Gincana das Equipes'
                : 'Regras e Instruções do Jogo (Clássico 2009)'}
            </h3>
            <p className="text-xs text-slate-400">
              {isSpace
                ? 'Manual de segurança da Estação Espacial Marte-01'
                : isTeams
                ? 'Adaptação pedagógica ética para o Ensino Técnico e Médio (IFPR)'
                : 'Guia do Teste de QI Japonês da Travessia do Rio (2009)'}
            </p>
          </div>
        </div>

        {/* Pedagogical Note on Theme Adaptation */}
        {isTeams && (
          <div className="bg-emerald-950/40 border border-emerald-600/50 rounded-xl p-3.5 mb-5 text-xs text-emerald-200">
            <span className="font-bold text-emerald-300 block mb-1">
              🎓 Por que a temática foi adaptada para a sala de aula?
            </span>
            <p className="leading-relaxed">
              No teste japonês original dos anos 2000, as regras alegavam que o pai não podia ficar com as filhas e a mãe não podia ficar com os meninos por motivos familiares antiquados, gerando estranheza social entre os estudantes. 
              Nesta <strong>Adaptação da Gincana das Equipes</strong>, as restrições são baseadas em <strong>imparcialidade de olimpíada científica, código anti-espionagem de projeto e custódia de segurança</strong> — fazendo 100% de sentido social e preservando rigorosamente os mesmos <strong>17 passos da solução ótima</strong>!
            </p>
          </div>
        )}

        {/* Objective */}
        <div className={`border rounded-xl p-4 mb-5 text-sm ${isSpace ? 'bg-cyan-950/40 border-cyan-800/60 text-cyan-200' : 'bg-blue-950/40 border-blue-800/60 text-blue-200'}`}>
          <strong className="text-white block mb-1">🎯 Objetivo Principal:</strong>
          {isSpace ? (
            <span>
              Transportar com segurança <strong>todos os 8 tripulantes e espécimes</strong> do Módulo Alfa para a Nave de Evacuação através da cápsula pressurizada, sem violar os 5 protocolos de contenção e pilotagem.
            </span>
          ) : isTeams ? (
            <span>
              Transportar com segurança <strong>todos os 8 participantes</strong> (mentores, estudantes das duas equipes e a competidora detida) para a outra margem do rio, cumprindo as 5 regras de integridade e pilotagem.
            </span>
          ) : (
            <span>
              Transportar <strong>todas as 8 pessoas</strong> da margem esquerda para a margem direita do rio, utilizando a jangada de madeira sem infringir nenhuma das 5 restrições lógicas.
            </span>
          )}
        </div>

        {/* The 5 Official Rules */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            {isSpace
              ? 'Os 5 Protocolos de Segurança Orbital:'
              : isTeams
              ? 'As 5 Regras de Integridade da Gincana:'
              : 'As 5 Regras Oficiais:'}
          </h4>

          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs sm:text-sm">
            <span className="font-bold text-blue-400 mr-2">1. Capacidade:</span>
            No máximo <strong>duas pessoas</strong> podem passar de cada vez {isSpace ? 'na cápsula de vácuo' : 'na jangada'}.
          </div>

          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs sm:text-sm">
            <span className="font-bold text-blue-400 mr-2">
              {isSpace ? '2. Comandante Silva:' : isTeams ? '2. Mentor Carlos (Equipe Alfa):' : '2. Pai de Família:'}
            </span>
            {isSpace ? (
              <span>
                O <strong>Comandante Silva não pode ficar com os Cadetes</strong> sem a presença da Engenheira Elena (protocolo de tutela e segurança).
              </span>
            ) : isTeams ? (
              <span>
                O <strong>Mentor Carlos (Equipe Alfa)</strong> não pode ficar a sós com as alunas da <strong>Equipe Beta</strong> sem a presença da <strong>Mentora Beatriz</strong> <em>(regra de integridade e anti-espionagem do projeto da equipe rival)</em>.
              </span>
            ) : (
              <span>
                O <strong>Pai não pode ficar com nenhuma das meninas</strong> sem a presença da Mãe (nem na margem, nem na jangada).
              </span>
            )}
          </div>

          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs sm:text-sm">
            <span className="font-bold text-blue-400 mr-2">
              {isSpace ? '3. Engenheira Elena:' : isTeams ? '3. Mentora Beatriz (Equipe Beta):' : '3. Mãe de Família:'}
            </span>
            {isSpace ? (
              <span>
                A <strong>Engenheira Elena não pode ficar com os Astrofísicos</strong> sem a presença do Comandante Silva (protocolo de liderança civil-militar).
              </span>
            ) : isTeams ? (
              <span>
                A <strong>Mentora Beatriz (Equipe Beta)</strong> não pode ficar a sós com os alunos da <strong>Equipe Alfa</strong> sem a presença do <strong>Mentor Carlos</strong> <em>(regra de integridade e supervisão justa)</em>.
              </span>
            ) : (
              <span>
                A <strong>Mãe não pode ficar na presença dos meninos</strong> sem a presença do Pai (nem na margem, nem na jangada).
              </span>
            )}
          </div>

          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs sm:text-sm">
            <span className="font-bold text-blue-400 mr-2">
              {isSpace ? '4. Espécime Alienígena:' : isTeams ? '4. Infratora sob Custódia:' : '4. Prisioneira:'}
            </span>
            {isSpace ? (
              <span>
                O <strong>Espécime Alienígena</strong> não pode ficar com nenhum membro humano da tripulação sem a contenção ativa do <strong>Androide Unit-7</strong>.
              </span>
            ) : isTeams ? (
              <span>
                A <strong>competidora penalizada por tentativa de sabotagem</strong> não pode se aproximar de nenhum aluno ou mentor sem a presença e custódia do <strong>Fiscal de Prova Marcos</strong>.
              </span>
            ) : (
              <span>
                A <strong>mulher de cabelo ruivo que está presa</strong> não pode ficar na presença de nenhum dos membros da família sem a presença do policial.
              </span>
            )}
          </div>

          <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700 text-xs sm:text-sm">
            <span className="font-bold text-blue-400 mr-2">5. Habilitação de Condução:</span>
            {isSpace ? (
              <span>
                <strong>Só o Comandante, a Engenheira e o Androide</strong> possuem credencial biométrica para operar a cápsula pressurizada.
              </span>
            ) : isTeams ? (
              <span>
                <strong>Só os dois Mentores e o Fiscal de Prova</strong> possuem habilitação náutica e brevê para pilotar a jangada. Os estudantes e a competidora detida não sabem navegar sozinhos.
              </span>
            ) : (
              <span>
                <strong>Só o policial e os pais podem conduzir a jangada.</strong> Filhos e prisioneira não sabem navegar sozinhos.
              </span>
            )}
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
              const c = getCharacterDef(id, phase, subtheme);
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
                    {c.isPilot
                      ? isSpace
                        ? '🚀 Piloto'
                        : '⛵ Condutor'
                      : isSpace
                      ? 'Tripulante'
                      : isTeams
                      ? id === 'prisoner'
                        ? '⚠️ Penalizada'
                        : 'Aluno(a)'
                      : 'Passageiro'}
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
