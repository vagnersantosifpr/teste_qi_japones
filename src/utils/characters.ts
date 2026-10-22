import { CharacterDef, CharacterId, ClassicSubtheme } from '../types/game';

// Nova Adaptação Pedagógica: Gincana de Ciências e Robótica das Equipes (Padrão e Recomendado)
export const TEAM_CHARACTERS: Record<CharacterId, CharacterDef> = {
  father: {
    id: 'father',
    name: 'Mentor Carlos',
    role: 'Líder da Equipe Alfa',
    isPilot: true,
    category: 'parent',
    description: 'Possui brevê de piloto. Não pode ficar com alunas da Equipe Beta sem a Mentora Beatriz (Protocolo de Ética e Imparcialidade).',
    accentColor: '#92400e', // Amber-800
  },
  mother: {
    id: 'mother',
    name: 'Mentora Beatriz',
    role: 'Líder da Equipe Beta',
    isPilot: true,
    category: 'parent',
    description: 'Possui brevê de piloto. Não pode ficar com alunos da Equipe Alfa sem o Mentor Carlos (Protocolo de Ética e Imparcialidade).',
    accentColor: '#7e22ce', // Purple-700
  },
  boy1: {
    id: 'boy1',
    name: 'Léo (Equipe Alfa)',
    role: 'Aluno Pesquisador Alfa',
    isPilot: false,
    category: 'child',
    description: 'Não conduz o barco. Não pode ficar a sós com a Mentora Beta sem o Mentor Carlos presente.',
    accentColor: '#15803d', // Green-700
  },
  boy2: {
    id: 'boy2',
    name: 'Pedro (Equipe Alfa)',
    role: 'Aluno Pesquisador Alfa',
    isPilot: false,
    category: 'child',
    description: 'Não conduz o barco. Não pode ficar a sós com a Mentora Beta sem o Mentor Carlos presente.',
    accentColor: '#16a34a', // Green-600
  },
  girl1: {
    id: 'girl1',
    name: 'Clara (Equipe Beta)',
    role: 'Aluna Pesquisadora Beta',
    isPilot: false,
    category: 'child',
    description: 'Não conduz o barco. Não pode ficar a sós com o Mentor Carlos sem a Mentora Beatriz presente.',
    accentColor: '#0284c7', // Sky-600
  },
  girl2: {
    id: 'girl2',
    name: 'Sofia (Equipe Beta)',
    role: 'Aluna Pesquisadora Beta',
    isPilot: false,
    category: 'child',
    description: 'Não conduz o barco. Não pode ficar a sós com o Mentor Carlos sem a Mentora Beatriz presente.',
    accentColor: '#0369a1', // Sky-700
  },
  police: {
    id: 'police',
    name: 'Fiscal Marcos',
    role: 'Árbitro / Guarda Fluvial',
    isPilot: true,
    category: 'police',
    description: 'Possui brevê de piloto. Deve manter a competidora penalizada sob custódia longe de todos os alunos.',
    accentColor: '#1e40af', // Blue-800
  },
  prisoner: {
    id: 'prisoner',
    name: 'Infratora (Penalizada)',
    role: 'Competidora sob Penalidade',
    isPilot: false,
    category: 'prisoner',
    description: 'Não conduz o barco. Não pode ficar com nenhum estudante ou mentor sem a presença do Fiscal de Prova.',
    accentColor: '#dc2626', // Red-600
  },
};

// Histórico Original do Teste Japonês de 2009 (Opcional para comparação pedagógica)
export const ORIGINAL_FAMILY_CHARACTERS: Record<CharacterId, CharacterDef> = {
  father: {
    id: 'father',
    name: 'Pai',
    role: 'Condutor / Pai de Família',
    isPilot: true,
    category: 'parent',
    description: 'Pode conduzir a jangada. Não pode ficar com nenhuma menina sem a mãe.',
    accentColor: '#92400e',
  },
  mother: {
    id: 'mother',
    name: 'Mãe',
    role: 'Condutora / Mãe de Família',
    isPilot: true,
    category: 'parent',
    description: 'Pode conduzir a jangada. Não pode ficar com nenhum menino sem o pai.',
    accentColor: '#7e22ce',
  },
  boy1: {
    id: 'boy1',
    name: 'Menino 1',
    role: 'Filho (Criança)',
    isPilot: false,
    category: 'child',
    description: 'Não conduz a jangada. Não pode ficar sozinho com a mãe sem o pai.',
    accentColor: '#15803d',
  },
  boy2: {
    id: 'boy2',
    name: 'Menino 2',
    role: 'Filho (Criança)',
    isPilot: false,
    category: 'child',
    description: 'Não conduz a jangada. Não pode ficar sozinho com a mãe sem o pai.',
    accentColor: '#16a34a',
  },
  girl1: {
    id: 'girl1',
    name: 'Menina 1',
    role: 'Filha (Criança)',
    isPilot: false,
    category: 'child',
    description: 'Não conduz a jangada. Não pode ficar sozinha com o pai sem a mãe.',
    accentColor: '#0284c7',
  },
  girl2: {
    id: 'girl2',
    name: 'Menina 2',
    role: 'Filha (Criança)',
    isPilot: false,
    category: 'child',
    description: 'Não conduz a jangada. Não pode ficar sozinha com o pai sem a mãe.',
    accentColor: '#0369a1',
  },
  police: {
    id: 'police',
    name: 'Policial',
    role: 'Condutor / Guarda',
    isPilot: true,
    category: 'police',
    description: 'Pode conduzir a jangada. Deve vigiar a prisioneira junto da família.',
    accentColor: '#1e40af',
  },
  prisoner: {
    id: 'prisoner',
    name: 'Prisioneira',
    role: 'Detenta Ruiva',
    isPilot: false,
    category: 'prisoner',
    description: 'Não conduz a jangada. Não pode ficar com nenhum membro da família sem o policial.',
    accentColor: '#dc2626',
  },
};

// Por padrão, CHARACTERS aponta para a nova adaptação pedagógica
export const CHARACTERS: Record<CharacterId, CharacterDef> = TEAM_CHARACTERS;

export const SPACE_CHARACTERS: Record<CharacterId, CharacterDef> = {
  father: {
    id: 'father',
    name: 'Comandante Silva',
    role: 'Comando da Missão Orbital',
    isPilot: true,
    category: 'parent',
    description: 'Possui credencial de piloto. Não pode ficar com nenhum Cadete sem a Engenheira.',
    accentColor: '#2563eb', // Blue-600
  },
  mother: {
    id: 'mother',
    name: 'Engenheira Elena',
    role: 'Chefe de Sistemas e Propulsão',
    isPilot: true,
    category: 'parent',
    description: 'Possui credencial de piloto. Não pode ficar com nenhum Astrofísico sem o Comandante.',
    accentColor: '#ea580c', // Orange-600
  },
  boy1: {
    id: 'boy1',
    name: 'Astrofísico Neil',
    role: 'Cientista de Cosmologia',
    isPilot: false,
    category: 'child',
    description: 'Não pilota a cápsula. Não pode ficar com a Engenheira sem o Comandante.',
    accentColor: '#06b6d4', // Cyan-500
  },
  boy2: {
    id: 'boy2',
    name: 'Astrofísico Carl',
    role: 'Cientista de Física Quântica',
    isPilot: false,
    category: 'child',
    description: 'Não pilota a cápsula. Não pode ficar com a Engenheira sem o Comandante.',
    accentColor: '#0891b2', // Cyan-600
  },
  girl1: {
    id: 'girl1',
    name: 'Cadete Leo',
    role: 'Aspirante em Treinamento',
    isPilot: false,
    category: 'child',
    description: 'Não pilota a cápsula. Não pode ficar com o Comandante sem a Engenheira.',
    accentColor: '#eab308', // Yellow-500
  },
  girl2: {
    id: 'girl2',
    name: 'Cadete Maia',
    role: 'Aspirante em Treinamento',
    isPilot: false,
    category: 'child',
    description: 'Não pilota a cápsula. Não pode ficar com o Comandante sem a Engenheira.',
    accentColor: '#ca8a04', // Yellow-600
  },
  police: {
    id: 'police',
    name: 'Androide Unit-7',
    role: 'IA Tática / Contenção Biológica',
    isPilot: true,
    category: 'police',
    description: 'Pilota a cápsula. Deve conter o Espécime Alienígena perto de qualquer humano.',
    accentColor: '#10b981', // Emerald-500
  },
  prisoner: {
    id: 'prisoner',
    name: 'Espécime Alienígena',
    role: 'Amostra Biológica Volátil',
    isPilot: false,
    category: 'prisoner',
    description: 'Não pilota. Nunca pode ficar com nenhum membro humano da tripulação sem o Androide.',
    accentColor: '#a855f7', // Purple-500
  },
};

export function getCharacterDef(
  id: CharacterId,
  phase: 'classic' | 'space' = 'classic',
  subtheme: ClassicSubtheme = 'teams'
): CharacterDef {
  if (phase === 'space') return SPACE_CHARACTERS[id];
  if (subtheme === 'family') return ORIGINAL_FAMILY_CHARACTERS[id];
  return TEAM_CHARACTERS[id];
}

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
