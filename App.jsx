import Die from './components/Die';
import { useState } from 'react';

export default function App() {
    const [diceArr, setDiceArr] = useState(generateAllNewDice());
    function generateAllNewDice() {
        return new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6));
    }

    const diceComponents = diceArr.map((val) => <Die value={val} />);

    function rollDice() {
        setDiceArr(generateAllNewDice());
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
