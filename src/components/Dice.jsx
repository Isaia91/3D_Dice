import React, { useState } from "react";

const Dice = () => {
    const [value, setValue] = useState(1);

    const rollDice = () => {
        const newValue = Math.floor(Math.random() * 6) + 1;
        setValue(newValue);
    };

    return (
        <div style={styles.container}>
            <div style={styles.dice}>{value}</div>
            <button onClick={rollDice} style={styles.button}>
                Roll 🎲
            </button>
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
        cursor: "pointer",
    },
};

export default Dice;
