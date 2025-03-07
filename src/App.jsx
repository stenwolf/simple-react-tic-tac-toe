import { useState } from "react";
import { WINNING_COMBINATIONS, INITIAL_BOARD, PLAYERS } from './constants'
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

function deriveActivePlayer(gameTurns) {
	let currentPlayer = 'X';
	if(gameTurns.length && gameTurns[0].player === 'X') {
		currentPlayer = 'O'
	}
	return currentPlayer;
}

function deriveGameBoard(gameTurns) {
	let gameBoard = [...INITIAL_BOARD.map(array => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }
	return gameBoard;
}

function deriveWinner(gameBoard, players) {
	for (const combo of WINNING_COMBINATIONS) {
		const firstSquareSymbol = gameBoard[combo[0].row][combo[0].column];
		const secondSquareSymbol = gameBoard[combo[1].row][combo[1].column];
		const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].column];

		if(firstSquareSymbol
			&& firstSquareSymbol === secondSquareSymbol
			&& firstSquareSymbol === thirdSquareSymbol) {
			winner = players[firstSquareSymbol];
		}
	}
	return winner;
}

function App() {
	const [players, setPlayers] = useState(PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);
	const activePlayer = deriveActivePlayer(gameTurns)
	const gameBoard = deriveGameBoard(gameTurns);
	const winner = deriveWinner(gameBoard, players)	
	const hasDraw = gameTurns.length === 9 && !winner

	const handleSelectSquare = (rowIndex, colIndex) => {
		setGameTurns(prevTurns => {
			const currentPlayer = deriveActivePlayer(prevTurns)
			const updatedTurns = [{
				square: {row: rowIndex, col: colIndex},
				player: currentPlayer
			}, ...prevTurns];

			return updatedTurns;
		});
	}
	
	const handleRematch = () => {
		setGameTurns([]);
	}

	const handlePlayerNameChange = (symbol, newName) => {
		setPlayers(prevPlayers => {
			return {
				...prevPlayers,
				[symbol]: newName
			}
		});
	}

	return (
		<main>
		<div id="game-container">
			<ol id="players" className="highlight-player">
				<Player initialName="Player 1"
					symbol="X"
					isActive={activePlayer === 'X'}
					onNameChange={handlePlayerNameChange}
				/>
				<Player initialName="Player 2"
					symbol="O"
					isActive={activePlayer === 'O'}
					onNameChange={handlePlayerNameChange}
				/>
			</ol>
			{(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
			<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
		</div>
		<Log turns={gameTurns} />
		</main>
	)
}

export default App
