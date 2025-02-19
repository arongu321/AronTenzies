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
            isHeld: true,
            id: nanoid(),
        }));
    }

    const hold = (id) => console.log(id);
    const diceComponents = dice.map((item) => (
        <Die
            key={item.id}
            onClick={() => hold(item.id)}
            isHeld={item.isHeld}
            value={item.value}
        />
    ));

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
