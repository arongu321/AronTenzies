import Die from './components/Die';
import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';

export default function App() {
    // () => generateAllNewDice() is lazy state initialization so the state isn't regenerated again
    const [dice, setDice] = useState(() => generateAllNewDice());

    // React Hook to interact directly with New Game button for keyboard focus
    const buttonRef = useRef(null);

    // Used to create 10 random unheld dice
    function generateAllNewDice() {
        return new Array(10).fill(0).map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        }));
    }

    // Checks for game won condition where all dice are held and all dice values are the same
    const gameWon =
        dice.every((item) => item.isHeld) &&
        dice.every((item) => item.value === dice[0].value);

    // Add side effect to add keyboard focus(so user can press enter) when user wins Tenzies
    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus();
        }
    }, [gameWon]);

    // Used to toggle hold status on each dice
    const hold = (id) =>
        setDice((prevDice) =>
            prevDice.map((item) =>
                item.id === id ? { ...item, isHeld: !item.isHeld } : item
            )
        );

    // Create Dice components
    const diceComponents = dice.map((item) => (
        <Die
            key={item.id}
            toggleHold={() => hold(item.id)}
            isHeld={item.isHeld}
            value={item.value}
        />
    ));

    // Rolls any unheld dice for new values
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

    // Used to initialize new game
    function newGame() {
        setDice(generateAllNewDice());
    }

    return (
        <main>
            {/* Confetti drops when the user wins Tenzies */}
            {gameWon && <ReactConfetti />}

            {/* Only appears for screen readers */}
            <div aria-live="polite" className="sr-only">
                {gameWon && (
                    <p>
                        Congratulations! You won! Press "New Game" to start
                        again.
                    </p>
                )}
            </div>

            {/* Header */}
            <header className="header">
                <h1 className="title">Tenzies</h1>
                <p>
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
            </header>

            {/* Dice container */}
            <div className="dice-container">{diceComponents}</div>
            <button
                ref={buttonRef}
                onClick={gameWon ? newGame : rollDice}
                className="roll-btn"
            >
                {gameWon ? 'New Game' : 'Roll'}
            </button>
        </main>
    );
}
