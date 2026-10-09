import React from 'react';

interface RedLeverProps {
  side: 'left' | 'right';
  isActiveBank: boolean;
  canSail: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const RedLever: React.FC<RedLeverProps> = ({
  side,
  isActiveBank,
  canSail,
  onClick,
  disabled = false,
}) => {
  const isReadyToSail = isActiveBank && canSail && !disabled;

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`group relative flex flex-col items-center select-none cursor-pointer transition-transform duration-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
      }`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`Ponto Vermelho ${side === 'left' ? 'Margem Esquerda' : 'Margem Direita'} - Alavanca da jangada`}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Tooltip on hover */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs py-1 px-2.5 rounded-md shadow-lg whitespace-nowrap z-30">
        {isReadyToSail
          ? 'Navegar Jangada (Clique aqui!)'
          : isActiveBank
          ? 'Ponto Vermelho (Embarque condutor)'
          : 'Ponto Vermelho'}
      </div>

      {/* Red Sphere Head */}
      <div className="relative flex items-center justify-center">
        {isReadyToSail && (
          <div className="absolute w-10 h-10 rounded-full bg-red-500/40 animate-ping pointer-events-none" />
        )}
        <div
          className={`w-7 h-7 rounded-full shadow-lg transition-all duration-300 relative flex items-center justify-center ${
            isReadyToSail
              ? 'bg-gradient-to-tr from-red-600 via-red-500 to-rose-300 ring-4 ring-red-400/60 shadow-[0_0_15px_rgba(239,68,68,0.9)] animate-pulse'
              : isActiveBank
              ? 'bg-gradient-to-tr from-red-700 to-red-500 ring-2 ring-red-900/40'
              : 'bg-red-800/80'
          }`}
        >
          {/* Sphere highlight */}
          <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white/70" />
        </div>
      </div>

      {/* Vertical Post */}
      <div className="w-1.5 h-16 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 shadow-sm" />

      {/* Ground Base Plate */}
      <div className="w-8 h-2.5 bg-slate-800 rounded-full shadow-md -mt-1 border border-slate-600" />

      {/* Indicator Text */}
      <span
        className={`text-[10px] font-bold mt-1 px-1.5 py-0.5 rounded shadow-xs ${
          isReadyToSail
            ? 'bg-red-600 text-white'
            : 'bg-slate-800/80 text-slate-200'
        }`}
      >
        Ponto Vermelho
      </span>
    </div>
  );
};
