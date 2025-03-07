import { useState } from "react";

export default function Player({initialName, symbol, isActive, onNameChange}) {
    const [ isEditing, setIsEditting ] = useState(false);
    const [playerName, setPlayerName] = useState(initialName)
    const clickEdit = () => {
        // updating state should pass a function instead of just a new state value
        setIsEditting((editing) => !editing);
        if (isEditing) {
            onNameChange(symbol, playerName)
        }
    }

    const handleChange = (event) => {
        setPlayerName(event.target.value)
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {
                    isEditing ? <input required value={playerName} onChange={handleChange}/>
                        : <span className='player-name'>{playerName}</span>
                }
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={clickEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}