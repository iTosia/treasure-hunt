import { useState, useRef } from "react";
import mapImg from "./assets/map.png";
import audioFile from "./assets/mission_complete.mp3";

function App() {
    const mapRef = useRef(null);
    const audioRef = useRef(null);

    const [treasure, setTreasure] = useState(null);
    const [hint, setHint] = useState("Try to find the treasure!");
    const [clicks, setClicks] = useState(0);
    const [found, setFound] = useState(false);
    const [showResult, setShowResult] = useState(false);
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
            setShowResult(true);
        } else if (distance < 50) {
            setHint("Very hot 🔥");
        } else if (distance < 120) {
            setHint("Warm 🌡️");
        } else {
            setHint("Cold ❄️");
        }
    };

    const handleOk = () => {
        if (!bestScore || clicks < bestScore) {
            setBestScore(clicks);
            localStorage.setItem("bestScore", clicks);
        }
        setShowResult(false);
        setShowMission(true);
        audioRef.current.play();
        setTimeout(() => {
            setShowMission(false);
        }, 3000);
    };

    const handleRestart = () => {
        if (mapRef.current) {
            const { width, height } = mapRef.current.getBoundingClientRect();
            setTreasure(generateTreasure(width, height));
        }
        setClicks(0);
        setHint("Try to find the treasure!");
        setFound(false);
        setShowResult(false);
        setShowMission(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                Treasure Hunt
            </h1>
            <p className="mb-2 text-center text-sm md:text-base">Hint: {hint}</p>
            <p className="mb-2 text-center text-sm md:text-base">Clicks: {clicks}</p>
            {bestScore && (
                <p className="mb-4 text-green-400 text-sm md:text-base text-center">
                    Best score: {bestScore} clicks
                </p>
            )}

            <div className="relative w-full max-w-3xl">
                <img
                    ref={mapRef}
                    src={mapImg}
                    alt="map"
                    onClick={handleClick}
                    onLoad={handleMapLoad}
                    className="w-full h-auto border-4 border-yellow-500 cursor-crosshair rounded"
                />
            </div>

            <button
                onClick={handleRestart}
                className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition text-sm md:text-base"
            >
                Play Again
            </button>

            {showResult && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 px-4">
                    <div className="bg-white text-black p-6 rounded-lg text-center shadow-lg w-full max-w-sm">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">
                            You found the treasure! 🎉
                        </h2>
                        <p className="mb-4 text-sm md:text-base">Clicks used: {clicks}</p>
                        <button
                            onClick={handleOk}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm md:text-base"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {showMission && (
                <div className="mission-overlay flex flex-col items-center">
                    <h1 className="mission-title text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                        Mission Completed
                    </h1>
                    <h2 className="mission-text text-xl sm:text-2xl md:text-4xl lg:text-5xl mt-2">
                        + RESPECT
                    </h2>
                </div>
            )}

            <audio ref={audioRef} src={audioFile}/>
        </div>
    );
}

export default App;
