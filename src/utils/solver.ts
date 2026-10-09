import { CharacterId, Bank } from '../types/game';
import { checkGroupViolations } from './rules';

export interface SolverStep {
  passengers: CharacterId[];
  fromBank: Bank;
  toBank: Bank;
  explanation: string;
}

const ALL_CHARACTERS: CharacterId[] = [
  'father',
  'mother',
  'boy1',
  'boy2',
  'girl1',
  'girl2',
  'police',
  'prisoner',
];

const PILOTS: Set<CharacterId> = new Set(['father', 'mother', 'police']);

function isValidShore(members: CharacterId[]): boolean {
  return checkGroupViolations(members, 'Margem Esquerda').length === 0;
}

function isValidRaft(passengers: CharacterId[]): boolean {
  if (passengers.length < 1 || passengers.length > 2) return false;
  const hasPilot = passengers.some((p) => PILOTS.has(p));
  if (!hasPilot) return false;
  return checkGroupViolations(passengers, 'Jangada').length === 0;
}

function stateToKey(raftBank: Bank, leftMembers: Set<CharacterId>): string {
  const sortedLeft = ALL_CHARACTERS.filter((c) => leftMembers.has(c)).join(',');
  return `${raftBank}|${sortedLeft}`;
}

export function findNextOptimalStep(
  currentRaftBank: Bank,
  currentLeftBank: CharacterId[],
  currentRightBank: CharacterId[]
): SolverStep | null {
  const currentLeftSet = new Set(currentLeftBank);

  // BFS Queue
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
    const currentBankMembers = fromBank === 'left'
      ? ALL_CHARACTERS.filter((c) => current.leftSet.has(c))
      : ALL_CHARACTERS.filter((c) => !current.leftSet.has(c));

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

        const nextLeftList = ALL_CHARACTERS.filter((c) => nextLeftSet.has(c));
        const nextRightList = ALL_CHARACTERS.filter((c) => !nextLeftSet.has(c));

        if (isValidShore(nextLeftList) && isValidShore(nextRightList)) {
          const nextKey = stateToKey(toBank, nextLeftSet);
          if (!visited.has(nextKey)) {
            visited.add(nextKey);
            const step: SolverStep = {
              passengers,
              fromBank,
              toBank,
              explanation: createExplanation(passengers, fromBank, toBank),
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

          const nextLeftList = ALL_CHARACTERS.filter((c) => nextLeftSet.has(c));
          const nextRightList = ALL_CHARACTERS.filter((c) => !nextLeftSet.has(c));

          if (isValidShore(nextLeftList) && isValidShore(nextRightList)) {
            const nextKey = stateToKey(toBank, nextLeftSet);
            if (!visited.has(nextKey)) {
              visited.add(nextKey);
              const step: SolverStep = {
                passengers: passengers2,
                fromBank,
                toBank,
                explanation: createExplanation(passengers2, fromBank, toBank),
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

const NAME_MAP: Record<CharacterId, string> = {
  father: 'o Pai',
  mother: 'a Mãe',
  boy1: 'o Menino 1',
  boy2: 'o Menino 2',
  girl1: 'a Menina 1',
  girl2: 'a Menina 2',
  police: 'o Policial',
  prisoner: 'a Prisioneira',
};

function createExplanation(passengers: CharacterId[], from: Bank, to: Bank): string {
  const names = passengers.map((p) => NAME_MAP[p]).join(' e ');
  const dest = to === 'right' ? 'margem direita' : 'margem esquerda';
  return `Transporte ${names} para a ${dest}.`;
}
