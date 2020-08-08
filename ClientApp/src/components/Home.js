import React from 'react';
import { useState } from 'react';

export function Home() {
    const [gameData, setGameData] = useState({
        numPlayers: 0,
        numCards: 0,
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
            numCards: getNumCards(gameData.numPlayers+1),
            players: gameData.players
        })
    }
    function handleRemovePlayer() {

        gameData.players.pop();

        setGameData({
            numPlayers: gameData.numPlayers-1,
            numCards: getNumCards(gameData.numPlayers-1),
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
            <p>number of rounds: {gameData.numCards*2}</p>
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

function numPlayersTooLow(numPlayers) {
    if(numPlayers === 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function numPlayersTooHigh(numPlayers) {
    if(numPlayers === 12)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function renderCells(gameData, num) {
    return (
        gameData.players.map((player) =>
            <td key={gameData.players.indexOf(player)}>
                {renderDropDown(num)}
                {renderDropDown(num)}
            </td>
        )
    )
}
function renderDropDown(num) {
    let options = [];
    for (var i=0; i<=num; i++) {
        options.push(
            <option key={i}>{i}</option>
        )
    }
    return (
        <select className="form-control">
            {options}
        </select>
    )
}
function renderRows(gameData) {
    let html = [];
    let cardDealPattern = [];
    let round = 1;
    for (var i = 1; i <= gameData.numCards; i++) {
        cardDealPattern.push(i);
    }
    for (var j = gameData.numCards; j >= 1; j--) {
        cardDealPattern.push(j);
    }
    cardDealPattern.forEach((num) => {
        html.push(
            <tr key={round}>
                <td>round {round} ({num} cards)</td>
                {renderCells(gameData, num)}
            </tr>
        )
        round++;
    });
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

function getNumCards(numPlayers) {
    switch(numPlayers) {
        case 0: 
            return 0;
        case 1:
            return 0.5;
        default:
            let numCards = Math.floor(52/numPlayers);
            return numCards;
    }
}
