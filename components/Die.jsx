export default function Die(props) {
    return (
        <button
            // Highlights held dice in green
            {...(props.isHeld ? { 'is-held': 'true' } : {})}
            // on click function is used to toggle hold status of dice
            className="die-component"
            onClick={props.toggleHold}
            // ARIA labels
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, is
            ${props.isHeld ? 'held' : 'not held'}`}
        >
            {props.value}
        </button>
    );
}
