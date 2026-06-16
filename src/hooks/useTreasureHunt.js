import { useState, useRef } from 'react';
import { calculateDistance, getHintForDistance } from '../utils/gameLogic';

export function useTreasureHunt() {
  const mapRef = useRef(null);
  const audioRef = useRef(null);
  const afterModalClose = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [treasure, setTreasure] = useState(null);
  const [hint, setHint] = useState("Try to find the treasure!");
  const [clicks, setClicks] = useState(0);
  const [found, setFound] = useState(false);
  const [hintState, setHintState] = useState("normal");
  const [showResult, setShowResult] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [showMissionCompleted, setShowMissionCompleted] = useState(false);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore") || null
  );

  function generateTreasure(width, height) {
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

  const handleClick = (e) => {
    if (found || !treasure) return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const distance = calculateDistance(x, y, treasure.x, treasure.y);

    setClicks((prev) => prev + 1);

    const { text, state, isFound } = getHintForDistance(distance);
    setHint(text);
    setHintState(state);
    setFound(isFound);
    if (isFound) {
      setShowResult(true);
    }
  };

  const closeModal = (callback) => {
    afterModalClose.current = callback;
    setModalClosing(true);
  };

  const handleModalAnimationEnd = (e) => {
    if (e.currentTarget === e.target && modalClosing) {
      setShowResult(false);
      setModalClosing(false);
      if (afterModalClose.current) {
        afterModalClose.current();
        afterModalClose.current = null;
      }
    }
  };

  const handleOk = () => {
    closeModal(() => {
      if (!bestScore || clicks < parseInt(bestScore)) {
        setBestScore(clicks);
        localStorage.setItem("bestScore", clicks);
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
  };
}
