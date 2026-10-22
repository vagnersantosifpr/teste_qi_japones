import { CharacterId, CharacterState, RuleViolation, ClassicSubtheme } from '../types/game';

export interface GroupCheckResult {
  ruleViolations: RuleViolation[];
}

export function checkGroupViolations(
  members: CharacterId[],
  locationName: string,
  phase: 'classic' | 'space' = 'classic',
  subtheme: ClassicSubtheme = 'teams'
): RuleViolation[] {
  const violations: RuleViolation[] = [];
  const set = new Set(members);

  const hasFather = set.has('father');
  const hasMother = set.has('mother');
  const hasPolice = set.has('police');
  const hasPrisoner = set.has('prisoner');

  const boysPresent = (['boy1', 'boy2'] as CharacterId[]).filter((id) => set.has(id));
  const girlsPresent = (['girl1', 'girl2'] as CharacterId[]).filter((id) => set.has(id));
  const familyMembersPresent = (['father', 'mother', 'boy1', 'boy2', 'girl1', 'girl2'] as CharacterId[]).filter((id) => set.has(id));

  // Regra 2: Mentor Alfa (Pai) e Alunas Beta (Meninas) sem Mentora Beta (Mãe)
  if (hasFather && girlsPresent.length > 0 && !hasMother) {
    if (phase === 'space') {
      violations.push({
        ruleNumber: 2,
        title: 'Protocolo 2: Comandante e Cadetes',
        message: `No(a) ${locationName}, o Comandante Silva não pode ficar com ${girlsPresent.length > 1 ? 'os Cadetes' : 'o Cadete'} sem a presença da Engenheira Elena (Protocolo de Segurança e Tutela)!`,
        location: locationName as 'Margem Esquerda',
        violatorIds: ['father'],
        targetIds: girlsPresent,
      });
    } else if (subtheme === 'teams') {
      violations.push({
        ruleNumber: 2,
        title: 'Código de Imparcialidade: Mentor Alfa e Alunas Beta',
        message: `Na ${locationName}, o Mentor Carlos (Equipe Alfa) não pode ficar a sós com ${girlsPresent.length > 1 ? 'as alunas' : 'a aluna'} da Equipe Beta sem a presença da Mentora Beatriz (Protocolo de Ética e Sigilo da Olimpíada)!`,
        location: locationName as 'Margem Esquerda',
        violatorIds: ['father'],
        targetIds: girlsPresent,
      });
    } else {
      violations.push({
        ruleNumber: 2,
        title: 'Regra 2 Violada: Pai e Filhas',
        message: `Na ${locationName}, o Pai não pode ficar com ${girlsPresent.length > 1 ? 'as meninas' : 'a menina'} sem a presença da Mãe!`,
        location: locationName as 'Margem Esquerda',
        violatorIds: ['father'],
        targetIds: girlsPresent,
      });
    }
  }

  // Regra 3: Mentora Beta (Mãe) e Alunos Alfa (Meninos) sem Mentor Alfa (Pai)
  if (hasMother && boysPresent.length > 0 && !hasFather) {
    if (phase === 'space') {
      violations.push({
        ruleNumber: 3,
        title: 'Protocolo 3: Engenheira e Astrofísicos',
        message: `No(a) ${locationName}, a Engenheira Elena não pode ficar com ${boysPresent.length > 1 ? 'os Astrofísicos' : 'o Astrofísico'} sem a presença do Comandante Silva (Protocolo de Comando Civil-Militar)!`,
        location: locationName as 'Margem Esquerda',
        violatorIds: ['mother'],
        targetIds: boysPresent,
      });
    } else if (subtheme === 'teams') {
      violations.push({
        ruleNumber: 3,
        title: 'Código de Imparcialidade: Mentora Beta e Alunos Alfa',
        message: `Na ${locationName}, a Mentora Beatriz (Equipe Beta) não pode ficar a sós com ${boysPresent.length > 1 ? 'os alunos' : 'o aluno'} da Equipe Alfa sem a presença do Mentor Carlos (Protocolo de Ética e Sigilo da Olimpíada)!`,
        location: locationName as 'Margem Esquerda',
        violatorIds: ['mother'],
        targetIds: boysPresent,
      });
    } else {
      violations.push({
        ruleNumber: 3,
        title: 'Regra 3 Violada: Mãe e Filhos',
        message: `Na ${locationName}, a Mãe não pode ficar com ${boysPresent.length > 1 ? 'os meninos' : 'o menino'} sem a presença do Pai!`,
        location: locationName as 'Margem Esquerda',
        violatorIds: ['mother'],
        targetIds: boysPresent,
      });
    }
  }

  // Regra 4: Infratora (Prisioneira) com Integrantes das Equipes sem Fiscal (Policial)
  if (hasPrisoner && familyMembersPresent.length > 0 && !hasPolice) {
    if (phase === 'space') {
      violations.push({
        ruleNumber: 4,
        title: 'Alerta Biológico: Espécime Alienígena!',
        message: `No(a) ${locationName}, o Espécime Alienígena não pode ficar perto de nenhum tripulante humano sem a contenção ativa do Androide Tático Unit-7 (Risco Crítico de Contaminação Biológica)!`,
        location: locationName as 'Margem Esquerda',
        violatorIds: ['prisoner'],
        targetIds: familyMembersPresent,
      });
    } else if (subtheme === 'teams') {
      violations.push({
        ruleNumber: 4,
        title: 'Protocolo de Custódia: Infratora Penalizada!',
        message: `Na ${locationName}, a competidora penalizada por infração/sabotagem não pode ficar perto de nenhum estudante ou mentor sem a presença e custódia do Fiscal de Prova Marcos!`,
        location: locationName as 'Margem Esquerda',
        violatorIds: ['prisoner'],
        targetIds: familyMembersPresent,
      });
    } else {
      violations.push({
        ruleNumber: 4,
        title: 'Regra 4 Violada: Prisioneira com a Família',
        message: `Na ${locationName}, a prisioneira não pode ficar com nenhum membro da família sem a presença do policial!`,
        location: locationName as 'Margem Esquerda',
        violatorIds: ['prisoner'],
        targetIds: familyMembersPresent,
      });
    }
  }

  return violations;
}

export function evaluateAllRules(
  characters: Record<CharacterId, CharacterState>,
  phase: 'classic' | 'space' = 'classic',
  subtheme: ClassicSubtheme = 'teams'
): RuleViolation[] {
  const leftBankMembers: CharacterId[] = [];
  const rightBankMembers: CharacterId[] = [];
  const raftMembers: CharacterId[] = [];

  for (const [key, state] of Object.entries(characters)) {
    const id = key as CharacterId;
    if (state.onRaft) {
      raftMembers.push(id);
    } else if (state.bank === 'left') {
      leftBankMembers.push(id);
    } else {
      rightBankMembers.push(id);
    }
  }

  const allViolations: RuleViolation[] = [];

  const leftName = phase === 'space' ? 'Módulo Alfa (Base)' : 'Margem Esquerda';
  const rightName = phase === 'space' ? 'Nave de Evacuação' : 'Margem Direita';
  const raftName = phase === 'space' ? 'Cápsula de Transporte' : 'Jangada';

  // Checar margem esquerda / Módulo Alfa
  allViolations.push(...checkGroupViolations(leftBankMembers, leftName, phase, subtheme));

  // Checar margem direita / Nave de Evacuação
  allViolations.push(...checkGroupViolations(rightBankMembers, rightName, phase, subtheme));

  // Checar jangada / Cápsula de Transporte
  allViolations.push(...checkGroupViolations(raftMembers, raftName, phase, subtheme));

  return allViolations;
}

export function validateRaftCanSail(
  characters: Record<CharacterId, CharacterState>
): { canSail: boolean; reason?: string } {
  const passengers = (Object.keys(characters) as CharacterId[]).filter(
    (id) => characters[id].onRaft
  );

  if (passengers.length === 0) {
    return {
      canSail: false,
      reason: 'A jangada está vazia! Selecione pelo menos uma pessoa para embarcar.',
    };
  }

  if (passengers.length > 2) {
    return {
      canSail: false,
      reason: 'A jangada suporta no máximo 2 pessoas de cada vez!',
    };
  }

  const hasPilot = passengers.some((id) => id === 'father' || id === 'mother' || id === 'police');
  if (!hasPilot) {
    return {
      canSail: false,
      reason: 'Só o policial e os pais podem conduzir a jangada! Filhos e prisioneira não sabem navegar sozinhos.',
    };
  }

  return { canSail: true };
}

export function checkVictory(characters: Record<CharacterId, CharacterState>): boolean {
  return (Object.keys(characters) as CharacterId[]).every(
    (id) => characters[id].bank === 'right'
  );
}
