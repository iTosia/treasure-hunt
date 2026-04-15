import { useState, useRef } from "react";
import mapImg from "./assets/map.png";
import audioFile from "./assets/mission_complete.mp3";

function App() {
    const mapRef = useRef(null);
    const audioRef = useRef(null);
    const afterModalClose = useRef(null);

    const [treasure, setTreasure] = useState(null);
    const [hint, setHint] = useState("Try to find the treasure!");
    const [clicks, setClicks] = useState(0);
    const [found, setFound] = useState(false);
    const [hintState, setHintState] = useState("normal");
    const [showResult, setShowResult] = useState(false);
    const [modalClosing, setModalClosing] = useState(false);
    const [showMission, setShowMission] = useState(false);
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

        const dx = x - treasure.x;
        const dy = y - treasure.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        setClicks((prev) => prev + 1);

        if (distance < 20) {
            setHint("Treasure found! 🎉");
            setFound(true);
            setHintState("found");
            setShowResult(true);
        } else if (distance < 50) {
            setHint("Very hot 🔥");
            setHintState("very-hot");
        } else if (distance < 120) {
            setHint("Warm 🌡️");
            setHintState("warm");
        } else {
            setHint("Cold ❄️");
            setHintState("normal");
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
            setShowMission(true);
            audioRef.current.play();
            setTimeout(() => setShowMission(false), 3000);
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
        setShowMission(false);
        setHintState("normal");
    };

    const handleRestart = () => {
        if (showResult) {
            closeModal(doRestart);
        } else {
            doRestart();
        }
    };

    return (
        <div className="game-wrapper">
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
                    <img
                        ref={mapRef}
                        src={mapImg}
                        alt="map"
                        onClick={handleClick}
                        onLoad={handleMapLoad}
                    />
                </div>

                <button onClick={handleRestart} className="play-again-btn mt-6">
                    ↺ Play Again
                </button>
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
                        <button onClick={handleOk} className="modal-ok-btn">
                            Collect Treasure
                        </button>
                    </div>
                </div>
            )}

            {showMission && (
                <div className="mission-overlay flex flex-col items-center">
                    <h1 className="mission-title text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                        Mission passed!
                    </h1>
                    <h2 className="mission-text text-xl sm:text-2xl md:text-4xl lg:text-5xl mt-2">
                        RESPECT +
                    </h2>
                </div>
            )}

            <audio ref={audioRef} src={audioFile} />
        </div>
    );
}

export default App;
