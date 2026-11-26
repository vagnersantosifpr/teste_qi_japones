import { CharacterId, CharacterStateMap, RuleViolation, ClassicSubtheme, GamePhase } from '../types/game';

export interface GroupCheckResult {
  ruleViolations: RuleViolation[];
}

export function checkGroupViolations(
  members: CharacterId[],
  locationName: string,
  phase: GamePhase = 'classic',
  subtheme: ClassicSubtheme = 'teams'
): RuleViolation[] {
  const violations: RuleViolation[] = [];
  const set = new Set(members);

  // Fase 1: Lobo, Cordeiro e Alface
  if (phase === 'wolf') {
    const hasFarmer = set.has('farmer');
    const hasWolf = set.has('wolf');
    const hasLamb = set.has('lamb');
    const hasCabbage = set.has('cabbage');

    if (hasWolf && hasLamb && !hasFarmer) {
      violations.push({
        ruleNumber: 2,
        title: 'Perigo na Margem: Lobo e Cordeiro!',
        message: `Na ${locationName}, o Lobo não pode ficar sem a supervisão do Fazendeiro junto com o Cordeiro, senão ele o devorará!`,
        location: locationName,
        violatorIds: ['wolf'],
        targetIds: ['lamb'],
      });
    }

    if (hasLamb && hasCabbage && !hasFarmer) {
      violations.push({
        ruleNumber: 3,
        title: 'Prejuízo na Margem: Cordeiro e Alface!',
        message: `Na ${locationName}, o Cordeiro não pode ficar sem a supervisão do Fazendeiro junto com a Alface, senão ele a comerá!`,
        location: locationName,
        violatorIds: ['lamb'],
        targetIds: ['cabbage'],
      });
    }

    return violations;
  }

  // Fase 2 & 3: Travessia do Rio (8 personagens) e Estação Espacial
  const hasFather = set.has('father');
  const hasMother = set.has('mother');
  const hasPolice = set.has('police');
  const hasPrisoner = set.has('prisoner');

  const boysPresent = (['boy1', 'boy2'] as CharacterId[]).filter((id) => set.has(id));
  const girlsPresent = (['girl1', 'girl2'] as CharacterId[]).filter((id) => set.has(id));
  const familyMembersPresent = (['father', 'mother', 'boy1', 'boy2', 'girl1', 'girl2'] as CharacterId[]).filter((id) =>
    set.has(id)
  );

  // Regra 2: Mentor Alfa (Pai) e Alunas Beta (Meninas) sem Mentora Beta (Mãe)
  if (hasFather && girlsPresent.length > 0 && !hasMother) {
    if (phase === 'space') {
      violations.push({
        ruleNumber: 2,
        title: 'Protocolo 2: Comandante e Cadetes',
        message: `No(a) ${locationName}, o Comandante Silva não pode ficar com ${
          girlsPresent.length > 1 ? 'os Cadetes' : 'o Cadete'
        } sem a presença da Engenheira Elena (Protocolo de Segurança e Tutela)!`,
        location: locationName,
        violatorIds: ['father'],
        targetIds: girlsPresent,
      });
    } else if (subtheme === 'teams') {
      violations.push({
        ruleNumber: 2,
        title: 'Código de Imparcialidade: Mentor Alfa e Alunas Beta',
        message: `Na ${locationName}, o Mentor Carlos (Equipe Alfa) não pode ficar a sós com ${
          girlsPresent.length > 1 ? 'as alunas' : 'a aluna'
        } da Equipe Beta sem a presença da Mentora Beatriz (Protocolo de Ética e Sigilo da Olimpíada)!`,
        location: locationName,
        violatorIds: ['father'],
        targetIds: girlsPresent,
      });
    } else {
      violations.push({
        ruleNumber: 2,
        title: 'Regra 2 Violada: Pai e Filhas',
        message: `Na ${locationName}, o Pai não pode ficar com ${
          girlsPresent.length > 1 ? 'as meninas' : 'a menina'
        } sem a presença da Mãe!`,
        location: locationName,
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
        message: `No(a) ${locationName}, a Engenheira Elena não pode ficar com ${
          boysPresent.length > 1 ? 'os Astrofísicos' : 'o Astrofísico'
        } sem a presença do Comandante Silva (Protocolo de Comando Civil-Militar)!`,
        location: locationName,
        violatorIds: ['mother'],
        targetIds: boysPresent,
      });
    } else if (subtheme === 'teams') {
      violations.push({
        ruleNumber: 3,
        title: 'Código de Imparcialidade: Mentora Beta e Alunos Alfa',
        message: `Na ${locationName}, a Mentora Beatriz (Equipe Beta) não pode ficar a sós com ${
          boysPresent.length > 1 ? 'os alunos' : 'o aluno'
        } da Equipe Alfa sem a presença do Mentor Carlos (Protocolo de Ética e Sigilo da Olimpíada)!`,
        location: locationName,
        violatorIds: ['mother'],
        targetIds: boysPresent,
      });
    } else {
      violations.push({
        ruleNumber: 3,
        title: 'Regra 3 Violada: Mãe e Filhos',
        message: `Na ${locationName}, a Mãe não pode ficar com ${
          boysPresent.length > 1 ? 'os meninos' : 'o menino'
        } sem a presença do Pai!`,
        location: locationName,
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
        location: locationName,
        violatorIds: ['prisoner'],
        targetIds: familyMembersPresent,
      });
    } else if (subtheme === 'teams') {
      violations.push({
        ruleNumber: 4,
        title: 'Protocolo de Custódia: Infratora Penalizada!',
        message: `Na ${locationName}, a competidora penalizada por infração/sabotagem não pode ficar perto de nenhum estudante ou mentor sem a presença e custódia do Fiscal de Prova Marcos!`,
        location: locationName,
        violatorIds: ['prisoner'],
        targetIds: familyMembersPresent,
      });
    } else {
      violations.push({
        ruleNumber: 4,
        title: 'Regra 4 Violada: Prisioneira com a Família',
        message: `Na ${locationName}, a prisioneira não pode ficar com nenhum membro da família sem a presença do policial!`,
        location: locationName,
        violatorIds: ['prisoner'],
        targetIds: familyMembersPresent,
      });
    }
  }

  return violations;
}

export function evaluateAllRules(
  characters: CharacterStateMap,
  phase: GamePhase = 'classic',
  subtheme: ClassicSubtheme = 'teams'
): RuleViolation[] {
  const leftBankMembers: CharacterId[] = [];
  const rightBankMembers: CharacterId[] = [];
  const raftMembers: CharacterId[] = [];

  for (const [key, state] of Object.entries(characters)) {
    if (!state) continue;
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
  const raftName = phase === 'space' ? 'Cápsula de Transporte' : phase === 'wolf' ? 'Barco' : 'Jangada';

  allViolations.push(...checkGroupViolations(leftBankMembers, leftName, phase, subtheme));
  allViolations.push(...checkGroupViolations(rightBankMembers, rightName, phase, subtheme));
  allViolations.push(...checkGroupViolations(raftMembers, raftName, phase, subtheme));

  return allViolations;
}

export function validateRaftCanSail(
  characters: CharacterStateMap,
  phase: GamePhase = 'classic'
): { canSail: boolean; reason?: string } {
  const passengers = (Object.keys(characters) as CharacterId[]).filter(
    (id) => characters[id]?.onRaft
  );

  const craftLabel = phase === 'space' ? 'cápsula' : phase === 'wolf' ? 'barco' : 'jangada';

  if (passengers.length === 0) {
    return {
      canSail: false,
      reason: `O(a) ${craftLabel} está vazio(a)! Selecione pelo menos um ocupante para embarcar.`,
    };
  }

  if (passengers.length > 2) {
    return {
      canSail: false,
      reason: `O(a) ${craftLabel} suporta no máximo 2 ocupantes de cada vez!`,
    };
  }

  const hasPilot =
    phase === 'wolf'
      ? passengers.some((id) => id === 'farmer')
      : passengers.some((id) => id === 'father' || id === 'mother' || id === 'police');

  if (!hasPilot) {
    return {
      canSail: false,
      reason:
        phase === 'wolf'
          ? 'Apenas o Fazendeiro sabe remar o barco!'
          : 'Só o policial e os pais podem conduzir a jangada! Filhos e prisioneira não sabem navegar sozinhos.',
    };
  }

  return { canSail: true };
}

export function checkVictory(characters: CharacterStateMap): boolean {
  const states = Object.values(characters).filter(Boolean);
  if (states.length === 0) return false;
  return states.every((state) => state?.bank === 'right');
}
