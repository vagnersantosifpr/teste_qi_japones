import { CharacterId, Bank, GamePhase, ClassicSubtheme } from '../types/game';
import { checkGroupViolations } from './rules';
import { getPhaseCharacterIds, getCharacterDef } from './characters';

export interface SolverStep {
  passengers: CharacterId[];
  fromBank: Bank;
  toBank: Bank;
  explanation: string;
}

export function findNextOptimalStep(
  currentRaftBank: Bank,
  currentLeftBank: CharacterId[],
  _currentRightBank: CharacterId[],
  phase: GamePhase = 'classic',
  subtheme: ClassicSubtheme = 'teams'
): SolverStep | null {
  const allCharacters = getPhaseCharacterIds(phase);
  const pilots: Set<CharacterId> =
    phase === 'wolf' ? new Set(['farmer']) : new Set(['father', 'mother', 'police']);

  const isValidShore = (members: CharacterId[]): boolean => {
    return checkGroupViolations(members, 'Margem Esquerda', phase, subtheme).length === 0;
  };

  const isValidRaft = (passengers: CharacterId[]): boolean => {
    if (passengers.length < 1 || passengers.length > 2) return false;
    const hasPilot = passengers.some((p) => pilots.has(p));
    if (!hasPilot) return false;
    return checkGroupViolations(passengers, 'Jangada', phase, subtheme).length === 0;
  };

  const stateToKey = (raftBank: Bank, leftMembers: Set<CharacterId>): string => {
    const sortedLeft = allCharacters.filter((c) => leftMembers.has(c)).join(',');
    return `${raftBank}|${sortedLeft}`;
  };

  const createExplanation = (passengers: CharacterId[], to: Bank): string => {
    const names = passengers.map((p) => getCharacterDef(p, phase, subtheme).name).join(' e ');
    const dest =
      phase === 'space'
        ? to === 'right'
          ? 'Nave de Evacuação'
          : 'Módulo Alfa'
        : to === 'right'
        ? 'margem direita'
        : 'margem esquerda';
    return `Transporte ${names} para a ${dest}.`;
  };

  const currentLeftSet = new Set(currentLeftBank);

  interface BFSNode {
    raftBank: Bank;
    leftSet: Set<CharacterId>;
    path: SolverStep[];
  }

  const initialKey = stateToKey(currentRaftBank, currentLeftSet);
  const visited = new Set<string>([initialKey]);
  const queue: BFSNode[] = [
    {
      raftBank: currentRaftBank,
      leftSet: currentLeftSet,
      path: [],
    },
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;

    // Check victory
    if (current.leftSet.size === 0 && current.raftBank === 'right') {
      if (current.path.length > 0) {
        return current.path[0];
      }
      return null;
    }

    const fromBank = current.raftBank;
    const toBank: Bank = fromBank === 'left' ? 'right' : 'left';
    const currentBankMembers =
      fromBank === 'left'
        ? allCharacters.filter((c) => current.leftSet.has(c))
        : allCharacters.filter((c) => !current.leftSet.has(c));

    // Try all 1-person moves
    for (let i = 0; i < currentBankMembers.length; i++) {
      const p1 = currentBankMembers[i];
      const passengers = [p1];

      if (isValidRaft(passengers)) {
        const nextLeftSet = new Set(current.leftSet);
        if (fromBank === 'left') {
          nextLeftSet.delete(p1);
        } else {
          nextLeftSet.add(p1);
        }

        const nextLeftList = allCharacters.filter((c) => nextLeftSet.has(c));
        const nextRightList = allCharacters.filter((c) => !nextLeftSet.has(c));

        if (isValidShore(nextLeftList) && isValidShore(nextRightList)) {
          const nextKey = stateToKey(toBank, nextLeftSet);
          if (!visited.has(nextKey)) {
            visited.add(nextKey);
            const step: SolverStep = {
              passengers,
              fromBank,
              toBank,
              explanation: createExplanation(passengers, toBank),
            };
            queue.push({
              raftBank: toBank,
              leftSet: nextLeftSet,
              path: [...current.path, step],
            });
          }
        }
      }

      // Try all 2-person moves
      for (let j = i + 1; j < currentBankMembers.length; j++) {
        const p2 = currentBankMembers[j];
        const passengers2 = [p1, p2];

        if (isValidRaft(passengers2)) {
          const nextLeftSet = new Set(current.leftSet);
          if (fromBank === 'left') {
            nextLeftSet.delete(p1);
            nextLeftSet.delete(p2);
          } else {
            nextLeftSet.add(p1);
            nextLeftSet.add(p2);
          }

          const nextLeftList = allCharacters.filter((c) => nextLeftSet.has(c));
          const nextRightList = allCharacters.filter((c) => !nextLeftSet.has(c));

          if (isValidShore(nextLeftList) && isValidShore(nextRightList)) {
            const nextKey = stateToKey(toBank, nextLeftSet);
            if (!visited.has(nextKey)) {
              visited.add(nextKey);
              const step: SolverStep = {
                passengers: passengers2,
                fromBank,
                toBank,
                explanation: createExplanation(passengers2, toBank),
              };
              queue.push({
                raftBank: toBank,
                leftSet: nextLeftSet,
                path: [...current.path, step],
              });
            }
          }
        }
      }
    }
  }

  return null;
}
