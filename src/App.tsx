import React, { useState, useEffect, useCallback } from 'react';
import {
  CharacterId,
  CharacterState,
  CharacterStateMap,
  Bank,
  RuleViolation,
  GameSnapshot,
  GamePhase,
  ClassicSubtheme,
} from './types/game';
import { getInitialCharactersState, getCharacterDef } from './utils/characters';
import { evaluateAllRules, checkVictory } from './utils/rules';
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
import { calculateLogicStats, getIdealMovesForPhase } from './utils/stats';

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('wolf');
  const [classicSubtheme, setClassicSubtheme] = useState<ClassicSubtheme>('teams');
  const [started, setStarted] = useState(false);
  const [raftBank, setRaftBank] = useState<Bank>('left');
  const [characters, setCharacters] = useState<CharacterStateMap>(() =>
    getInitialCharactersState('wolf')
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

  // Student identification state
  const [studentName, setStudentName] = useState(() => {
    try {
      return localStorage.getItem('logic_challenges_student_name') || localStorage.getItem('japanese_river_student_name') || '';
    } catch (_) {
      return '';
    }
  });

  const handleStudentNameChange = (name: string) => {
    setStudentName(name);
    try {
      localStorage.setItem('logic_challenges_student_name', name);
    } catch (_) {}
  };

  // Timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
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

  // Restart current phase (Maintains session metrics)
  const handleRestart = () => {
    soundManager.playClick();

    setRestartsCount((prev) => prev + 1);
    setAccumulatedPastMoves((prev) => prev + movesCount);
    setAccumulatedPastHints((prev) => prev + hintsUsedCount);
    setAccumulatedPastWrong((prev) => prev + wrongAttemptsCount);
    setAccumulatedPastUndos((prev) => prev + undosCount);

    setRaftBank('left');
    setCharacters(getInitialCharactersState(phase));
    setIsSailing(false);
    setMovesCount(0);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setCurrentViolation(null);
    setHistory([]);
    setIsWon(false);
    setHintStep(null);
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

    setRaftBank('left');
    setCharacters(getInitialCharactersState(phase));
    setIsSailing(false);
    setMovesCount(0);
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setCurrentViolation(null);
    setHistory([]);
    setIsWon(false);
    setHintStep(null);
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
    setHintStep(null);
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  // Select / Switch Game Phase (resets board & phase metrics cleanly)
  const handleSelectPhase = (newPhase: GamePhase) => {
    soundManager.playClick();
    setPhase(newPhase);
    setRaftBank('left');
    setCharacters(getInitialCharactersState(newPhase));
    setIsSailing(false);
    setMovesCount(0);
    setTimerSeconds(0);
    setIsTimerRunning(started);
    setCurrentViolation(null);
    setHistory([]);
    setIsWon(false);
    setHintStep(null);
    setHintsUsedCount(0);
    setWrongAttemptsCount(0);
    setUndosCount(0);
    setRestartsCount(0);
    setAccumulatedPastMoves(0);
    setAccumulatedPastHints(0);
    setAccumulatedPastWrong(0);
    setAccumulatedPastUndos(0);
  };

  // Character Click (Embark / Disembark)
  const handleCharacterClick = (id: CharacterId) => {
    if (isSailing) return;

    setCurrentViolation(null);
    setHintStep(null);

    const charState = characters[id];
    if (!charState) return;

    const charDef = getCharacterDef(id, phase, classicSubtheme);
    const charName = charDef.name;
    const craftName = phase === 'space' ? 'cápsula' : phase === 'wolf' ? 'barco' : 'jangada';

    if (charState.onRaft) {
      pushHistory(`Desembarque de ${charName}`);
      soundManager.playStepOff();

      const newCharacters: CharacterStateMap = {
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
      if (charState.bank !== raftBank) {
        return;
      }

      const currentRaftCount = (Object.values(characters) as (CharacterState | undefined)[]).filter(
        (c) => c?.onRaft
      ).length;

      if (currentRaftCount >= 2) {
        soundManager.playViolation();
        setCurrentViolation({
          ruleNumber: 1,
          title: phase === 'space' ? 'Cápsula Lotada' : phase === 'wolf' ? 'Barco Lotado' : 'Jangada Lotada',
          message:
            phase === 'space'
              ? 'Protocolo de Vácuo: No máximo dois tripulantes podem viajar na cápsula pressurizada ao mesmo tempo!'
              : phase === 'wolf'
              ? 'O barco suporta no máximo 2 ocupantes por viagem (o Fazendeiro e mais 1 item)!'
              : 'No máximo duas pessoas podem estar na jangada ao mesmo tempo!',
          location: phase === 'space' ? 'Cápsula' : phase === 'wolf' ? 'Barco' : 'Jangada',
          violatorIds: [id],
          targetIds: [],
        });
        return;
      }

      pushHistory(`Embarque de ${charName} no(a) ${craftName}`);
      soundManager.playBoard();

      const newCharacters: CharacterStateMap = {
        ...characters,
        [id]: {
          ...charState,
          onRaft: true,
        },
      };

      setCharacters(newCharacters);
    }
  };

  // Sail Raft / Boat / Pod across channel
  const handleSail = () => {
    if (isSailing) return;

    const raftPassengers = (Object.keys(characters) as CharacterId[]).filter(
      (id) => characters[id]?.onRaft
    );

    if (raftPassengers.length === 0) {
      soundManager.playViolation();
      setWrongAttemptsCount((prev) => prev + 1);
      setCurrentViolation({
        ruleNumber: phase === 'wolf' ? 4 : 5,
        title: phase === 'space' ? 'Cápsula Vazia' : phase === 'wolf' ? 'Barco Vazio' : 'Jangada Vazia',
        message:
          phase === 'space'
            ? 'A cápsula está vazia! Embarque pelo menos um tripulante autorizado (Comandante, Engenheira ou Androide Unit-7).'
            : phase === 'wolf'
            ? 'O barco está vazio! Embarque o Fazendeiro (com ou sem um item) para remar até a outra margem.'
            : classicSubtheme === 'teams'
            ? 'A jangada está vazia! Embarque pelo menos um condutor com brevê (Mentor Carlos, Mentora Beatriz ou Fiscal Marcos).'
            : 'A jangada está vazia! Embarque pelo menos uma pessoa capaz de conduzir (Pai, Mãe ou Policial).',
        location: phase === 'space' ? 'Cápsula' : phase === 'wolf' ? 'Barco' : 'Jangada',
        violatorIds: [],
        targetIds: [],
      });
      return;
    }

    const hasPilot =
      phase === 'wolf'
        ? raftPassengers.some((id) => id === 'farmer')
        : raftPassengers.some((id) => id === 'father' || id === 'mother' || id === 'police');

    if (!hasPilot) {
      soundManager.playViolation();
      setWrongAttemptsCount((prev) => prev + 1);
      setCurrentViolation({
        ruleNumber: phase === 'wolf' ? 4 : 5,
        title:
          phase === 'space'
            ? 'Sem Piloto Autorizado'
            : phase === 'wolf'
            ? 'Sem Remador no Barco'
            : classicSubtheme === 'teams'
            ? 'Sem Condutor Habilitado'
            : 'Sem Condutor Válido',
        message:
          phase === 'space'
            ? 'Apenas o Comandante Silva, Engenheira Elena e o Androide Unit-7 possuem biometria de voo!'
            : phase === 'wolf'
            ? 'Apenas o Fazendeiro sabe remar o barco! O Lobo, o Cordeiro e a Alface não podem atravessar sozinhos.'
            : classicSubtheme === 'teams'
            ? 'Apenas os Mentores (Carlos e Beatriz) e o Fiscal Marcos possuem habilitação náutica e brevê para pilotar a jangada! Alunos e a competidora detida não sabem conduzir sozinhos.'
            : 'Só o policial e os pais podem conduzir a jangada! Crianças e prisioneira não sabem navegar sozinhas.',
        location: phase === 'space' ? 'Cápsula' : phase === 'wolf' ? 'Barco' : 'Jangada',
        violatorIds: raftPassengers,
        targetIds: [],
      });
      return;
    }

    // Check current state rules (shore left behind or vessel itself)
    const currentRules = evaluateAllRules(characters, phase, classicSubtheme);
    if (currentRules.length > 0) {
      soundManager.playViolation();
      setWrongAttemptsCount((prev) => prev + 1);
      setCurrentViolation(currentRules[0]);
      return;
    }

    // Check destination bank when craft arrives with these passengers
    const nextBank: Bank = raftBank === 'left' ? 'right' : 'left';
    const simulatedArrivalCharacters: CharacterStateMap = { ...characters };
    (Object.keys(simulatedArrivalCharacters) as CharacterId[]).forEach((id) => {
      const state = simulatedArrivalCharacters[id];
      if (state?.onRaft) {
        simulatedArrivalCharacters[id] = {
          ...state,
          bank: nextBank,
        };
      }
    });

    const arrivalViolations = evaluateAllRules(simulatedArrivalCharacters, phase, classicSubtheme);
    if (arrivalViolations.length > 0) {
      soundManager.playViolation();
      setWrongAttemptsCount((prev) => prev + 1);
      setCurrentViolation(arrivalViolations[0]);
      return;
    }

    // All rules passed! Clear any violation and execute the crossing
    setCurrentViolation(null);
    setHintStep(null);
    pushHistory(
      phase === 'space'
        ? 'Voo de Trânsito Orbital'
        : phase === 'wolf'
        ? 'Travessia de Barco'
        : 'Travessia do Rio'
    );
    soundManager.playSail();
    setIsSailing(true);

    setCharacters(simulatedArrivalCharacters);
    setRaftBank(nextBank);
    setMovesCount((prev) => prev + 1);

    setTimeout(() => {
      setIsSailing(false);

      if (checkVictory(simulatedArrivalCharacters)) {
        const finalCharacters: CharacterStateMap = { ...simulatedArrivalCharacters };
        (Object.keys(finalCharacters) as CharacterId[]).forEach((id) => {
          const state = finalCharacters[id];
          if (state) {
            finalCharacters[id] = { ...state, onRaft: false, bank: 'right' };
          }
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
      (id) => characters[id]?.bank === 'left'
    );
    const rightList = (Object.keys(characters) as CharacterId[]).filter(
      (id) => characters[id]?.bank === 'right'
    );

    const step = findNextOptimalStep(raftBank, leftList, rightList, phase, classicSubtheme);
    setHintStep(step);
    setShowHintModal(true);
  };

  // Apply Hint to Craft
  const handleApplyHint = (passengers: CharacterId[]) => {
    soundManager.playClick();
    const updated: CharacterStateMap = { ...characters };
    (Object.keys(updated) as CharacterId[]).forEach((id) => {
      const state = updated[id];
      if (state?.onRaft) {
        updated[id] = {
          ...state,
          onRaft: false,
          bank: raftBank,
        };
      }
    });

    passengers.forEach((id) => {
      updated[id] = {
        onRaft: true,
        bank: raftBank,
      };
    });

    setCharacters(updated);
    setCurrentViolation(null);
  };

  const raftPassengersCount = (Object.values(characters) as (CharacterState | undefined)[]).filter(
    (c) => c?.onRaft
  ).length;
  const canSail = raftPassengersCount > 0 && !isSailing;
  const idealMoves = getIdealMovesForPhase(phase);

  const stats = calculateLogicStats(
    movesCount,
    hintsUsedCount,
    wrongAttemptsCount,
    undosCount,
    restartsCount,
    accumulatedPastMoves,
    accumulatedPastHints,
    accumulatedPastWrong,
    accumulatedPastUndos,
    idealMoves
  );

  const nextPhase: GamePhase =
    phase === 'wolf' ? 'classic' : phase === 'classic' ? 'space' : 'wolf';

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
        phase={phase}
        onSelectPhase={handleSelectPhase}
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
            phase={phase}
            onPhaseChange={handleSelectPhase}
            subtheme={classicSubtheme}
            onSubthemeChange={setClassicSubtheme}
            onStudentNameChange={handleStudentNameChange}
            onStart={handleStartGame}
          />
        ) : (
          <RiverBoard
            characters={characters}
            raftBank={raftBank}
            isSailing={isSailing}
            phase={phase}
            subtheme={classicSubtheme}
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
        phase={phase}
        subtheme={classicSubtheme}
        onClose={() => setShowRulesModal(false)}
      />

      {/* Logic Hint Modal */}
      <HintModal
        isOpen={showHintModal}
        phase={phase}
        subtheme={classicSubtheme}
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
        phase={phase}
        subtheme={classicSubtheme}
        onSelectNextPhase={() => handleSelectPhase(nextPhase)}
        onStudentNameChange={handleStudentNameChange}
        onRestart={handleRestart}
        onNewStudent={handleNewStudent}
      />
    </div>
  );
}
