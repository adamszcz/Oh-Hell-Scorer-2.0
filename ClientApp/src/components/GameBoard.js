import React from 'react';
import { BoardRows } from './BoardRows'

export function GameBoard(gameData) {
    let html;
    if (gameData.players.length > 0) {
        html = <table className="table">
                    <thead className="thead"> 
                        <tr>
                            <th># cards</th>
                            {gameData.players.map((player) =>
                                <th key={gameData.players.indexOf(player) + "head"}>{player.name}</th>    
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {BoardRows(gameData)}
                    </tbody>
                </table>
    }
    return (html)
}