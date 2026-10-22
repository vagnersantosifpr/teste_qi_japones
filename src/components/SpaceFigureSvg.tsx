import React from 'react';
import { CharacterId } from '../types/game';

interface SpaceFigureSvgProps {
  id: CharacterId;
}

export const SpaceFigureSvg: React.FC<SpaceFigureSvgProps> = ({ id }) => {
  switch (id) {
    case 'father':
      // Comandante Silva (Navy Blue spacesuit, gold command bars, curved cyan visor)
      return (
        <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-md">
          <ellipse cx="40" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.25)" />
          {/* Magneto Boots */}
          <rect x="25" y="120" width="13" height="12" rx="3" fill="#0f172a" />
          <rect x="42" y="120" width="13" height="12" rx="3" fill="#0f172a" />
          <rect x="27" y="128" width="9" height="3" fill="#38bdf8" />
          <rect x="44" y="128" width="9" height="3" fill="#38bdf8" />
          {/* Suit Legs */}
          <rect x="27" y="84" width="11" height="38" rx="4" fill="#1e3a8a" />
          <rect x="42" y="84" width="11" height="38" rx="4" fill="#1e3a8a" />
          <line x1="27" y1="102" x2="38" y2="102" stroke="#3b82f6" strokeWidth="2" />
          <line x1="42" y1="102" x2="53" y2="102" stroke="#3b82f6" strokeWidth="2" />
          {/* Torso */}
          <path d="M22 48 L58 48 L56 86 L24 86 Z" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
          {/* Chest Life-Support Armor Plate */}
          <rect x="29" y="52" width="22" height="26" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
          <circle cx="35" cy="60" r="2.5" fill="#22c55e" />
          <circle cx="45" cy="60" r="2.5" fill="#38bdf8" />
          <rect x="33" y="68" width="14" height="4" rx="1" fill="#1e293b" />
          <line x1="34" y1="70" x2="42" y2="70" stroke="#f59e0b" strokeWidth="2" />
          {/* Gold Command Epaulets */}
          <rect x="20" y="48" width="8" height="5" rx="1" fill="#f59e0b" />
          <rect x="52" y="48" width="8" height="5" rx="1" fill="#f59e0b" />
          {/* Arms */}
          <path d="M23 50 Q14 66 20 80" stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M57 50 Q66 66 60 80" stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Gloves */}
          <circle cx="20" cy="80" r="5" fill="#334155" />
          <circle cx="60" cy="80" r="5" fill="#334155" />
          {/* Helmet Neck Ring */}
          <ellipse cx="40" cy="46" rx="15" ry="5" fill="#64748b" />
          {/* Astronaut Helmet */}
          <circle cx="40" cy="28" r="19" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Mirror Visor with Mars Reflection */}
          <ellipse cx="40" cy="28" rx="14" ry="12" fill="#0284c7" />
          <path d="M30 20 Q40 18 50 20 Q40 25 30 20 Z" fill="#38bdf8" opacity="0.8" />
          <ellipse cx="45" cy="31" rx="4" ry="4" fill="#ea580c" opacity="0.7" />
        </svg>
      );

    case 'mother':
      // Engenheira Elena (Titanium Slate & Hazard Orange)
      return (
        <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-md">
          <ellipse cx="40" cy="134" rx="22" ry="5" fill="rgba(0,0,0,0.25)" />
          {/* Heavy Boots */}
          <rect x="26" y="120" width="12" height="12" rx="3" fill="#1e293b" />
          <rect x="42" y="120" width="12" height="12" rx="3" fill="#1e293b" />
          <line x1="26" y1="126" x2="38" y2="126" stroke="#f97316" strokeWidth="2" />
          <line x1="42" y1="126" x2="54" y2="126" stroke="#f97316" strokeWidth="2" />
          {/* Suit Legs */}
          <rect x="27" y="84" width="11" height="38" rx="4" fill="#334155" />
          <rect x="42" y="84" width="11" height="38" rx="4" fill="#334155" />
          {/* Torso */}
          <path d="M23 48 L57 48 L55 86 L25 86 Z" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
          {/* Hazard Orange Diagonal Sash / Reactor harness */}
          <path d="M24 49 L34 49 L54 85 L44 85 Z" fill="#ea580c" />
          {/* Utility Belt & Plasma Torch */}
          <rect x="24" y="82" width="32" height="5" rx="1" fill="#0f172a" />
          <rect x="22" y="78" width="5" height="11" rx="1" fill="#f97316" />
          {/* Chest Gauge */}
          <circle cx="34" cy="62" r="5" fill="#0f172a" stroke="#f97316" strokeWidth="1" />
          <line x1="34" y1="62" x2="36" y2="59" stroke="#f97316" strokeWidth="1.5" />
          {/* Arms */}
          <path d="M23 50 Q15 65 21 78" stroke="#334155" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M57 50 Q65 65 59 78" stroke="#334155" strokeWidth="7" strokeLinecap="round" fill="none" />
          <circle cx="21" cy="78" r="4.5" fill="#ea580c" />
          <circle cx="59" cy="78" r="4.5" fill="#ea580c" />
          {/* Helmet Neck Ring */}
          <ellipse cx="40" cy="46" rx="14" ry="4.5" fill="#64748b" />
          {/* Helmet & Comm Antenna */}
          <circle cx="40" cy="28" r="18" fill="#1e293b" stroke="#f97316" strokeWidth="1.5" />
          <line x1="56" y1="26" x2="62" y2="12" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
          <circle cx="62" cy="11" r="2.5" fill="#ef4444" />
          {/* Amber Visor */}
          <ellipse cx="40" cy="28" rx="13" ry="11" fill="#d97706" />
          <path d="M31 20 Q40 18 49 20 Q40 24 31 20 Z" fill="#fbbf24" opacity="0.8" />
        </svg>
      );

    case 'boy1':
      // Astrofísico Neil (White & Cyan clean research suit, data visor)
      return (
        <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-md">
          <ellipse cx="40" cy="134" rx="20" ry="4" fill="rgba(0,0,0,0.2)" />
          {/* Magnetic Shoes */}
          <rect x="28" y="118" width="10" height="12" rx="3" fill="#0f172a" />
          <rect x="42" y="118" width="10" height="12" rx="3" fill="#0f172a" />
          {/* Legs */}
          <rect x="29" y="86" width="9" height="34" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="42" y="86" width="9" height="34" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          {/* Torso */}
          <path d="M26 52 L54 52 L52 87 L28 87 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Cyan Chest Badge */}
          <rect x="33" y="58" width="14" height="18" rx="2" fill="#0284c7" />
          <circle cx="40" cy="65" r="3.5" fill="#38bdf8" />
          {/* Arms with Datapad */}
          <path d="M26 54 Q18 68 25 80" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M54 54 Q62 68 52 79" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Holographic Datapad */}
          <rect x="48" y="74" width="12" height="15" rx="1.5" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
          <line x1="50" y1="78" x2="58" y2="78" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="50" y1="82" x2="56" y2="82" stroke="#22d3ee" strokeWidth="1.5" />
          {/* Head & AR Glasses */}
          <ellipse cx="40" cy="34" rx="13" ry="14" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          <rect x="30" y="30" width="20" height="7" rx="2" fill="#06b6d4" opacity="0.9" />
          <line x1="30" y1="33" x2="50" y2="33" stroke="#e0f2fe" strokeWidth="1" />
        </svg>
      );

    case 'boy2':
      // Astrofísico Carl (White & Deep Blue research suit with antenna)
      return (
        <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-md">
          <ellipse cx="40" cy="134" rx="20" ry="4" fill="rgba(0,0,0,0.2)" />
          {/* Magnetic Shoes */}
          <rect x="28" y="118" width="10" height="12" rx="3" fill="#0f172a" />
          <rect x="42" y="118" width="10" height="12" rx="3" fill="#0f172a" />
          {/* Legs */}
          <rect x="29" y="86" width="9" height="34" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="42" y="86" width="9" height="34" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          {/* Torso */}
          <path d="M26 52 L54 52 L52 87 L28 87 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Blue Stripes */}
          <rect x="28" y="66" width="24" height="4" fill="#0369a1" />
          {/* Arms with Scanner */}
          <path d="M26 54 Q18 68 25 80" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M54 54 Q63 68 54 80" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Scanner Device */}
          <circle cx="56" cy="81" r="4.5" fill="#0284c7" />
          <line x1="56" y1="77" x2="56" y2="71" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Head & Visor */}
          <ellipse cx="40" cy="34" rx="13" ry="14" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          <rect x="31" y="29" width="18" height="6" rx="2" fill="#2563eb" opacity="0.9" />
        </svg>
      );

    case 'girl1':
      // Cadete Leo (Yellow cadet jumpsuit, active trainee)
      return (
        <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-md">
          <ellipse cx="40" cy="134" rx="19" ry="4" fill="rgba(0,0,0,0.2)" />
          {/* Trainee Boots */}
          <rect x="29" y="118" width="9" height="11" rx="2.5" fill="#334155" />
          <rect x="42" y="118" width="9" height="11" rx="2.5" fill="#334155" />
          <line x1="29" y1="124" x2="38" y2="124" stroke="#eab308" strokeWidth="1.5" />
          <line x1="42" y1="124" x2="51" y2="124" stroke="#eab308" strokeWidth="1.5" />
          {/* Cadet Legs */}
          <rect x="30" y="88" width="8" height="32" rx="3" fill="#eab308" />
          <rect x="42" y="88" width="8" height="32" rx="3" fill="#eab308" />
          {/* Jumpsuit Torso */}
          <path d="M27 54 L53 54 L51 89 L29 89 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
          {/* Academy Emblem */}
          <polygon points="40,60 45,69 35,69" fill="#0f172a" />
          {/* Arms */}
          <path d="M28 56 Q20 70 26 80" stroke="#eab308" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M52 56 Q60 70 54 80" stroke="#eab308" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Head & Training Headset */}
          <ellipse cx="40" cy="36" rx="12" ry="13" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="36" cy="35" r="2" fill="#0f172a" />
          <circle cx="44" cy="35" r="2" fill="#0f172a" />
          {/* Headset bar */}
          <path d="M28 34 Q40 23 52 34" stroke="#0f172a" strokeWidth="2" fill="none" />
          <circle cx="28" cy="35" r="3" fill="#0f172a" />
          <circle cx="52" cy="35" r="3" fill="#0f172a" />
        </svg>
      );

    case 'girl2':
      // Cadete Maia (Yellow cadet jumpsuit with mini life pack)
      return (
        <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-md">
          <ellipse cx="40" cy="134" rx="19" ry="4" fill="rgba(0,0,0,0.2)" />
          {/* Trainee Boots */}
          <rect x="29" y="118" width="9" height="11" rx="2.5" fill="#334155" />
          <rect x="42" y="118" width="9" height="11" rx="2.5" fill="#334155" />
          {/* Cadet Legs */}
          <rect x="30" y="88" width="8" height="32" rx="3" fill="#eab308" />
          <rect x="42" y="88" width="8" height="32" rx="3" fill="#eab308" />
          {/* Jumpsuit Torso */}
          <path d="M27 54 L53 54 L51 89 L29 89 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
          {/* Vest Pocket & Badge */}
          <rect x="33" y="62" width="14" height="12" rx="2" fill="#334155" />
          <circle cx="40" cy="68" r="2" fill="#38bdf8" />
          {/* Arms */}
          <path d="M28 56 Q20 70 26 80" stroke="#eab308" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M52 56 Q60 70 54 80" stroke="#eab308" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Head & Cadet Cap */}
          <ellipse cx="40" cy="36" rx="12" ry="13" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="36" cy="35" r="2" fill="#0f172a" />
          <circle cx="44" cy="35" r="2" fill="#0f172a" />
          <path d="M29 30 L51 30 L40 22 Z" fill="#334155" />
        </svg>
      );

    case 'police':
      // Androide Unit-7 (Futuristic Tactical Robot with glowing optical visor & arc reactor)
      return (
        <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-md">
          <ellipse cx="40" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.3)" />
          {/* Heavy Chrome Piston Feet */}
          <rect x="25" y="118" width="13" height="14" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <rect x="42" y="118" width="13" height="14" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          {/* Robotic Hydraulic Legs */}
          <rect x="27" y="82" width="10" height="38" rx="2" fill="#475569" />
          <rect x="43" y="82" width="10" height="38" rx="2" fill="#475569" />
          <line x1="32" y1="90" x2="32" y2="114" stroke="#10b981" strokeWidth="2" />
          <line x1="48" y1="90" x2="48" y2="114" stroke="#10b981" strokeWidth="2" />
          {/* Robotic Chassis Torso */}
          <path d="M22 46 L58 46 L54 84 L26 84 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          {/* Armor Chest Plates */}
          <rect x="26" y="49" width="12" height="16" rx="2" fill="#334155" />
          <rect x="42" y="49" width="12" height="16" rx="2" fill="#334155" />
          {/* Glowing Arc Reactor Core */}
          <circle cx="40" cy="66" r="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
          <polygon points="40,62 44,69 36,69" fill="#34d399" />
          {/* Robotic Arms */}
          <path d="M23 48 Q13 65 19 80" stroke="#475569" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M57 48 Q67 65 61 80" stroke="#475569" strokeWidth="7" strokeLinecap="round" fill="none" />
          <circle cx="19" cy="80" r="4.5" fill="#10b981" />
          <circle cx="61" cy="80" r="4.5" fill="#10b981" />
          {/* Android Head */}
          <rect x="28" y="16" width="24" height="26" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          {/* LED Optical Visor (Horizontal glowing cyan bar) */}
          <rect x="31" y="26" width="18" height="5" rx="1.5" fill="#10b981" />
          <line x1="31" y1="28.5" x2="49" y2="28.5" stroke="#a7f3d0" strokeWidth="1" />
          {/* Antenna */}
          <line x1="40" y1="16" x2="40" y2="9" stroke="#64748b" strokeWidth="2" />
          <circle cx="40" cy="8" r="2" fill="#10b981" />
        </svg>
      );

    case 'prisoner':
      // Especime X (Alien Organism floating in glass cryogenic containment chamber)
      return (
        <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-md">
          <ellipse cx="40" cy="134" rx="24" ry="5" fill="rgba(0,0,0,0.3)" />
          {/* Base Platform of the Cryo Chamber */}
          <rect x="20" y="116" width="40" height="14" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
          <rect x="24" y="122" width="32" height="4" rx="1" fill="#a855f7" opacity="0.8" />
          {/* Upper Dome / Valve */}
          <rect x="20" y="14" width="40" height="12" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="40" cy="20" r="3" fill="#ef4444" />
          {/* Transparent Glass Cylinder */}
          <rect
            x="22"
            y="26"
            width="36"
            height="90"
            rx="4"
            fill="#0f172a"
            stroke="#a855f7"
            strokeWidth="1.5"
            fillOpacity="0.45"
          />
          {/* Glass Specular Glare */}
          <line x1="26" y1="30" x2="26" y2="110" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Fluid Bubbles */}
          <circle cx="30" cy="95" r="2" fill="#c084fc" opacity="0.7" />
          <circle cx="48" cy="80" r="1.5" fill="#c084fc" opacity="0.7" />
          <circle cx="32" cy="45" r="2.5" fill="#c084fc" opacity="0.7" />
          {/* Floating Alien Bio-Organism */}
          <ellipse cx="40" cy="68" rx="12" ry="16" fill="#9333ea" />
          <circle cx="40" cy="62" r="7" fill="#a855f7" />
          {/* Alien Eyes */}
          <circle cx="36" cy="60" r="2" fill="#facc15" />
          <circle cx="44" cy="60" r="2" fill="#facc15" />
          <circle cx="40" cy="55" r="1.5" fill="#4ade80" />
          {/* Bioluminescent Tentacles */}
          <path d="M34 80 Q28 96 32 106" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M40 82 Q42 98 39 108" stroke="#c084fc" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M46 80 Q52 96 48 106" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Biohazard warning symbol */}
          <circle cx="40" cy="100" r="4" fill="#581c87" stroke="#e879f9" strokeWidth="0.8" />
          <circle cx="40" cy="100" r="1.5" fill="#f43f5e" />
        </svg>
      );
  }
};
