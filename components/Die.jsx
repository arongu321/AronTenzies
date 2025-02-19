export default function Die(props) {
    return (
        <button
            {...(props.isHeld ? { 'is-held': 'true' } : {})}
            className="die-component"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}
