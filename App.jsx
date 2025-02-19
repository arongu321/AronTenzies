import Die from './components/Die';
import { useState } from 'react';
import { nanoid } from 'nanoid';

export default function App() {
    /**
     * Challenge: Create a function `hold` that takes
     * `id` as a parameter. For now, just have the function
     * console.log(id).
     *
     * Then, figure out how to pass that function down to each
     * instance of the Die component so when each one is clicked,
     * it logs its own unique ID property. (Hint: there's more
     * than one way to make that work, so just choose whichever
     * you want)
     */
    const [dice, setDice] = useState(generateAllNewDice());
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

    return (
        <main>
            <header className="header">
                <h1 className="title">Tenzies</h1>
                <p>
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
            </header>
            <div className="dice-container">{diceComponents}</div>
            <button onClick={rollDice} className="roll-btn">
                Roll
            </button>
        </main>
    );
}
