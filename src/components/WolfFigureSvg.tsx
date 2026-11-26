import React from 'react';
import { WolfCharacterId } from '../types/game';

interface WolfFigureSvgProps {
  id: WolfCharacterId;
}

export const WolfFigureSvg: React.FC<WolfFigureSvgProps> = ({ id }) => {
  switch (id) {
    case 'farmer':
      return (
        <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-md">
          {/* Ground Shadow */}
          <ellipse cx="40" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.22)" />
          {/* Wooden Oar held in hand */}
          <line x1="62" y1="28" x2="54" y2="128" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
          <path d="M51 112 L57 112 L59 130 Q54 134 49 130 Z" fill="#b45309" stroke="#78350f" strokeWidth="1" />
          {/* Legs / Boots */}
          <rect x="28" y="88" width="10" height="38" rx="4" fill="#1e40af" />
          <rect x="42" y="88" width="10" height="38" rx="4" fill="#1e3a8a" />
          <ellipse cx="32" cy="128" rx="7" ry="4" fill="#451a03" />
          <ellipse cx="48" cy="128" rx="7" ry="4" fill="#451a03" />
          {/* Plaid Shirt + Denim Overalls */}
          <path d="M24 50 L56 50 L54 90 L26 90 Z" fill="#ea580c" stroke="#9a3412" strokeWidth="1.2" />
          <path d="M27 64 L53 64 L54 90 L26 90 Z" fill="#2563eb" stroke="#1e40af" strokeWidth="1.2" />
          <rect x="29" y="50" width="5" height="16" fill="#2563eb" />
          <rect x="46" y="50" width="5" height="16" fill="#2563eb" />
          <circle cx="31.5" cy="66" r="1.8" fill="#fbbf24" />
          <circle cx="48.5" cy="66" r="1.8" fill="#fbbf24" />
          {/* Arms */}
          <path d="M24 52 Q16 68 22 82" stroke="#ea580c" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M56 52 Q64 66 59 78" stroke="#ea580c" strokeWidth="7" strokeLinecap="round" fill="none" />
          <circle cx="22" cy="82" r="4.5" fill="#fed7aa" />
          <circle cx="59" cy="78" r="4.5" fill="#fed7aa" />
          {/* Head & Beard */}
          <rect x="36" y="40" width="8" height="12" fill="#fed7aa" />
          <ellipse cx="40" cy="32" rx="13" ry="14" fill="#fed7aa" />
          {/* Beard / Mustache */}
          <path d="M28 33 Q40 46 52 33 Q50 44 40 45 Q30 44 28 33 Z" fill="#78350f" />
          {/* Eyes & Smile */}
          <circle cx="35" cy="30" r="2" fill="#1e293b" />
          <circle cx="45" cy="30" r="2" fill="#1e293b" />
          <path d="M37 36 Q40 38 43 36" stroke="#fde68a" strokeWidth="1.5" fill="none" />
          {/* Straw Hat */}
          <ellipse cx="40" cy="21" rx="22" ry="5" fill="#eab308" stroke="#a16207" strokeWidth="1.5" />
          <path d="M27 20 C27 9 33 7 40 7 C47 7 53 9 53 20 Z" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
          <rect x="27" y="16" width="26" height="3.5" fill="#b91c1c" />
        </svg>
      );

    case 'wolf':
      return (
        <svg viewBox="0 0 80 130" className="w-full h-full drop-shadow-md">
          {/* Ground Shadow */}
          <ellipse cx="40" cy="122" rx="22" ry="5" fill="rgba(0,0,0,0.22)" />
          {/* Fluffy Tail */}
          <path
            d="M54 90 Q74 82 70 64 Q62 72 56 80 Z"
            fill="#64748b"
            stroke="#334155"
            strokeWidth="1.5"
          />
          <path d="M68 65 Q70 72 64 78" fill="#cbd5e1" />
          {/* Body */}
          <ellipse cx="42" cy="86" rx="18" ry="20" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
          {/* Chest Fur */}
          <path d="M31 74 Q40 94 49 74 Q45 68 40 70 Q35 68 31 74 Z" fill="#e2e8f0" />
          {/* Legs & Paws */}
          <rect x="28" y="96" width="8" height="24" rx="4" fill="#475569" />
          <rect x="44" y="96" width="8" height="24" rx="4" fill="#334155" />
          <ellipse cx="32" cy="120" rx="5.5" ry="3.5" fill="#1e293b" />
          <ellipse cx="48" cy="120" rx="5.5" ry="3.5" fill="#1e293b" />
          {/* Ears */}
          <polygon points="24,42 22,18 36,34" fill="#475569" stroke="#334155" strokeWidth="1.5" />
          <polygon points="26,38 25,24 33,34" fill="#fca5a5" opacity="0.7" />
          <polygon points="56,42 58,18 44,34" fill="#475569" stroke="#334155" strokeWidth="1.5" />
          <polygon points="54,38 55,24 47,34" fill="#fca5a5" opacity="0.7" />
          {/* Wolf Head */}
          <ellipse cx="40" cy="48" rx="17" ry="15" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
          {/* Cheek Ruff */}
          <polygon points="21,48 27,43 27,54" fill="#cbd5e1" />
          <polygon points="59,48 53,43 53,54" fill="#cbd5e1" />
          {/* Snout */}
          <ellipse cx="40" cy="54" rx="9" ry="7" fill="#e2e8f0" />
          <ellipse cx="40" cy="51" rx="4" ry="2.8" fill="#0f172a" />
          {/* Sharp Eyes */}
          <ellipse cx="33" cy="43" rx="3" ry="2.5" fill="#fbbf24" />
          <circle cx="33.5" cy="43" r="1.4" fill="#0f172a" />
          <ellipse cx="47" cy="43" rx="3" ry="2.5" fill="#fbbf24" />
          <circle cx="46.5" cy="43" r="1.4" fill="#0f172a" />
          {/* Brows & Teeth Hint */}
          <path d="M29 38 L37 41" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M51 38 L43 41" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M35 58 Q40 61 45 58" stroke="#334155" strokeWidth="1.2" fill="none" />
          <polygon points="36,58 37.5,61 39,58" fill="#ffffff" />
          <polygon points="41,58 42.5,61 44,58" fill="#ffffff" />
        </svg>
      );

    case 'lamb':
      return (
        <svg viewBox="0 0 80 130" className="w-full h-full drop-shadow-md">
          {/* Ground Shadow */}
          <ellipse cx="40" cy="122" rx="20" ry="5" fill="rgba(0,0,0,0.2)" />
          {/* Legs & Hooves */}
          <rect x="29" y="96" width="6" height="22" rx="3" fill="#451a03" />
          <rect x="45" y="96" width="6" height="22" rx="3" fill="#451a03" />
          <ellipse cx="32" cy="119" rx="5" ry="3" fill="#1e293b" />
          <ellipse cx="48" cy="119" rx="5" ry="3" fill="#1e293b" />
          {/* Woolly Cloud Body */}
          <circle cx="40" cy="82" r="18" fill="#fefce8" stroke="#e2e8f0" strokeWidth="1.5" />
          <circle cx="27" cy="80" r="10" fill="#fef9c3" />
          <circle cx="53" cy="80" r="10" fill="#fef9c3" />
          <circle cx="33" cy="92" r="9" fill="#fef9c3" />
          <circle cx="47" cy="92" r="9" fill="#fef9c3" />
          <circle cx="40" cy="70" r="12" fill="#ffffff" />
          {/* Bell Collar */}
          <path d="M31 66 Q40 72 49 66" stroke="#ef4444" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <circle cx="40" cy="72" r="4" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
          {/* Droopy Ears */}
          <ellipse cx="22" cy="48" rx="7" ry="4" transform="rotate(-25 22 48)" fill="#78350f" />
          <ellipse cx="58" cy="48" rx="7" ry="4" transform="rotate(25 58 48)" fill="#78350f" />
          {/* Lamb Head */}
          <ellipse cx="40" cy="50" rx="14" ry="13" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
          {/* Fluffy Wool Forehead */}
          <circle cx="34" cy="38" r="7" fill="#ffffff" />
          <circle cx="46" cy="38" r="7" fill="#ffffff" />
          <circle cx="40" cy="36" r="8" fill="#ffffff" />
          {/* Gentle Eyes & Nose */}
          <circle cx="34.5" cy="49" r="2.2" fill="#1e293b" />
          <circle cx="45.5" cy="49" r="2.2" fill="#1e293b" />
          <circle cx="35.2" cy="48.2" r="0.7" fill="#ffffff" />
          <circle cx="46.2" cy="48.2" r="0.7" fill="#ffffff" />
          <ellipse cx="29" cy="53" rx="2.5" ry="1.5" fill="#fda4af" opacity="0.7" />
          <ellipse cx="51" cy="53" rx="2.5" ry="1.5" fill="#fda4af" opacity="0.7" />
          <path d="M38 55 L40 57 L42 55" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'cabbage':
      return (
        <svg viewBox="0 0 80 120" className="w-full h-full drop-shadow-md">
          {/* Ground Shadow */}
          <ellipse cx="40" cy="112" rx="22" ry="5" fill="rgba(0,0,0,0.22)" />
          {/* Woven Basket Base */}
          <path d="M20 82 L60 82 L54 108 L26 108 Z" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
          <line x1="22" y1="90" x2="58" y2="90" stroke="#78350f" strokeWidth="1.5" />
          <line x1="24" y1="99" x2="56" y2="99" stroke="#78350f" strokeWidth="1.5" />
          <rect x="18" y="79" width="44" height="6" rx="3" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
          {/* Outer Lush Lettuce Leaves */}
          <path
            d="M16 66 C8 50 18 30 34 32 C26 48 28 68 34 80 L22 80 Z"
            fill="#15803d"
            stroke="#14532d"
            strokeWidth="1.5"
          />
          <path
            d="M64 66 C72 50 62 30 46 32 C54 48 52 68 46 80 L58 80 Z"
            fill="#15803d"
            stroke="#14532d"
            strokeWidth="1.5"
          />
          {/* Main Round Crisp Head */}
          <circle cx="40" cy="58" r="22" fill="#22c55e" stroke="#166534" strokeWidth="1.5" />
          {/* Inner Layered Leaves & Veins */}
          <path
            d="M24 54 C24 38 38 34 48 40 C56 46 56 64 44 74 C32 76 24 68 24 54 Z"
            fill="#4ade80"
            stroke="#15803d"
            strokeWidth="1.2"
          />
          <path
            d="M32 48 C36 40 48 42 50 52 C52 62 42 68 34 62 C29 58 29 52 32 48 Z"
            fill="#86efac"
            stroke="#16a34a"
            strokeWidth="1.2"
          />
          <path d="M40 74 Q42 58 38 46" stroke="#dcfce7" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M41 64 Q49 58 53 52" stroke="#dcfce7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M39 62 Q32 56 27 52" stroke="#dcfce7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Freshness Sparkle */}
          <circle cx="30" cy="43" r="2" fill="#ffffff" opacity="0.85" />
        </svg>
      );

    default:
      return null;
  }
};
