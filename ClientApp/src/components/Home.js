import React from 'react';
import { useState } from 'react';
import { GameBoard } from './GameBoard'

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
            totalScore: 0,
            bids: [],
            tricks: [],
            scores: []
        }
        gameData.players.push(player);
        let newNumberOfCards = getNumCards(gameData.numPlayers+1);
        gameData.players.forEach((player) => {
            initScoringData(player, newNumberOfCards);
        });
        setGameData({
            numPlayers: gameData.numPlayers+1,
            numCards: newNumberOfCards,
            players: gameData.players
        })
    }
    function handleRemovePlayer() {
        gameData.players.pop();
        let newNumberOfCards = getNumCards(gameData.numPlayers-1);
        gameData.players.forEach((player) => {
            initScoringData(player, newNumberOfCards);
        });
        setGameData({
            numPlayers: gameData.numPlayers-1,
            numCards: newNumberOfCards,
            players: gameData.players
        })
    }
    function initScoringData(player, numCards) {
        player.bids = [];
        player.tricks = [];
        player.scores = [];
        for (var i=1; i<=(numCards*2); i++) {
            player.bids.push(0);
            player.tricks.push(0);
            player.scores.push(0);
        }
    }
    function numPlayersTooLow() {
        if(gameData.numPlayers === 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    function numPlayersTooHigh() {
        if(gameData.numPlayers === 12)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    function getNumCards(numPlayers) {
        switch(numPlayers) {
            case 0: 
                return 0;
            case 1:
                return 0.5;
            default:
                let numCards = Math.floor(52/(numPlayers));
                return numCards;
        }
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
                {GameBoard(gameData)}
            </div>
        </div>
    )
}


