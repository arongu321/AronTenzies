import Die from './components/Die';
import { useState } from 'react';

export default function App() {
    const [dice, setDice] = useState(generateAllNewDice());
    function generateAllNewDice() {
        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
        }));
    }

    const diceComponents = dice.map((item) => <Die value={item.value} />);

    function rollDice() {
        setDice(generateAllNewDice());
    }
    return (
        <main>
            <div className="dice-container">{diceComponents}</div>
            <button onClick={rollDice} className="roll-btn">
                Roll
            </button>
        </main>
    );
}
