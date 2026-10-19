import { CharacterId, CharacterState, RuleViolation } from '../types/game';

export interface GroupCheckResult {
  ruleViolations: RuleViolation[];
}

export function checkGroupViolations(
  members: CharacterId[],
  locationName: 'Margem Esquerda' | 'Margem Direita' | 'Jangada'
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

  // Regra 2: O Pai não pode ficar com nenhuma das meninas sem a presença da Mãe
  if (hasFather && girlsPresent.length > 0 && !hasMother) {
    violations.push({
      ruleNumber: 2,
      title: 'Regra 2 Violada: Pai e Filhas',
      message: `Na ${locationName}, o Pai não pode ficar com ${girlsPresent.length > 1 ? 'as meninas' : 'a menina'} sem a presença da Mãe!`,
      location: locationName,
      violatorIds: ['father'],
      targetIds: girlsPresent,
    });
  }

  // Regra 3: A Mãe não pode ficar na presença dos meninos sem a presença do Pai
  if (hasMother && boysPresent.length > 0 && !hasFather) {
    violations.push({
      ruleNumber: 3,
      title: 'Regra 3 Violada: Mãe e Filhos',
      message: `Na ${locationName}, a Mãe não pode ficar com ${boysPresent.length > 1 ? 'os meninos' : 'o menino'} sem a presença do Pai!`,
      location: locationName,
      violatorIds: ['mother'],
      targetIds: boysPresent,
    });
  }

  // Regra 4: A mulher de cabelo ruivo que está presa não pode ficar na presença de nenhum membro da família sem o policial
  if (hasPrisoner && familyMembersPresent.length > 0 && !hasPolice) {
    violations.push({
      ruleNumber: 4,
      title: 'Regra 4 Violada: Prisioneira com a Família',
      message: `Na ${locationName}, a prisioneira não pode ficar com nenhum membro da família sem a presença do policial!`,
      location: locationName,
      violatorIds: ['prisoner'],
      targetIds: familyMembersPresent,
    });
  }

  return violations;
}

export function evaluateAllRules(
  characters: Record<CharacterId, CharacterState>
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

  // Checar margem esquerda
  allViolations.push(...checkGroupViolations(leftBankMembers, 'Margem Esquerda'));

  // Checar margem direita
  allViolations.push(...checkGroupViolations(rightBankMembers, 'Margem Direita'));

  // Checar jangada
  allViolations.push(...checkGroupViolations(raftMembers, 'Jangada'));

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
