import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CharacterId, CharacterState, Bank, RuleViolation, GameSnapshot } from './types/game';
import { INITIAL_CHARACTERS_STATE, CHARACTERS } from './utils/characters';
import { evaluateAllRules, validateRaftCanSail, checkVictory } from './utils/rules';
import { findNextOptimalStep, SolverStep } from './utils/solver';
import { soundManager } from './utils/audio';

import { GameHeader } from './components/GameHeader';
import { StartScreen } from './components/StartScreen';
import { RiverBoard } from './components/RiverBoard';
import { ViolationBanner } from './components/ViolationBanner';
import { RulesModal } from './components/RulesModal';
import { HintModal } from './components/HintModal';
import { VictoryModal } from './components/VictoryModal';
import { StatsModal } from './components/StatsModal';
import { calculateLogicStats } from './utils/stats';

export default function App() {
  const [started, setStarted] = useState(false);
  const [raftBank, setRaftBank] = useState<Bank>('left');
  const [characters, setCharacters] = useState<Record<CharacterId, CharacterState>>(
    INITIAL_CHARACTERS_STATE
  );
  const [isSailing, setIsSailing] = useState(false);
  const [movesCount, setMovesCount] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [currentViolation, setCurrentViolation] = useState<RuleViolation | null>(null);
  const [history, setHistory] = useState<GameSnapshot[]>([]);

  const [isWon, setIsWon] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [hintStep, setHintStep] = useState<SolverStep | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Evaluative logic metrics tracked across the session
  const [hintsUsedCount, setHintsUsedCount] = useState(0);
  const [wrongAttemptsCount, setWrongAttemptsCount] = useState(0);
  const [undosCount, setUndosCount] = useState(0);

  // Cumulative session tracking across restarts
  const [restartsCount, setRestartsCount] = useState(0);
  const [accumulatedPastMoves, setAccumulatedPastMoves] = useState(0);
  const [accumulatedPastHints, setAccumulatedPastHints] = useState(0);
  const [accumulatedPastWrong, setAccumulatedPastWrong] = useState(0);
  const [accumulatedPastUndos, setAccumulatedPastUndos] = useState(0);
  const [accumulatedPastTime, setAccumulatedPastTime] = useState(0);

  // Student identification state
  const [studentName, setStudentName] = useState(() => {
    try {
      return localStorage.getItem('japanese_river_student_name') || '';
    } catch (_) {
      return '';
    }
  });

  const handleStudentNameChange = (name: string) => {
    setStudentName(name);
    try {
      localStorage.setItem('japanese_river_student_name', name);
    } catch (_) {}
  };

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (started && isTimerRunning && !isWon) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [started, isTimerRunning, isWon]);

  // Synchronize sound manager
  const handleToggleSound = useCallback(() => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.enabled = next;
  }, [soundEnabled]);

  // Start Game
  const handleStartGame = () => {
    soundManager.playStart();
    setStarted(true);
    setIsTimerRunning(true);
  };

  // Restart Game (Maintains global efficiency, increments restart count, accumulates past moves)
  const handleRestart = () => {
    soundManager.playClick();

    // Accumulate the current attempt's metrics into the global session metrics
    setRestartsCount((prev) => prev + 1);
    setAccumulatedPastMoves((prev) => prev + movesCount);
    setAccumulatedPastHints((prev) => prev + hintsUsedCount);
    setAccumulatedPastWrong((prev) => prev + wrongAttemptsCount);
    setAccumulatedPastUndos((prev) => prev + undosCount);
    setAccumulatedPastTime((prev) => prev + timerSeconds);

    // Reset board and current run state
    setRaftBank('left');
    setCharacters(INITIAL_CHARACTERS_STATE);
    setIsSailing(false);
    setMovesCount(0);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setCurrentViolation(null);
    setHistory([]);
    setIsWon(false);
    setHintsUsedCount(0);
    setWrongAttemptsCount(0);
    setUndosCount(0);
  };

  // Full reset for a new student / clean session
  const handleNewStudent = () => {
    soundManager.playClick();
    setStarted(false);
    setRestartsCount(0);
    setAccumulatedPastMoves(0);
    setAccumulatedPastHints(0);
    setAccumulatedPastWrong(0);
    setAccumulatedPastUndos(0);
    setAccumulatedPastTime(0);

    setRaftBank('left');
    setCharacters(INITIAL_CHARACTERS_STATE);
    setIsSailing(false);
    setMovesCount(0);
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setCurrentViolation(null);
    setHistory([]);
    setIsWon(false);
    setHintsUsedCount(0);
    setWrongAttemptsCount(0);
    setUndosCount(0);
  };

  // Push Snapshot
  const pushHistory = (desc: string) => {
    const snapshot: GameSnapshot = {
      raftBank,
      characters: JSON.parse(JSON.stringify(characters)),
      movesCount,
      description: desc,
    };
    setHistory((prev) => [...prev, snapshot]);
  };

  // Undo Move
  const handleUndo = () => {
    if (history.length === 0 || isSailing) return;
    soundManager.playClick();
    setUndosCount((prev) => prev + 1);
    const last = history[history.length - 1];
    setRaftBank(last.raftBank);
    setCharacters(last.characters);
    setMovesCount(last.movesCount);
    setCurrentViolation(null);
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  // Character Click (Embark / Disembark)
  const handleCharacterClick = (id: CharacterId) => {
    if (isSailing) return;

    // As requested: whenever someone is removed or changed, clear any active violation message!
    setCurrentViolation(null);

    const charState = characters[id];

    if (charState.onRaft) {
      // Disembark from raft to current raft bank (Removing someone)
      pushHistory(`Desembarque de ${CHARACTERS[id].name}`);
      soundManager.playStepOff();

      const newCharacters = {
        ...characters,
        [id]: {
          ...charState,
          onRaft: false,
          bank: raftBank,
        },
      };

      setCharacters(newCharacters);

      if (checkVictory(newCharacters)) {
        setIsTimerRunning(false);
        setIsWon(true);
        soundManager.playVictory();
      }
    } else {
      // Embark onto raft
      if (charState.bank !== raftBank) {
        return;
      }

      // Check raft passenger capacity (max 2)
      const currentRaftCount = Object.values(characters).filter((c) => c.onRaft).length;
      if (currentRaftCount >= 2) {
        soundManager.playViolation();
        setCurrentViolation({
          ruleNumber: 1,
          title: 'Jangada Lotada',
          message: 'No máximo duas pessoas podem estar na jangada ao mesmo tempo!',
          location: 'Jangada',
          violatorIds: [id],
          targetIds: [],
        });
        return;
      }

      pushHistory(`Embarque de ${CHARACTERS[id].name}`);
      soundManager.playBoard();

      const newCharacters = {
        ...characters,
        [id]: {
          ...charState,
          onRaft: true,
        },
      };

      setCharacters(newCharacters);
    }
  };

  // Sail Raft across River
  // Rules are evaluated ONLY when requesting the raft to cross the river!
  const handleSail = () => {
    if (isSailing) return;

    // 1. Check if raft has passengers
    const raftPassengers = (Object.keys(characters) as CharacterId[]).filter(
      (id) => characters[id].onRaft
    );

    if (raftPassengers.length === 0) {
      soundManager.playViolation();
      setWrongAttemptsCount((prev) => prev + 1);
      setCurrentViolation({
        ruleNumber: 5,
        title: 'Jangada Vazia',
        message: 'A jangada está vazia! Embarque pelo menos uma pessoa capaz de conduzir (Pai, Mãe ou Policial).',
        location: 'Jangada',
        violatorIds: [],
        targetIds: [],
      });
      return;
    }

    // 2. Check if raft has a valid pilot (Father, Mother, or Police)
    const hasPilot = raftPassengers.some(
      (id) => id === 'father' || id === 'mother' || id === 'police'
    );
    if (!hasPilot) {
      soundManager.playViolation();
      setWrongAttemptsCount((prev) => prev + 1);
      setCurrentViolation({
        ruleNumber: 5,
        title: 'Sem Condutor Válido',
        message: 'Só o policial e os pais podem conduzir a jangada! Crianças e prisioneira não sabem navegar sozinhas.',
        location: 'Jangada',
        violatorIds: raftPassengers,
        targetIds: [],
      });
      return;
    }

    // 3. Check current state rules (shore left behind or raft itself)
    const currentRules = evaluateAllRules(characters);
    if (currentRules.length > 0) {
      soundManager.playViolation();
      setWrongAttemptsCount((prev) => prev + 1);
      setCurrentViolation(currentRules[0]);
      return;
    }

    // 4. Check destination bank when raft arrives with these passengers
    const nextBank: Bank = raftBank === 'left' ? 'right' : 'left';
    const simulatedArrivalCharacters = { ...characters };
    (Object.keys(simulatedArrivalCharacters) as CharacterId[]).forEach((id) => {
      if (simulatedArrivalCharacters[id].onRaft) {
        simulatedArrivalCharacters[id] = {
          ...simulatedArrivalCharacters[id],
          bank: nextBank,
        };
      }
    });

    const arrivalViolations = evaluateAllRules(simulatedArrivalCharacters);
    if (arrivalViolations.length > 0) {
      soundManager.playViolation();
      setWrongAttemptsCount((prev) => prev + 1);
      setCurrentViolation(arrivalViolations[0]);
      return;
    }

    // All rules passed! Clear any violation and execute the crossing
    setCurrentViolation(null);
    pushHistory('Travessia do Rio');
    soundManager.playSail();
    setIsSailing(true);

    setCharacters(simulatedArrivalCharacters);
    setRaftBank(nextBank);
    setMovesCount((prev) => prev + 1);

    // After raft crossing animation settles (1000ms)
    setTimeout(() => {
      setIsSailing(false);

      // Check victory: all 8 people successfully reached the right bank!
      if (checkVictory(simulatedArrivalCharacters)) {
        // Disembark everyone to the right bank shore to celebrate
        const finalCharacters = { ...simulatedArrivalCharacters };
        (Object.keys(finalCharacters) as CharacterId[]).forEach((id) => {
          finalCharacters[id] = { ...finalCharacters[id], onRaft: false, bank: 'right' };
        });
        setCharacters(finalCharacters);
        setIsTimerRunning(false);
        setIsWon(true);
        soundManager.playVictory();
      }
    }, 1000);
  };

  // Open Hint
  const handleOpenHint = () => {
    soundManager.playClick();
    setHintsUsedCount((prev) => prev + 1);
    const leftList = (Object.keys(characters) as CharacterId[]).filter(
      (id) => characters[id].bank === 'left'
    );
    const rightList = (Object.keys(characters) as CharacterId[]).filter(
      (id) => characters[id].bank === 'right'
    );

    const step = findNextOptimalStep(raftBank, leftList, rightList);
    setHintStep(step);
    setShowHintModal(true);
  };

  // Apply Hint to Raft
  const handleApplyHint = (passengers: CharacterId[]) => {
    soundManager.playClick();
    // Move all current passengers off raft
    const updated = { ...characters };
    (Object.keys(updated) as CharacterId[]).forEach((id) => {
      if (updated[id].onRaft) {
        updated[id] = {
          ...updated[id],
          onRaft: false,
          bank: raftBank,
        };
      }
    });

    // Board suggested passengers
    passengers.forEach((id) => {
      updated[id] = {
        ...updated[id],
        onRaft: true,
        bank: raftBank,
      };
    });

    setCharacters(updated);
    setCurrentViolation(null);
  };

  const raftPassengersCount = Object.values(characters).filter((c) => c.onRaft).length;
  const canSail = raftPassengersCount > 0 && !isSailing;

  const stats = calculateLogicStats(
    movesCount,
    hintsUsedCount,
    wrongAttemptsCount,
    undosCount,
    restartsCount,
    accumulatedPastMoves,
    accumulatedPastHints,
    accumulatedPastWrong,
    accumulatedPastUndos
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* Top Header */}
      <GameHeader
        timerSeconds={timerSeconds}
        movesCount={movesCount}
        canUndo={history.length > 0 && !isSailing}
        soundEnabled={soundEnabled}
        isWon={isWon}
        studentName={studentName}
        stats={stats}
        onUndo={handleUndo}
        onRestart={handleRestart}
        onToggleSound={handleToggleSound}
        onOpenRules={() => {
          soundManager.playClick();
          setShowRulesModal(true);
        }}
        onOpenHint={handleOpenHint}
        onOpenStats={() => {
          soundManager.playClick();
          setShowStatsModal(true);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {!started ? (
          <StartScreen
            studentName={studentName}
            onStudentNameChange={handleStudentNameChange}
            onStart={handleStartGame}
          />
        ) : (
          <RiverBoard
            characters={characters}
            raftBank={raftBank}
            isSailing={isSailing}
            onCharacterClick={handleCharacterClick}
            onSail={handleSail}
            canSail={canSail}
            currentViolation={currentViolation}
            hintPassengers={hintStep ? hintStep.passengers : []}
          />
        )}
      </main>

      {/* Comic Violation Banner Alert */}
      <ViolationBanner
        violation={currentViolation}
        onDismiss={() => setCurrentViolation(null)}
        onUndo={handleUndo}
      />

      {/* Detailed Rules & Logic Modal */}
      <RulesModal
        isOpen={showRulesModal}
        onClose={() => setShowRulesModal(false)}
      />

      {/* Logic Hint Modal */}
      <HintModal
        isOpen={showHintModal}
        onClose={() => setShowHintModal(false)}
        hintStep={hintStep}
        onApplyHint={handleApplyHint}
      />

      {/* Intermediate Stats Modal */}
      <StatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        stats={stats}
        timerSeconds={timerSeconds}
        studentName={studentName}
      />

      {/* Victory Celebration Modal */}
      <VictoryModal
        isOpen={isWon}
        movesCount={movesCount}
        timerSeconds={timerSeconds}
        studentName={studentName}
        stats={stats}
        onStudentNameChange={handleStudentNameChange}
        onRestart={handleRestart}
        onNewStudent={handleNewStudent}
      />
    </div>
  );
}
