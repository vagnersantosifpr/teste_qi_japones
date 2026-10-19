import React from 'react';
import { CharacterId, Bank } from '../types/game';
import { CharacterFigure } from './CharacterFigure';

interface RaftProps {
  bank: Bank;
  passengers: CharacterId[];
  isSailing: boolean;
  onCharacterClick: (id: CharacterId) => void;
  onSailClick: () => void;
  canSail: boolean;
  violators?: CharacterId[];
  targets?: CharacterId[];
}

export const Raft: React.FC<RaftProps> = ({
  passengers,
  isSailing,
  onCharacterClick,
  onSailClick,
  canSail,
  violators = [],
  targets = [],
}) => {
  return (
    <div
      className={`relative flex flex-col items-center z-20 ${
        isSailing ? 'pointer-events-none' : ''
      }`}
    >
      {/* Sail & Mast */}
      <div className="relative flex flex-col items-center">
        {/* White Triangular Sail */}
        <div className="relative w-28 h-32 flex items-end">
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
            {/* Mast */}
            <rect x="78" y="5" width="5" height="115" rx="2" fill="#78350f" />
            {/* Boom */}
            <rect x="5" y="112" width="76" height="4" rx="1.5" fill="#5c2608" />
            {/* Sail cloth */}
            <path
              d="M78 10 L8 110 L78 110 Z"
              fill="#ffffff"
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />
            {/* Sail shading/wind curves */}
            <path
              d="M78 25 Q45 75 78 100"
              stroke="#cbd5e1"
              strokeWidth="1"
              fill="none"
              strokeDasharray="3 3"
            />
            {/* Mast flag */}
            <polygon points="83,5 98,10 83,16" fill="#ef4444" />
          </svg>
        </div>

        {/* Passenger Deck / Slots */}
        <div className="flex items-end justify-center gap-3 -mt-16 z-10 min-h-[140px] px-3">
          {passengers.length === 0 ? (
            <div className="h-28 w-44 flex flex-col items-center justify-center border-2 border-dashed border-amber-600/60 rounded-xl bg-amber-950/20 text-amber-200 text-xs px-2 text-center select-none backdrop-blur-xs">
              <span className="font-semibold text-white">Jangada Vazia</span>
              <span className="text-[11px] text-amber-100/80 mt-1">
                Clique nas pessoas da margem para embarcar (máx. 2)
              </span>
            </div>
          ) : (
            passengers.map((id) => (
              <div key={id} className="relative group">
                <CharacterFigure
                  id={id}
                  onRaft={true}
                  onClick={() => onCharacterClick(id)}
                  isViolator={violators.includes(id)}
                  isTarget={targets.includes(id)}
                  size="md"
                />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-white bg-slate-900/80 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Clique p/ desembarcar
                </span>
              </div>
            ))
          )}
        </div>

        {/* Wooden Raft Logs Deck */}
        <div className="relative w-56 -mt-2">
          <svg viewBox="0 0 220 50" className="w-full h-auto drop-shadow-xl">
            {/* Water Shadow */}
            <ellipse cx="110" cy="42" rx="105" ry="7" fill="rgba(15, 23, 42, 0.4)" />
            {/* Front Logs */}
            <rect x="10" y="8" width="200" height="12" rx="6" fill="#854d0e" stroke="#713f12" strokeWidth="1.5" />
            <rect x="5" y="16" width="210" height="13" rx="6.5" fill="#a16207" stroke="#854d0e" strokeWidth="1.5" />
            <rect x="15" y="25" width="190" height="14" rx="7" fill="#713f12" stroke="#58310c" strokeWidth="1.5" />
            {/* Ropes binding logs */}
            <rect x="45" y="6" width="6" height="34" rx="2" fill="#eab308" />
            <rect x="170" y="6" width="6" height="34" rx="2" fill="#eab308" />
            {/* Wood grains */}
            <line x1="25" y1="14" x2="195" y2="14" stroke="#ca8a04" strokeWidth="0.8" opacity="0.6" />
            <line x1="20" y1="22" x2="200" y2="22" stroke="#ca8a04" strokeWidth="0.8" opacity="0.6" />
          </svg>

          {/* Quick action button when raft has passengers */}
          {!isSailing && passengers.length > 0 && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <button
                onClick={onSailClick}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg transition-all whitespace-nowrap flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white cursor-pointer hover:scale-105 active:scale-95 ring-2 ring-white/60 animate-pulse"
                title="Clique para tentar atravessar o rio"
              >
                <span>⛵ Atravessar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
