import React from 'react';
import { CharacterId, GamePhase, ClassicSubtheme } from '../types/game';
import { getCharacterDef } from '../utils/characters';
import { SpaceFigureSvg } from './SpaceFigureSvg';

interface CharacterFigureProps {
  id: CharacterId;
  phase?: GamePhase;
  subtheme?: ClassicSubtheme;
  onClick?: () => void;
  onRaft?: boolean;
  disabled?: boolean;
  isViolator?: boolean;
  isTarget?: boolean;
  isHinted?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const CharacterFigure: React.FC<CharacterFigureProps> = ({
  id,
  phase = 'classic',
  subtheme = 'teams',
  onClick,
  onRaft = false,
  disabled = false,
  isViolator = false,
  isTarget = false,
  isHinted = false,
  size = 'md',
}) => {
  const def = getCharacterDef(id, phase, subtheme);

  const scale = size === 'sm' ? 'scale-75' : size === 'lg' ? 'scale-110' : 'scale-100';

  const renderSvgFigure = () => {
    switch (id) {
      case 'father':
        return (
          <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-md">
            {/* Shadow */}
            <ellipse cx="40" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.18)" />
            {/* Legs */}
            <rect x="28" y="86" width="10" height="42" rx="4" fill="#334155" />
            <rect x="42" y="86" width="10" height="42" rx="4" fill="#1e293b" />
            {/* Shoes */}
            <ellipse cx="32" cy="128" rx="7" ry="4" fill="#0f172a" />
            <ellipse cx="48" cy="128" rx="7" ry="4" fill="#0f172a" />
            {/* Torso / Jacket */}
            <path
              d="M24 48 L56 48 L54 88 L26 88 Z"
              fill="#78350f"
              stroke="#451a03"
              strokeWidth="1.5"
            />
            {/* Shirt collar / tie */}
            <path d="M35 48 L40 60 L45 48 Z" fill="#f8fafc" />
            <path d="M38 52 L42 52 L41 72 L39 72 Z" fill="#991b1b" />
            {/* Arms */}
            <path
              d="M24 50 Q16 66 22 80"
              stroke="#78350f"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M56 50 Q64 66 58 80"
              stroke="#78350f"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            {/* Hands */}
            <circle cx="22" cy="80" r="4.5" fill="#fed7aa" />
            <circle cx="58" cy="80" r="4.5" fill="#fed7aa" />
            {/* Head / Neck */}
            <rect x="36" y="38" width="8" height="12" fill="#fed7aa" />
            <ellipse cx="40" cy="30" rx="14" ry="16" fill="#fed7aa" />
            {/* Face */}
            <circle cx="35" cy="28" r="2" fill="#1e293b" />
            <circle cx="45" cy="28" r="2" fill="#1e293b" />
            <path d="M32 23 Q36 21 39 23" stroke="#451a03" strokeWidth="1.5" fill="none" />
            <path d="M41 23 Q44 21 48 23" stroke="#451a03" strokeWidth="1.5" fill="none" />
            <path d="M37 35 Q40 38 43 35" stroke="#9a3412" strokeWidth="1.5" fill="none" />
            {/* Hair */}
            <path
              d="M26 26 C26 14 32 10 40 10 C48 10 54 14 54 26 C54 24 50 18 40 18 C30 18 26 24 26 26 Z"
              fill="#451a03"
            />
            <path d="M26 22 Q24 28 26 34" stroke="#451a03" strokeWidth="3" fill="none" />
            <path d="M54 22 Q56 28 54 34" stroke="#451a03" strokeWidth="3" fill="none" />
          </svg>
        );

      case 'mother':
        return (
          <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-md">
            <ellipse cx="40" cy="134" rx="22" ry="5" fill="rgba(0,0,0,0.18)" />
            {/* Skirt */}
            <path
              d="M28 78 L52 78 L58 122 L22 122 Z"
              fill="#0284c7"
              stroke="#0369a1"
              strokeWidth="1.5"
            />
            {/* Shoes */}
            <ellipse cx="32" cy="126" rx="5" ry="3" fill="#be185d" />
            <ellipse cx="48" cy="126" rx="5" ry="3" fill="#be185d" />
            {/* Sweater */}
            <path
              d="M26 48 L54 48 L52 80 L28 80 Z"
              fill="#9a3412"
              stroke="#7c2d12"
              strokeWidth="1.5"
            />
            <path d="M34 48 Q40 56 46 48" stroke="#fbcfe8" strokeWidth="2" fill="none" />
            {/* Arms */}
            <path
              d="M26 50 Q18 64 24 76"
              stroke="#9a3412"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M54 50 Q62 64 56 76"
              stroke="#9a3412"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="24" cy="76" r="4" fill="#fde68a" />
            <circle cx="56" cy="76" r="4" fill="#fde68a" />
            {/* Neck / Head */}
            <rect x="37" y="38" width="6" height="12" fill="#fde68a" />
            <ellipse cx="40" cy="28" rx="13" ry="14" fill="#fde68a" />
            {/* Purple Hair Bun / Updo */}
            <ellipse cx="40" cy="12" rx="10" ry="8" fill="#7e22ce" />
            <path
              d="M25 24 C25 12 32 10 40 10 C48 10 55 12 55 24 C55 28 52 38 52 38 C49 32 47 22 40 22 C33 22 31 32 28 38 C28 38 25 28 25 24 Z"
              fill="#6b21a8"
            />
            {/* Face */}
            <circle cx="36" cy="27" r="2" fill="#1e293b" />
            <circle cx="44" cy="27" r="2" fill="#1e293b" />
            <path d="M34 23 Q37 21 40 23" stroke="#581c87" strokeWidth="1" fill="none" />
            <path d="M40 23 Q43 21 46 23" stroke="#581c87" strokeWidth="1" fill="none" />
            <path d="M37 33 Q40 36 43 33" stroke="#e11d48" strokeWidth="1.5" fill="none" />
          </svg>
        );

      case 'boy1':
      case 'boy2':
        return (
          <svg viewBox="0 0 80 130" className="w-full h-full drop-shadow-md">
            <ellipse cx="40" cy="122" rx="18" ry="4" fill="rgba(0,0,0,0.18)" />
            {/* Legs */}
            <rect x="30" y="86" width="7" height="30" fill="#fed7aa" />
            <rect x="43" y="86" width="7" height="30" fill="#fed7aa" />
            {/* Socks & Shoes */}
            <rect x="30" y="110" width="7" height="6" fill="#f8fafc" />
            <rect x="43" y="110" width="7" height="6" fill="#f8fafc" />
            <ellipse cx="33" cy="118" rx="6" ry="4" fill="#15803d" />
            <ellipse cx="47" cy="118" rx="6" ry="4" fill="#15803d" />
            {/* Shorts */}
            <path d="M28 72 L52 72 L50 90 L41 90 L40 78 L39 90 L30 90 Z" fill="#166534" />
            {/* Green T-Shirt */}
            <path
              d="M26 48 L54 48 L52 74 L28 74 Z"
              fill={id === 'boy1' ? '#22c55e' : '#16a34a'}
              stroke="#15803d"
              strokeWidth="1.5"
            />
            {/* Arms */}
            <path
              d="M26 50 Q18 60 22 70"
              stroke={id === 'boy1' ? '#22c55e' : '#16a34a'}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M54 50 Q62 60 58 70"
              stroke={id === 'boy1' ? '#22c55e' : '#16a34a'}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="22" cy="70" r="3.5" fill="#fed7aa" />
            <circle cx="58" cy="70" r="3.5" fill="#fed7aa" />
            {/* Head */}
            <rect x="37" y="40" width="6" height="10" fill="#fed7aa" />
            <circle cx="40" cy="30" r="13" fill="#fed7aa" />
            {/* Hair */}
            <path
              d="M27 28 C27 16 32 12 40 12 C48 12 53 16 53 28 C53 24 49 18 40 18 C31 18 27 24 27 28 Z"
              fill="#78350f"
            />
            <polygon points="34,18 36,22 38,18" fill="#78350f" />
            <polygon points="42,18 44,22 46,18" fill="#78350f" />
            {/* Eyes & Smile */}
            <circle cx="35" cy="29" r="1.8" fill="#0f172a" />
            <circle cx="45" cy="29" r="1.8" fill="#0f172a" />
            <path d="M37 35 Q40 38 43 35" stroke="#b45309" strokeWidth="1.5" fill="none" />
          </svg>
        );

      case 'girl1':
      case 'girl2':
        return (
          <svg viewBox="0 0 80 130" className="w-full h-full drop-shadow-md">
            <ellipse cx="40" cy="122" rx="18" ry="4" fill="rgba(0,0,0,0.18)" />
            {/* Legs & Shoes */}
            <rect x="32" y="90" width="6" height="26" fill="#fed7aa" />
            <rect x="42" y="90" width="6" height="26" fill="#fed7aa" />
            <ellipse cx="35" cy="116" rx="5" ry="3.5" fill="#0284c7" />
            <ellipse cx="45" cy="116" rx="5" ry="3.5" fill="#0284c7" />
            {/* Blue Dress */}
            <path
              d="M30 52 L50 52 L56 94 L24 94 Z"
              fill={id === 'girl1' ? '#0369a1' : '#0284c7'}
              stroke="#075985"
              strokeWidth="1.5"
            />
            {/* White collar / pinafore */}
            <polygon points="35,52 40,62 45,52" fill="#ffffff" />
            {/* Arms */}
            <path
              d="M28 54 Q20 64 26 74"
              stroke={id === 'girl1' ? '#0369a1' : '#0284c7'}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M52 54 Q60 64 54 74"
              stroke={id === 'girl1' ? '#0369a1' : '#0284c7'}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="26" cy="74" r="3.5" fill="#fed7aa" />
            <circle cx="54" cy="74" r="3.5" fill="#fed7aa" />
            {/* Head */}
            <rect x="37" y="42" width="6" height="10" fill="#fed7aa" />
            <circle cx="40" cy="30" r="12" fill="#fed7aa" />
            {/* Hair: Girl 1 long dark hair, Girl 2 hair with purple ribbon */}
            {id === 'girl1' ? (
              <>
                <path
                  d="M26 28 C26 14 32 12 40 12 C48 12 54 14 54 28 C55 42 56 50 56 50 C52 40 50 26 40 26 C30 26 28 40 24 50 C24 50 25 42 26 28 Z"
                  fill="#451a03"
                />
              </>
            ) : (
              <>
                {/* Purple ribbon */}
                <ellipse cx="40" cy="13" rx="7" ry="4" fill="#a855f7" />
                <path
                  d="M26 28 C26 14 32 12 40 12 C48 12 54 14 54 28 C55 38 52 44 52 44 C50 34 48 24 40 24 C32 24 30 34 28 44 C28 44 25 38 26 28 Z"
                  fill="#7e22ce"
                />
              </>
            )}
            {/* Face */}
            <circle cx="36" cy="29" r="1.8" fill="#0f172a" />
            <circle cx="44" cy="29" r="1.8" fill="#0f172a" />
            <path d="M37 35 Q40 38 43 35" stroke="#f43f5e" strokeWidth="1.5" fill="none" />
          </svg>
        );

      case 'police':
        return (
          <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-md">
            <ellipse cx="40" cy="134" rx="22" ry="5" fill="rgba(0,0,0,0.18)" />
            {/* Legs */}
            <rect x="28" y="86" width="10" height="42" fill="#1e3a8a" />
            <rect x="42" y="86" width="10" height="42" fill="#172554" />
            {/* Boots */}
            <ellipse cx="32" cy="128" rx="6" ry="4" fill="#0f172a" />
            <ellipse cx="48" cy="128" rx="6" ry="4" fill="#0f172a" />
            {/* Police Uniform Shirt */}
            <path
              d="M24 46 L56 46 L54 86 L26 86 Z"
              fill="#3b82f6"
              stroke="#1d4ed8"
              strokeWidth="1.5"
            />
            {/* Police Belt */}
            <rect x="25" y="82" width="30" height="5" fill="#0f172a" />
            <rect x="37" y="81" width="6" height="7" fill="#fbbf24" />
            {/* Tie & Badge */}
            <polygon points="35,46 45,46 40,56" fill="#1e3a8a" />
            <circle cx="33" cy="56" r="3" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
            {/* Arms with white gloves */}
            <path
              d="M24 48 Q16 64 22 78"
              stroke="#3b82f6"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M56 48 Q64 64 58 78"
              stroke="#3b82f6"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="22" cy="78" r="4.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="58" cy="78" r="4.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            {/* Head */}
            <rect x="36" y="36" width="8" height="12" fill="#fed7aa" />
            <ellipse cx="40" cy="28" rx="13" ry="14" fill="#fed7aa" />
            {/* Police Cap with Gold Emblem */}
            <path
              d="M22 22 C22 10 32 8 40 8 C48 8 58 10 58 22 Z"
              fill="#1e3a8a"
              stroke="#172554"
              strokeWidth="1.5"
            />
            <path d="M20 22 Q40 24 60 22" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            <circle cx="40" cy="15" r="3" fill="#fbbf24" />
            {/* Face */}
            <circle cx="35" cy="27" r="2" fill="#1e293b" />
            <circle cx="45" cy="27" r="2" fill="#1e293b" />
            <path d="M32 23 L38 23" stroke="#1e293b" strokeWidth="1.5" />
            <path d="M42 23 L48 23" stroke="#1e293b" strokeWidth="1.5" />
            <path d="M37 34 Q40 36 43 34" stroke="#9a3412" strokeWidth="1.5" fill="none" />
          </svg>
        );

      case 'prisoner':
        return (
          <svg viewBox="0 0 80 135" className="w-full h-full drop-shadow-md">
            <ellipse cx="40" cy="128" rx="20" ry="5" fill="rgba(0,0,0,0.18)" />
            {/* Striped Convict Dress / Pants */}
            <rect x="28" y="80" width="10" height="44" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
            <rect x="42" y="80" width="10" height="44" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
            {/* Stripes on legs */}
            <rect x="28" y="88" width="10" height="5" fill="#0f172a" />
            <rect x="28" y="100" width="10" height="5" fill="#0f172a" />
            <rect x="28" y="112" width="10" height="5" fill="#0f172a" />
            <rect x="42" y="88" width="10" height="5" fill="#0f172a" />
            <rect x="42" y="100" width="10" height="5" fill="#0f172a" />
            <rect x="42" y="112" width="10" height="5" fill="#0f172a" />
            {/* Shoes */}
            <ellipse cx="32" cy="124" rx="6" ry="3.5" fill="#334155" />
            <ellipse cx="48" cy="124" rx="6" ry="3.5" fill="#334155" />
            {/* Striped Torso */}
            <path d="M26 44 L54 44 L52 80 L28 80 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="26.5" y="48" width="27" height="6" fill="#0f172a" />
            <rect x="27" y="58" width="26" height="6" fill="#0f172a" />
            <rect x="27.5" y="68" width="25" height="6" fill="#0f172a" />
            {/* Arms - bound in front */}
            <path
              d="M26 48 Q20 62 34 70"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M54 48 Q60 62 46 70"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Handcuffs */}
            <rect x="34" y="68" width="12" height="4" rx="2" fill="#94a3b8" />
            {/* Head */}
            <rect x="37" y="34" width="6" height="12" fill="#fed7aa" />
            <ellipse cx="40" cy="26" rx="12" ry="13" fill="#fed7aa" />
            {/* Wild Red Hair with Spiky Ponytail */}
            <path
              d="M40 8 C46 3 52 4 52 8 C52 14 46 16 40 16 Z"
              fill="#dc2626"
            />
            <circle cx="44" cy="7" r="5" fill="#ef4444" />
            <path
              d="M24 24 C24 10 32 8 40 8 C48 8 56 10 56 24 C56 28 54 36 54 36 C50 30 46 20 40 20 C34 20 30 30 26 36 C26 36 24 28 24 24 Z"
              fill="#dc2626"
            />
            {/* Face - mischievous smirk and slanted eyebrows */}
            <circle cx="36" cy="25" r="2" fill="#1e293b" />
            <circle cx="44" cy="25" r="2" fill="#1e293b" />
            <path d="M33 21 L38 23" stroke="#991b1b" strokeWidth="1.5" />
            <path d="M47 21 L42 23" stroke="#991b1b" strokeWidth="1.5" />
            <path d="M37 32 Q42 34 45 31" stroke="#991b1b" strokeWidth="1.5" fill="none" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`group relative flex flex-col items-center select-none transition-all duration-200 ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'
      } ${scale} ${isViolator ? 'animate-bounce' : ''}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`${def.name}: ${def.description}`}
      onKeyDown={(e) => {
        if (!disabled && onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Target or Violator Comic Alert */}
      {isViolator && (
        <div className="absolute -top-7 z-20 px-2 py-0.5 bg-red-600 text-white text-[11px] font-bold rounded-md shadow-lg animate-pulse whitespace-nowrap">
          ⚠️ Culpado!
        </div>
      )}
      {isTarget && !isViolator && (
        <div className="absolute -top-7 z-20 px-2 py-0.5 bg-amber-500 text-slate-900 text-[11px] font-bold rounded-md shadow-lg whitespace-nowrap">
          💥 Vítima
        </div>
      )}
      {isHinted && (
        <div className="absolute -top-7 z-20 px-2 py-0.5 bg-emerald-600 text-white text-[11px] font-bold rounded-md shadow-lg animate-bounce whitespace-nowrap">
          👉 Dica: Embarcar
        </div>
      )}

      {/* SVG Character Silhouette */}
      <div
        className={`relative w-20 h-32 transition-transform ${
          isViolator ? 'scale-110 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]' : ''
        } ${isTarget ? 'drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]' : ''} ${
          isHinted ? 'drop-shadow-[0_0_12px_rgba(16,185,129,0.9)] ring-2 ring-emerald-400 rounded-2xl' : ''
        }`}
      >
        {phase === 'space' ? <SpaceFigureSvg id={id} /> : renderSvgFigure()}

        {/* Hover Clickable Ring */}
        {!disabled && (
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/70 transition-all pointer-events-none" />
        )}
      </div>

      {/* Character Name & Role Chip */}
      <div className="mt-1 flex flex-col items-center">
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded shadow-sm text-white whitespace-nowrap ${
            def.category === 'parent'
              ? phase === 'space'
                ? id === 'father'
                  ? 'bg-blue-700 border border-blue-400/50'
                  : 'bg-orange-600 border border-orange-400/50'
                : 'bg-amber-800'
              : def.category === 'police'
              ? phase === 'space'
                ? 'bg-emerald-700 border border-emerald-400/50'
                : 'bg-blue-800'
              : def.category === 'prisoner'
              ? phase === 'space'
                ? 'bg-purple-800 border border-purple-400/50 animate-pulse'
                : 'bg-red-700'
              : phase === 'space'
              ? 'bg-cyan-800 border border-cyan-400/50'
              : 'bg-emerald-700'
          }`}
        >
          {def.name}
        </span>
        <span className="text-[10px] text-slate-300 font-medium whitespace-nowrap mt-0.5 bg-slate-900/90 border border-slate-700 px-1.5 py-0.5 rounded">
          {def.isPilot
            ? phase === 'space'
              ? '🚀 Piloto Habilitado'
              : subtheme === 'teams'
              ? '⛵ Condutor (Brevê)'
              : '⛵ Condutor'
            : phase === 'space'
            ? 'Cientista / Tripulante'
            : subtheme === 'teams'
            ? id === 'prisoner'
              ? '⚠️ Sob Custódia'
              : '🎒 Pesquisador(a)'
            : 'Passageiro'}
        </span>
      </div>
    </div>
  );
};
