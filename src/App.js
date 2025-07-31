import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Dice3D from "./components/Dice3D";

function App() {
    const [value, setValue] = useState(1);
    const [history, setHistory] = useState([]);

    // Charger l'historique au démarrage
    useEffect(() => {
        const savedHistory = localStorage.getItem("diceHistory");
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Sauvegarder dans localStorage dès que l’historique change
    useEffect(() => {
        localStorage.setItem("diceHistory", JSON.stringify(history));
    }, [history]);

    const rollDice = () => {
        const newValue = Math.floor(Math.random() * 6) + 1;
        setValue(newValue);
        setHistory(prev => [...prev, newValue]);
    };

    const resetHistory = () => {
        setHistory([]);
        localStorage.removeItem("diceHistory");
    };

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Dé 3D 🎲</h1>

            <div style={{ height: "400px" }}>
                <Canvas camera={{ position: [5, 5, 5] }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <Dice3D value={value} />
                    <OrbitControls />
                    <Environment preset="sunset" />
                </Canvas>
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={rollDice} style={styles.button}>Lancer le 🎲</button>
                <button onClick={resetHistory} style={styles.reset}>Reset</button>
            </div>

            <h2 style={{ textAlign: "center" }}>Historique :</h2>
            <ul style={styles.history}>
                {history.map((val, idx) => (
                    <li key={idx}>Lancer {idx + 1} : {val}</li>
                ))}
            </ul>
        </>
    );
}

const styles = {
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        marginRight: "10px",
        cursor: "pointer"
    },
    reset: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#c00",
        color: "#fff",
        border: "none",
        cursor: "pointer"
    },
    history: {
        textAlign: "center",
        listStyle: "none",
        padding: 0
    }
};

export default App;
