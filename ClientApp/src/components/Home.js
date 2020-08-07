import React from 'react';
import { useState } from 'react';

export function Home() {
    const [gameData, setGameData] = useState({
        numPlayers: 1,
        numRounds: 52,
        players: [],
    });

    const [newPlayer, setNewPlayer] = useState("");

    function handleAddPlayer() {
        let player = {
            name: newPlayer,
            score: 0
        }
        gameData.players.push(player);
        setGameData({
            numPlayers: gameData.numPlayers+1,
            numRounds: getNumRounds(gameData.numPlayers+1),
            players: gameData.players
        })
    }

    function handleRemovePlayer() {
        gameData.players.pop();
        setGameData({
            numPlayers: gameData.numPlayers-1,
            numRounds: getNumRounds(gameData.numPlayers-1),
            players: gameData.players
        })
    }

    return (
        <div>
            <input 
                type="text" 
                onChange={(event) => setNewPlayer(event.target.value)}
                value={newPlayer}/>

            <p>number of players: {gameData.numPlayers}</p>
            <p>number of rounds: {gameData.numRounds}</p>
            <input 
                type="button" 
                onClick={() => handleAddPlayer()} 
                disabled={numPlayersTooHigh(gameData.numPlayers)}
                value="add player"/>
            <input 
                type="button"
                onClick={() => handleRemovePlayer()}
                disabled={numPlayersTooLow(gameData.numPlayers)}
                value="remove player"/>
            <div>
                {renderGameBoard(gameData)}
            </div>
        </div>
    )
}

function numPlayersTooHigh(numPlayers) {
    if(numPlayers === 15)
    {
        return true;
    }
    else
    {
        return false;
    }   
}

function numPlayersTooLow(numPlayers) {
    if(numPlayers === 1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function renderCells(gameData, i) {
    return (
        gameData.players.map((player) =>
            <td key={gameData.players.indexOf(player)}>
                {player.name}
            </td>
        )
    )
}

function renderRows(gameData) {
    let html = [];
    for (var i = 1; i <= gameData.numRounds; i++) {
        html.push(
            <tr key={i}>
                <td>round {i}</td>
                {renderCells(gameData, i)}
            </tr>
        )
    }
    return html;
}

function renderGameBoard(gameData) {
    let html;
    if (gameData.players.length > 0) {
        html = <table className="table">
                    <thead className="thead"> 
                        <tr>
                            <th></th>
                            {gameData.players.map((player) =>
                                <th key={gameData.players.indexOf(player) + "head"}>{player.name}</th>    
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows(gameData)}
                    </tbody>
                </table>
    }
    return (html)
}

function getNumRounds(numPlayers) {
    let numRounds = Math.floor(52/numPlayers);
    return numRounds;
}
