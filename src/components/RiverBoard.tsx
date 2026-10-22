import React from 'react';
import { Bank, CharacterId, CharacterState, RuleViolation, GamePhase, ClassicSubtheme } from '../types/game';
import { CharacterFigure } from './CharacterFigure';
import { Raft } from './Raft';
import { RedLever } from './RedLever';
import { Check, AlertCircle } from 'lucide-react';

interface RiverBoardProps {
  characters: Record<CharacterId, CharacterState>;
  raftBank: Bank;
  isSailing: boolean;
  onCharacterClick: (id: CharacterId) => void;
  onSail: () => void;
  canSail: boolean;
  currentViolation: RuleViolation | null;
  hintPassengers?: CharacterId[];
  phase?: GamePhase;
  subtheme?: ClassicSubtheme;
}

const ALL_CHAR_IDS: CharacterId[] = [
  'father',
  'mother',
  'boy1',
  'boy2',
  'girl1',
  'girl2',
  'police',
  'prisoner',
];

export const RiverBoard: React.FC<RiverBoardProps> = ({
  characters,
  raftBank,
  isSailing,
  onCharacterClick,
  onSail,
  canSail,
  currentViolation,
  hintPassengers = [],
  phase = 'classic',
  subtheme = 'teams',
}) => {
  const isSpace = phase === 'space';

  const leftShoreChars = ALL_CHAR_IDS.filter(
    (id) => characters[id].bank === 'left' && !characters[id].onRaft
  );
  const rightShoreChars = ALL_CHAR_IDS.filter(
    (id) => characters[id].bank === 'right' && !characters[id].onRaft
  );
  const raftChars = ALL_CHAR_IDS.filter((id) => characters[id].onRaft);

  const violatorIds = currentViolation ? currentViolation.violatorIds : [];
  const targetIds = currentViolation ? currentViolation.targetIds : [];

  const bgImage = isSpace
    ? '/src/assets/images/space_station_docking_bay_1792669486657.jpg'
    : '/src/assets/images/river_crossing_landscape_1791512677100.jpg';

  return (
    <div className="relative w-full flex-1 flex flex-col justify-between overflow-hidden select-none min-h-[580px] lg:min-h-[660px]">
      {/* Background Scenic Landscape */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={isSpace ? 'Estação Espacial' : 'Cenário do Rio'}
          className="w-full h-full object-cover object-center filter saturate-105"
          referrerPolicy="no-referrer"
        />
        {/* Subtle overlay gradient to ensure high contrast for game elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
      </div>

      {/* Main Play Area Split: Left Shore | River Channel | Right Shore */}
      <div className="relative z-10 w-full flex-1 max-w-7xl mx-auto px-2 sm:px-4 py-4 flex flex-col justify-between">
        {/* River Banks / Space Modules Arena */}
        <div className="w-full flex-1 grid grid-cols-12 gap-2 sm:gap-4 items-end pb-8">
          {/* Margem Esquerda / Módulo Alfa */}
          <div className="col-span-4 flex flex-col items-center justify-end pb-4">
            {/* Shore Label */}
            <div
              className={`mb-2 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full border shadow-md flex items-center gap-1.5 ${
                isSpace
                  ? 'bg-slate-900/90 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/80 text-amber-200 border-amber-600/40'
              }`}
            >
              <span>{isSpace ? 'Módulo Alfa (Base Lunar/Marte)' : 'Margem de Partida (Esquerda)'}</span>
              <span className="text-white text-[10px] bg-slate-800 px-1.5 py-0.2 rounded-full">
                {leftShoreChars.length}
              </span>
            </div>

            {/* Shore Platform Container */}
            <div
              className={`w-full min-h-[220px] rounded-2xl p-2.5 sm:p-4 flex flex-col justify-between relative shadow-xl backdrop-blur-md border-2 ${
                isSpace
                  ? 'bg-slate-950/75 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
                  : 'bg-amber-950/30 border-amber-800/50'
              }`}
            >
              {/* Character Dock Grid */}
              <div className="flex flex-wrap items-end justify-center gap-1.5 sm:gap-3 min-h-[160px]">
                {leftShoreChars.length === 0 ? (
                  <div className="flex items-center justify-center h-28 text-slate-300 text-xs italic">
                    {isSpace ? 'Módulo vazio' : 'Margem vazia'}
                  </div>
                ) : (
                  leftShoreChars.map((id) => (
                    <CharacterFigure
                      key={id}
                      id={id}
                      phase={phase}
                      subtheme={subtheme}
                      onClick={() => onCharacterClick(id)}
                      disabled={isSailing || raftBank !== 'left'}
                      isViolator={violatorIds.includes(id)}
                      isTarget={targetIds.includes(id)}
                      isHinted={hintPassengers.includes(id) && raftBank === 'left'}
                      size="md"
                    />
                  ))
                )}
              </div>

              {/* Lever Post / Airlock Console on Left Shore */}
              <div
                className={`mt-2 pt-2 border-t flex items-center justify-between ${
                  isSpace ? 'border-cyan-500/30' : 'border-amber-800/40'
                }`}
              >
                <div className={`text-[11px] font-medium ${isSpace ? 'text-cyan-300/90' : 'text-amber-200/90'}`}>
                  {raftBank === 'left'
                    ? isSpace
                      ? 'Cápsula acoplada aqui'
                      : 'Jangada atracada aqui'
                    : isSpace
                    ? 'Aguardando cápsula'
                    : 'Aguardando jangada'}
                </div>
                <RedLever
                  side="left"
                  phase={phase}
                  isActiveBank={raftBank === 'left'}
                  canSail={canSail}
                  onClick={onSail}
                  disabled={isSailing || raftBank !== 'left'}
                />
              </div>
            </div>
          </div>

          {/* Central Channel (River or Space Airlock Vacuum Track) */}
          <div className="col-span-4 flex flex-col items-center justify-end h-full relative pb-4">
            {/* Transit Flow Effect Overlay */}
            <div
              className={`absolute inset-x-0 bottom-6 h-36 rounded-2xl border backdrop-blur-2xs flex items-center justify-center pointer-events-none ${
                isSpace
                  ? 'bg-cyan-950/30 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                  : 'bg-cyan-500/10 border-cyan-400/20'
              }`}
            >
              <span className="text-[11px] text-cyan-200/70 font-semibold tracking-widest uppercase">
                {isSailing
                  ? isSpace
                    ? '🚀 Cápsula em Vôo Pressurizado...'
                    : '🌊 Jangada em travessia...'
                  : isSpace
                  ? 'Túnel de Vácuo Pressurizado (Eclusa)'
                  : 'Rio (Travessia)'}
              </span>
            </div>

            {/* Interactive Raft / Space Pod on Animated Track */}
            <div className="w-full relative h-[240px] flex items-end overflow-hidden z-20">
              <div
                className="absolute bottom-2 transition-all duration-1000 ease-in-out"
                style={{
                  left: raftBank === 'left' ? '0%' : 'calc(100% - 14.5rem)',
                }}
              >
                <Raft
                  bank={raftBank}
                  passengers={raftChars}
                  isSailing={isSailing}
                  onCharacterClick={onCharacterClick}
                  onSailClick={onSail}
                  canSail={canSail}
                  violators={violatorIds}
                  targets={targetIds}
                  phase={phase}
                  subtheme={subtheme}
                />
              </div>
            </div>
          </div>

          {/* Margem Direita / Nave de Evacuação */}
          <div className="col-span-4 flex flex-col items-center justify-end pb-4">
            {/* Shore Label */}
            <div
              className={`mb-2 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full border shadow-md flex items-center gap-1.5 ${
                isSpace
                  ? 'bg-slate-900/90 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-slate-900/80 text-emerald-300 border-emerald-600/40'
              }`}
            >
              <span>{isSpace ? 'Nave de Evacuação (Airlock A-3)' : 'Margem de Chegada (Direita)'}</span>
              <span className="text-white text-[10px] bg-slate-800 px-1.5 py-0.2 rounded-full">
                {rightShoreChars.length}
              </span>
            </div>

            {/* Shore Platform Container */}
            <div
              className={`w-full min-h-[220px] rounded-2xl p-2.5 sm:p-4 flex flex-col justify-between relative shadow-xl backdrop-blur-md border-2 ${
                isSpace
                  ? 'bg-slate-950/75 border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
                  : 'bg-emerald-950/30 border-emerald-800/50'
              }`}
            >
              {/* Character Dock Grid */}
              <div className="flex flex-wrap items-end justify-center gap-1.5 sm:gap-3 min-h-[160px]">
                {rightShoreChars.length === 0 ? (
                  <div className="flex items-center justify-center h-28 text-slate-300 text-xs italic">
                    {isSpace ? 'Ninguém no módulo de fuga ainda' : 'Ninguém aqui ainda'}
                  </div>
                ) : (
                  rightShoreChars.map((id) => (
                    <CharacterFigure
                      key={id}
                      id={id}
                      phase={phase}
                      subtheme={subtheme}
                      onClick={() => onCharacterClick(id)}
                      disabled={isSailing || raftBank !== 'right'}
                      isViolator={violatorIds.includes(id)}
                      isTarget={targetIds.includes(id)}
                      isHinted={hintPassengers.includes(id) && raftBank === 'right'}
                      size="md"
                    />
                  ))
                )}
              </div>

              {/* Lever Post on Right Shore */}
              <div
                className={`mt-2 pt-2 border-t flex items-center justify-between ${
                  isSpace ? 'border-amber-500/30' : 'border-emerald-800/40'
                }`}
              >
                <div className={`text-[11px] font-medium ${isSpace ? 'text-amber-200/90' : 'text-emerald-200/90'}`}>
                  {raftBank === 'right'
                    ? isSpace
                      ? 'Cápsula acoplada aqui'
                      : 'Jangada atracada aqui'
                    : isSpace
                    ? 'Aguardando cápsula'
                    : 'Aguardando jangada'}
                </div>
                <RedLever
                  side="right"
                  phase={phase}
                  isActiveBank={raftBank === 'right'}
                  canSail={canSail}
                  onClick={onSail}
                  disabled={isSailing || raftBank !== 'right'}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Rule Status Bar */}
        <div className="w-full bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>{isSpace ? 'Protocolos de Segurança Orbital (Regras):' : 'Regras Lógicas do Teste:'}</span>
            </span>
            <span className="text-[11px] text-slate-400">
              {currentViolation ? (
                <span className="text-red-400 font-bold flex items-center gap-1 animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5" /> Atenção: {isSpace ? 'Protocolo' : 'Regra'} {currentViolation.ruleNumber} Infringido(a)!
                </span>
              ) : (
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />{' '}
                  {isSpace
                    ? 'Embarque até 2 tripulantes e acione o terminal de eclusa'
                    : 'Embarque até 2 pessoas e use o ponto vermelho para atravessar'}
                </span>
              )}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 text-[11px]">
            {/* Rule 1 */}
            <div
              className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                currentViolation?.ruleNumber === 1
                  ? 'bg-red-950/80 border-red-600 text-red-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                  currentViolation?.ruleNumber === 1 ? 'bg-red-600 text-white font-bold' : 'bg-emerald-600 text-white'
                }`}
              >
                {currentViolation?.ruleNumber === 1 ? '!' : '✓'}
              </div>
              <span className="truncate">{isSpace ? '1. Máx 2 na cápsula' : '1. Máx 2 na jangada'}</span>
            </div>

            {/* Rule 2 */}
            <div
              className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                currentViolation?.ruleNumber === 2
                  ? 'bg-red-950/80 border-red-600 text-red-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                  currentViolation?.ruleNumber === 2 ? 'bg-red-600 text-white font-bold' : 'bg-emerald-600 text-white'
                }`}
              >
                {currentViolation?.ruleNumber === 2 ? '!' : '✓'}
              </div>
              <span className="truncate">
                {isSpace
                  ? '2. Comandante c/ Cadetes só c/ Engenheira'
                  : subtheme === 'teams'
                  ? '2. Mentor Alfa c/ Alunas só c/ Mentora'
                  : '2. Pai c/ meninas só c/ Mãe'}
              </span>
            </div>

            {/* Rule 3 */}
            <div
              className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                currentViolation?.ruleNumber === 3
                  ? 'bg-red-950/80 border-red-600 text-red-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                  currentViolation?.ruleNumber === 3 ? 'bg-red-600 text-white font-bold' : 'bg-emerald-600 text-white'
                }`}
              >
                {currentViolation?.ruleNumber === 3 ? '!' : '✓'}
              </div>
              <span className="truncate">
                {isSpace
                  ? '3. Engenheira c/ Astrofísicos só c/ Comandante'
                  : subtheme === 'teams'
                  ? '3. Mentora Beta c/ Alunos só c/ Mentor'
                  : '3. Mãe c/ meninos só c/ Pai'}
              </span>
            </div>

            {/* Rule 4 */}
            <div
              className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                currentViolation?.ruleNumber === 4
                  ? 'bg-red-950/80 border-red-600 text-red-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                  currentViolation?.ruleNumber === 4 ? 'bg-red-600 text-white font-bold' : 'bg-emerald-600 text-white'
                }`}
              >
                {currentViolation?.ruleNumber === 4 ? '!' : '✓'}
              </div>
              <span className="truncate">
                {isSpace
                  ? '4. Espécime só c/ Androide Unit-7'
                  : subtheme === 'teams'
                  ? '4. Infratora só c/ Fiscal da Prova'
                  : '4. Prisioneira só c/ Policial'}
              </span>
            </div>

            {/* Rule 5 */}
            <div
              className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                currentViolation?.ruleNumber === 5
                  ? 'bg-red-950/80 border-red-600 text-red-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                  currentViolation?.ruleNumber === 5
                    ? 'bg-red-600 text-white font-bold'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {currentViolation?.ruleNumber === 5 ? '!' : '✓'}
              </div>
              <span className="truncate">
                {isSpace
                  ? '5. Piloto habilitado na cápsula'
                  : subtheme === 'teams'
                  ? '5. Brevê de condutor (Mentores/Fiscal)'
                  : '5. Condutor na jangada'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
