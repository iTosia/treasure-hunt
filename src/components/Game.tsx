'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useTreasureHunt } from "../hooks/useTreasureHunt";
import AuthHUD from "./AuthHUD";
import LeaderboardModal from "./LeaderboardModal";

const mapImg = "/assets/map.png";
const audioFile = "/assets/mission_complete.mp3";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const Game: React.FC = () => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const rippleIdRef = useRef(0);
    const {
        mapRef,
        audioRef,
        isLoading,
        hint,
        clicks,
        hintState,
        showResult,
        modalClosing,
        showMissionCompleted,
        bestScore,
        isSubmitting,
        handleMapLoad,
        handleClick,
        handleModalAnimationEnd,
        handleOk,
        handleRestart,
    } = useTreasureHunt();

    const handleMapClick = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
        // Add ripple effect
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = ++rippleIdRef.current;
        setRipples((prev) => [...prev, { id, x, y }]);
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);

        handleClick(e);
    }, [handleClick]);

    const toggleMute = () => {
        setIsMuted((prev) => {
            const newMuted = !prev;
            if (audioRef.current) {
                audioRef.current.muted = newMuted;
            }
            return newMuted;
        });
    };

    return (
        <div className="game-wrapper">
            <AuthHUD />
            <div className="game-bg-overlay" />

            <div className="game-content flex flex-col items-center justify-center min-h-screen p-4">
                <header className="game-header mb-6">
                    <span className="header-decoration">⚓</span>
                    <h1 className="game-title">Treasure Hunt</h1>
                    <span className="header-decoration">⚓</span>
                </header>

                <div className={`hint-container mb-3 px-5 py-2 rounded-lg border ${hintState}`}>
                    <p className="text-center text-sm md:text-base font-semibold">
                        <span className="hint-label">Hint:</span> {hint}
                    </p>
                </div>

                <div className="game-stats mb-4">
                    <div className="stat-item">
                        <span className="stat-label">Clicks</span>
                        <span className="stat-value">{clicks}</span>
                    </div>
                    {bestScore && (
                        <>
                            <div className="stat-divider" />
                            <div className="stat-item best">
                                <span className="stat-label">Best</span>
                                <span className="stat-value">{bestScore}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="map-container w-full max-w-3xl">
                    <div className="map-click-wrapper">
                        <img
                            ref={mapRef}
                            src={mapImg}
                            alt="map"
                            onClick={handleMapClick}
                            onLoad={handleMapLoad}
                        />
                        {ripples.map((ripple) => (
                            <span
                                key={ripple.id}
                                className="map-ripple"
                                style={{ left: ripple.x, top: ripple.y }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={handleRestart} className="play-again-btn mt-6">
                        ↺ Play Again
                    </button>
                    <button
                        onClick={() => setShowLeaderboard(true)}
                        className="play-again-btn mt-6"
                    >
                        🏆 Leaderboard
                    </button>
                    <button
                        onClick={toggleMute}
                        className="play-again-btn mt-6"
                        title={isMuted ? "Unmute sound" : "Mute sound"}
                    >
                        {isMuted ? "🔇" : "🔊"}
                    </button>
                </div>
            </div>

            {showResult && (
                <div className={`result-overlay${modalClosing ? " closing" : ""}`}>
                    <div
                        className={`result-modal${modalClosing ? " closing" : ""}`}
                        onAnimationEnd={handleModalAnimationEnd}
                    >
                        <div className="modal-icon">💰</div>
                        <h2 className="modal-title">Treasure Found!</h2>
                        <p className="modal-subtitle">You discovered the treasure! 🎉</p>
                        <div className="modal-score">
                            <span className="modal-score-label">Clicks used</span>
                            <span className="modal-score-value">{clicks}</span>
                        </div>
                        <button
                            onClick={handleOk}
                            className="modal-ok-btn mt-6"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="btn-loading">
                                    <span className="btn-spinner" /> Submitting...
                                </span>
                            ) : (
                                "Collect Treasure"
                            )}
                        </button>
                    </div>
                </div>
            )}

            <LeaderboardModal
                isOpen={showLeaderboard}
                onClose={() => setShowLeaderboard(false)}
            />

            <div className={`mission-overlay flex flex-col items-center ${showMissionCompleted ? " visible" : ""}`}>
                <h1 className="mission-title">
                    Mission passed!
                </h1>
                <h2 className="mission-text">
                    RESPECT +
                </h2>
            </div>
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <div className="loading-spinner"></div>
                        <h2 className="loading-text">Loading Map...</h2>
                    </div>
                </div>
            )}

            <audio ref={audioRef} src={audioFile} />
        </div>
    );
}

export default Game;
