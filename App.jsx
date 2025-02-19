import Die from './components/Die';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';

export default function App() {
    // () => generateAllNewDice() is lazy state initialization so the state isn't regenerated again
    const [dice, setDice] = useState(() => generateAllNewDice());
    function generateAllNewDice() {
        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        }));
    }

    const hold = (id) =>
        setDice((prevDice) =>
            prevDice.map((item) =>
                item.id === id ? { ...item, isHeld: !item.isHeld } : item
            )
        );
    const diceComponents = dice.map((item) => (
        <Die
            key={item.id}
            onClick={() => hold(item.id)}
            isHeld={item.isHeld}
            value={item.value}
        />
    ));

    function rollDice() {
        setDice((prevDice) =>
            prevDice.map((item) =>
                item.isHeld
                    ? item
                    : {
                          ...item,
                          value: Math.ceil(Math.random() * 6),
                      }
            )
        );
    }

    function newGame() {
        setDice(generateAllNewDice());
    }

    const gameWon =
        dice.every((item) => item.isHeld) &&
        dice.every((item) => item.value === dice[0].value);

    return (
        <main>
            {gameWon && <ReactConfetti />}
            <header className="header">
                <h1 className="title">Tenzies</h1>
                <p>
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
            </header>
            <div className="dice-container">{diceComponents}</div>
            <button onClick={gameWon ? newGame : rollDice} className="roll-btn">
                {gameWon ? 'New Game' : 'Roll'}
            </button>
        </main>
    );
}
