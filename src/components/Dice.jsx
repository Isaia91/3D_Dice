import React, { useState, useEffect } from "react";

const Dice = () => {
    const [value, setValue] = useState(1);
    const [history, setHistory] = useState([]);

    // Charger l'historique depuis le localStorage au premier rendu
    useEffect(() => {
        const savedHistory = localStorage.getItem("diceHistory");
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Mettre à jour le localStorage à chaque changement d'historique
    useEffect(() => {
        localStorage.setItem("diceHistory", JSON.stringify(history));
    }, [history]);

    const rollDice = () => {
        const newValue = Math.floor(Math.random() * 6) + 1;
        setValue(newValue);
        setHistory((prevHistory) => [...prevHistory, newValue]);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("diceHistory");
    };

    return (
        <div style={styles.container}>
            <div style={styles.dice}>{value}</div>
            <button onClick={rollDice} style={styles.button}>
                Lancer le 🎲
            </button>
            <button onClick={clearHistory} style={styles.clearButton}>
                Vider l'historique
            </button>
            <h3>Historique :</h3>
            <ul>
                {history.map((item, index) => (
                    <li key={index}>Lancer {index + 1} : {item}</li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        marginTop: "50px",
    },
    dice: {
        fontSize: "100px",
        margin: "20px auto",
        width: "120px",
        height: "120px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #333",
        borderRadius: "10px",
        backgroundColor: "#f4f4f4",
    },
    button: {
        padding: "10px 20px",
        fontSize: "18px",
        margin: "10px",
        cursor: "pointer",
    },
    clearButton: {
        padding: "10px 20px",
        fontSize: "18px",
        margin: "10px",
        backgroundColor: "#f88",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
};

export default Dice;
