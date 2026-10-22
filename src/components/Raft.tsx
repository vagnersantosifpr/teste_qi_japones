import React from 'react';
import { CharacterId, Bank, GamePhase, ClassicSubtheme } from '../types/game';
import { CharacterFigure } from './CharacterFigure';
import { Rocket, Anchor } from 'lucide-react';

interface RaftProps {
  bank: Bank;
  passengers: CharacterId[];
  isSailing: boolean;
  onCharacterClick: (id: CharacterId) => void;
  onSailClick: () => void;
  canSail: boolean;
  violators?: CharacterId[];
  targets?: CharacterId[];
  phase?: GamePhase;
  subtheme?: ClassicSubtheme;
}

export const Raft: React.FC<RaftProps> = ({
  passengers,
  isSailing,
  onCharacterClick,
  onSailClick,
  canSail,
  violators = [],
  targets = [],
  phase = 'classic',
  subtheme = 'teams',
}) => {
  const isSpace = phase === 'space';

  return (
    <div
      className={`relative flex flex-col items-center z-20 ${
        isSailing ? 'pointer-events-none' : ''
      }`}
    >
      {/* Sail & Mast or Sci-Fi Mag-Guideway */}
      <div className="relative flex flex-col items-center">
        {!isSpace ? (
          /* White Triangular Sail */
          <div className="relative w-28 h-32 flex items-end">
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
              <rect x="78" y="5" width="5" height="115" rx="2" fill="#78350f" />
              <rect x="5" y="112" width="76" height="4" rx="1.5" fill="#5c2608" />
              <path
                d="M78 10 L8 110 L78 110 Z"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1.5"
              />
              <path
                d="M78 25 Q45 75 78 100"
                stroke="#cbd5e1"
                strokeWidth="1"
                fill="none"
                strokeDasharray="3 3"
              />
              <polygon points="83,5 98,10 83,16" fill="#ef4444" />
            </svg>
          </div>
        ) : (
          /* Sci-Fi Vacuum Transit Canopy / Plasma Arc */
          <div className="relative w-36 h-24 flex flex-col items-center justify-end">
            <svg viewBox="0 0 140 80" className="w-full h-full drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
              {/* Pressurized Glass Dome */}
              <path
                d="M15 75 Q70 5 125 75 Z"
                fill="#0369a1"
                fillOpacity="0.25"
                stroke="#38bdf8"
                strokeWidth="2"
              />
              <path
                d="M25 70 Q70 18 115 70"
                fill="none"
                stroke="#7dd3fc"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.8"
              />
              {/* Top Beacon */}
              <circle cx="70" cy="20" r="4" fill="#38bdf8" />
              <circle cx="70" cy="20" r="2" fill="#ffffff" />
            </svg>
            <div className="absolute top-1 text-[9px] font-mono uppercase tracking-widest text-cyan-300 font-bold bg-slate-900/90 border border-cyan-500/50 px-2 py-0.5 rounded-full shadow-lg">
              POD MARS-01
            </div>
          </div>
        )}

        {/* Passenger Deck / Slots */}
        <div className="flex items-end justify-center gap-3 -mt-16 z-10 min-h-[140px] px-3">
          {passengers.length === 0 ? (
            <div
              className={`h-28 w-44 flex flex-col items-center justify-center border-2 border-dashed rounded-xl text-xs px-2 text-center select-none backdrop-blur-xs ${
                isSpace
                  ? 'border-cyan-500/60 bg-slate-950/70 text-cyan-200'
                  : 'border-amber-600/60 bg-amber-950/20 text-amber-200'
              }`}
            >
              <span className="font-semibold text-white">
                {isSpace ? 'Cápsula Vazia' : 'Jangada Vazia'}
              </span>
              <span className="text-[11px] opacity-80 mt-1">
                {isSpace
                  ? 'Selecione os tripulantes na base para embarque (máx. 2)'
                  : 'Clique nas pessoas da margem para embarcar (máx. 2)'}
              </span>
            </div>
          ) : (
            passengers.map((id) => (
              <div key={id} className="relative group">
                <CharacterFigure
                  id={id}
                  phase={phase}
                  subtheme={subtheme}
                  onRaft={true}
                  onClick={() => onCharacterClick(id)}
                  isViolator={violators.includes(id)}
                  isTarget={targets.includes(id)}
                  size="md"
                />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-white bg-slate-900/90 border border-slate-700 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                  Clique p/ desembarcar
                </span>
              </div>
            ))
          )}
        </div>

        {/* Raft Deck: Wooden Logs OR Sci-Fi Mag-Pod Platform */}
        <div className="relative w-56 -mt-2">
          {!isSpace ? (
            <svg viewBox="0 0 220 50" className="w-full h-auto drop-shadow-xl">
              <ellipse cx="110" cy="42" rx="105" ry="7" fill="rgba(15, 23, 42, 0.4)" />
              <rect x="10" y="8" width="200" height="12" rx="6" fill="#854d0e" stroke="#713f12" strokeWidth="1.5" />
              <rect x="5" y="16" width="210" height="13" rx="6.5" fill="#a16207" stroke="#854d0e" strokeWidth="1.5" />
              <rect x="15" y="25" width="190" height="14" rx="7" fill="#713f12" stroke="#58310c" strokeWidth="1.5" />
              <rect x="45" y="6" width="6" height="34" rx="2" fill="#eab308" />
              <rect x="170" y="6" width="6" height="34" rx="2" fill="#eab308" />
              <line x1="25" y1="14" x2="195" y2="14" stroke="#ca8a04" strokeWidth="0.8" opacity="0.6" />
              <line x1="20" y1="22" x2="200" y2="22" stroke="#ca8a04" strokeWidth="0.8" opacity="0.6" />
            </svg>
          ) : (
            <svg viewBox="0 0 220 50" className="w-full h-auto drop-shadow-[0_0_20px_rgba(56,189,248,0.7)]">
              {/* Maglev Shadow */}
              <ellipse cx="110" cy="44" rx="100" ry="6" fill="rgba(6, 182, 212, 0.3)" />
              {/* High-Tech Chassis */}
              <path
                d="M15 20 L40 6 L180 6 L205 20 L195 38 L25 38 Z"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="1.8"
              />
              {/* Floor Grip Plates */}
              <rect x="35" y="10" width="150" height="12" rx="2" fill="#1e293b" />
              <line x1="45" y1="16" x2="175" y2="16" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 3" />
              {/* Ion Thrusters (Active Glow) */}
              <rect x="8" y="22" width="14" height="10" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <rect x="198" y="22" width="14" height="10" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              {isSailing && (
                <>
                  <ellipse cx="4" cy="27" rx="8" ry="4" fill="#38bdf8" />
                  <ellipse cx="216" cy="27" rx="8" ry="4" fill="#38bdf8" />
                </>
              )}
            </svg>
          )}

          {/* Quick action button when vehicle has passengers */}
          {!isSailing && passengers.length > 0 && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <button
                onClick={onSailClick}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ring-2 ring-white/60 animate-pulse ${
                  isSpace
                    ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white'
                    : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
                title={isSpace ? 'Ativar eclusa e decolar cápsula' : 'Clique para tentar atravessar o rio'}
              >
                {isSpace ? <Rocket className="w-3.5 h-3.5" /> : <Anchor className="w-3.5 h-3.5" />}
                <span>{isSpace ? '🚀 Decolar Cápsula' : '⛵ Atravessar'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
