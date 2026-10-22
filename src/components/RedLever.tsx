import React from 'react';
import { GamePhase } from '../types/game';

interface RedLeverProps {
  side: 'left' | 'right';
  isActiveBank: boolean;
  canSail: boolean;
  onClick: () => void;
  disabled?: boolean;
  phase?: GamePhase;
}

export const RedLever: React.FC<RedLeverProps> = ({
  side,
  isActiveBank,
  canSail,
  onClick,
  disabled = false,
  phase = 'classic',
}) => {
  const isSpace = phase === 'space';
  const isReadyToSail = isActiveBank && canSail && !disabled;

  const sideLabel = side === 'left' ? (isSpace ? 'Módulo Alfa' : 'Margem Esquerda') : (isSpace ? 'Nave de Evacuação' : 'Margem Direita');

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`group relative flex flex-col items-center select-none cursor-pointer transition-transform duration-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
      }`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`${isSpace ? 'Terminal de Eclusa' : 'Ponto Vermelho'} ${sideLabel} - Acionar travessia`}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Tooltip on hover */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-white text-xs py-1 px-2.5 rounded-md shadow-lg whitespace-nowrap z-30">
        {isReadyToSail
          ? isSpace
            ? '🚀 Decolar Cápsula (Clique aqui!)'
            : '⛵ Navegar Jangada (Clique aqui!)'
          : isActiveBank
          ? isSpace
            ? 'Terminal Eclusa (Embarque piloto)'
            : 'Ponto Vermelho (Embarque condutor)'
          : isSpace
          ? 'Terminal Eclusa'
          : 'Ponto Vermelho'}
      </div>

      {/* Sphere / Hologram Head */}
      <div className="relative flex items-center justify-center">
        {isReadyToSail && (
          <div
            className={`absolute w-10 h-10 rounded-full animate-ping pointer-events-none ${
              isSpace ? 'bg-cyan-400/50' : 'bg-red-500/40'
            }`}
          />
        )}
        <div
          className={`w-7 h-7 rounded-full shadow-lg transition-all duration-300 relative flex items-center justify-center ${
            isSpace
              ? isReadyToSail
                ? 'bg-gradient-to-tr from-cyan-600 via-sky-400 to-white ring-4 ring-cyan-400/70 shadow-[0_0_20px_rgba(56,189,248,1)] animate-pulse'
                : isActiveBank
                ? 'bg-gradient-to-tr from-cyan-800 to-cyan-500 ring-2 ring-cyan-900/60'
                : 'bg-cyan-950/80 border border-cyan-800'
              : isReadyToSail
              ? 'bg-gradient-to-tr from-red-600 via-red-500 to-rose-300 ring-4 ring-red-400/60 shadow-[0_0_15px_rgba(239,68,68,0.9)] animate-pulse'
              : isActiveBank
              ? 'bg-gradient-to-tr from-red-700 to-red-500 ring-2 ring-red-900/40'
              : 'bg-red-800/80'
          }`}
        >
          {/* Sphere highlight */}
          <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white/80" />
        </div>
      </div>

      {/* Vertical Post */}
      <div
        className={`w-2 h-16 shadow-sm ${
          isSpace
            ? 'bg-gradient-to-b from-slate-700 via-cyan-900 to-slate-900 border-x border-cyan-500/30'
            : 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800'
        }`}
      />

      {/* Ground Base Plate */}
      <div
        className={`w-9 h-3 rounded-full shadow-md -mt-1 border ${
          isSpace ? 'bg-slate-900 border-cyan-500/60' : 'bg-slate-800 border-slate-600'
        }`}
      />

      {/* Indicator Text */}
      <span
        className={`text-[10px] font-bold mt-1 px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap ${
          isReadyToSail
            ? isSpace
              ? 'bg-cyan-500 text-slate-950 font-black'
              : 'bg-red-600 text-white'
            : isSpace
            ? 'bg-slate-900/90 text-cyan-300 border border-cyan-900/60'
            : 'bg-slate-800/80 text-slate-200'
        }`}
      >
        {isSpace ? 'Terminal Eclusa' : 'Ponto Vermelho'}
      </span>
    </div>
  );
};
