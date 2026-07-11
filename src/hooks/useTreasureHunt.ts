import { useState, useRef, useEffect } from 'react';
import { calculateDistance, getHintForDistance } from '../utils/gameLogic';
import { submitScore } from '../app/actions/leaderboard';
import { generateAIHint } from '../app/actions/aiHints';

interface Treasure {
  x: number;
  y: number;
}

interface UseTreasureHuntReturn {
  mapRef: React.RefObject<HTMLImageElement | null>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isLoading: boolean;
  treasure: Treasure | null;
  hint: string;
  clicks: number;
  found: boolean;
  hintState: string;
  showResult: boolean;
  modalClosing: boolean;
  showMissionCompleted: boolean;
  bestScore: string | number | null;
  handleMapLoad: () => void;
  handleClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  handleModalAnimationEnd: (e: React.AnimationEvent<HTMLDivElement>) => void;
  handleOk: () => void;
  handleRestart: () => void;
  isSubmitting: boolean;
}

export function useTreasureHunt(): UseTreasureHuntReturn {
  const mapRef = useRef<HTMLImageElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const afterModalClose = useRef<(() => void) | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [treasure, setTreasure] = useState<Treasure | null>(null);
  const [hint, setHint] = useState("Try to find the treasure!");
  const [clicks, setClicks] = useState(0);
  const [found, setFound] = useState(false);
  const [hintState, setHintState] = useState("normal");
  const [showResult, setShowResult] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [showMissionCompleted, setShowMissionCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bestScore, setBestScore] = useState<string | number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bestScore");
    if (saved !== null) {
      setBestScore(saved);
    }
  }, []);

  useEffect(() => {
    if (mapRef.current?.complete && mapRef.current.naturalWidth > 0) {
      handleMapLoad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateTreasure(width: number, height: number): Treasure {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
  }

  const handleMapLoad = () => {
    setIsLoading(false);
    if (mapRef.current) {
      const { width, height } = mapRef.current.getBoundingClientRect();
      setTreasure(generateTreasure(width, height));
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    if (found || !treasure) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const distance = calculateDistance(x, y, treasure.x, treasure.y);

    const newClicks = clicks + 1;
    setClicks(newClicks);

    const { text, state, isFound } = getHintForDistance(distance);
    setHint(text);
    setHintState(state);
    setFound(isFound);

    // Every 2nd click (and not found), call AI for a thematic pirate hint
    if (newClicks % 2 === 0 && !isFound) {
      const relativeX = x - treasure.x;
      const relativeY = y - treasure.y;
      const aiResult = await generateAIHint({
        distance,
        relativeX,
        relativeY,
        clicks: newClicks,
      });
      if (aiResult.success) {
        setHint(aiResult.hint);
      }
    }

    if (isFound) {
      setShowResult(true);
    }
  };

  const closeModal = (callback: () => void) => {
    afterModalClose.current = callback;
    setModalClosing(true);
  };

  const handleModalAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target && modalClosing) {
      setShowResult(false);
      setModalClosing(false);
      if (afterModalClose.current) {
        afterModalClose.current();
        afterModalClose.current = null;
      }
    }
  };

  const handleOk = async () => {
    closeModal(async () => {
      // Update Local Score
      if (!bestScore || clicks < parseInt(bestScore.toString())) {
        setBestScore(clicks);
        localStorage.setItem("bestScore", clicks.toString());
      }

      // Submit to Global Leaderboard if authenticated
      try {
        setIsSubmitting(true);
        await submitScore(clicks);
      } catch (e) {
        console.log("Score submission skipped or failed (likely not signed in)");
      } finally {
        setIsSubmitting(false);
      }

      setShowMissionCompleted(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
      setTimeout(() => setShowMissionCompleted(false), 4000);
    });
  };

  const doRestart = () => {
    if (mapRef.current) {
      const { width, height } = mapRef.current.getBoundingClientRect();
      setTreasure(generateTreasure(width, height));
    }
    setClicks(0);
    setHint("Try to find the treasure!");
    setFound(false);
    setShowMissionCompleted(false);
    setHintState("normal");
  };

  const handleRestart = () => {
    if (showResult) {
      closeModal(doRestart);
    } else {
      doRestart();
    }
  };

  return {
    mapRef,
    audioRef,
    isLoading,
    treasure,
    hint,
    clicks,
    found,
    hintState,
    showResult,
    modalClosing,
    showMissionCompleted,
    bestScore,
    handleMapLoad,
    handleClick,
    handleModalAnimationEnd,
    handleOk,
    handleRestart,
    isSubmitting,
  };
}
