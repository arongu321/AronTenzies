export default function Die(props) {
    return (
        <button
            {...(props.isHeld ? { 'is-held': 'true' } : {})}
            className="die-component"
            onClick={props.onClick}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, is
            ${props.isHeld ? 'held' : 'not held'}`}
        >
            {props.value}
        </button>
    );
}
