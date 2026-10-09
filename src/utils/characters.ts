import { CharacterDef, CharacterId } from '../types/game';

export const CHARACTERS: Record<CharacterId, CharacterDef> = {
  father: {
    id: 'father',
    name: 'Pai',
    role: 'Condutor / Pai de Família',
    isPilot: true,
    category: 'parent',
    description: 'Pode conduzir a jangada. Não pode ficar com nenhuma menina sem a mãe.',
    accentColor: '#92400e', // Amber-800
  },
  mother: {
    id: 'mother',
    name: 'Mãe',
    role: 'Condutora / Mãe de Família',
    isPilot: true,
    category: 'parent',
    description: 'Pode conduzir a jangada. Não pode ficar com nenhum menino sem o pai.',
    accentColor: '#7e22ce', // Purple-700
  },
  boy1: {
    id: 'boy1',
    name: 'Menino 1',
    role: 'Filho (Criança)',
    isPilot: false,
    category: 'child',
    description: 'Não conduz a jangada. Não pode ficar sozinho com a mãe sem o pai.',
    accentColor: '#15803d', // Green-700
  },
  boy2: {
    id: 'boy2',
    name: 'Menino 2',
    role: 'Filho (Criança)',
    isPilot: false,
    category: 'child',
    description: 'Não conduz a jangada. Não pode ficar sozinho com a mãe sem o pai.',
    accentColor: '#16a34a', // Green-600
  },
  girl1: {
    id: 'girl1',
    name: 'Menina 1',
    role: 'Filha (Criança)',
    isPilot: false,
    category: 'child',
    description: 'Não conduz a jangada. Não pode ficar sozinha com o pai sem a mãe.',
    accentColor: '#0284c7', // Sky-600
  },
  girl2: {
    id: 'girl2',
    name: 'Menina 2',
    role: 'Filha (Criança)',
    isPilot: false,
    category: 'child',
    description: 'Não conduz a jangada. Não pode ficar sozinha com o pai sem a mãe.',
    accentColor: '#0369a1', // Sky-700
  },
  police: {
    id: 'police',
    name: 'Policial',
    role: 'Condutor / Guarda',
    isPilot: true,
    category: 'police',
    description: 'Pode conduzir a jangada. Deve vigiar a prisioneira junto da família.',
    accentColor: '#1e40af', // Blue-800
  },
  prisoner: {
    id: 'prisoner',
    name: 'Prisioneira',
    role: 'Detenta Ruiva',
    isPilot: false,
    category: 'prisoner',
    description: 'Não conduz a jangada. Não pode ficar com nenhum membro da família sem o policial.',
    accentColor: '#dc2626', // Red-600
  },
};

export const INITIAL_CHARACTERS_STATE: Record<CharacterId, { bank: 'left' | 'right'; onRaft: boolean }> = {
  father: { bank: 'left', onRaft: false },
  mother: { bank: 'left', onRaft: false },
  boy1: { bank: 'left', onRaft: false },
  boy2: { bank: 'left', onRaft: false },
  girl1: { bank: 'left', onRaft: false },
  girl2: { bank: 'left', onRaft: false },
  police: { bank: 'left', onRaft: false },
  prisoner: { bank: 'left', onRaft: false },
};
