import React from 'react';
import { useState } from 'react';

export function Home() {
    const [gameData, setGameData] = useState({
        numRounds: 0,
        numPlayers: 1,
        players: [],
    });

    const [newPlayer, setNewPlayer] = useState("");

    return (
        <div>
            <input 
                type="text" 
                id="playerName"
                onChange={(event) => setNewPlayer(event.target.value)}
                value={newPlayer}/>

            <p>number of players: {gameData.numPlayers}</p>
            <p>number of rounds: {gameData.numRounds}</p>
            <ul>
                {gameData.players.map((player =>
                    <li>{player}</li>   
                ))}
            </ul>
            <input 
                type="button" 
                onClick={() => setGameData({
                        numPlayers: gameData.numPlayers+1,
                        numRounds: getNumRounds(gameData.numPlayers),
                        players: addPlayer(gameData.players, newPlayer)
                    })} 
                value="add player"/>
            <input 
                type="button"
                onClick={() => setGameData({
                        numPlayers: gameData.numPlayers-1,
                        numRounds: getNumRounds(gameData.numPlayers)
                    })}
                value="remove player"/>
        </div>
    )
}

function renderGameBoard(gameData) {
    return (
        <table>
            <thead>
                {gameData.players.map((player) =>
                    <td>{player.name}</td>    
                )}
            </thead>
            <tbody>
                
            </tbody>
        </table>
    )
}

function addPlayer(players, newPlayer) {
    let player = {
        name: newPlayer,
        score: 0
    }

    players.push(player);
    return players;
}
function getNumRounds(numPlayers) {
    let numRounds = Math.floor(52/numPlayers);
    return numRounds;
}
