import React from 'react';
import { DropDownCell } from './DropDownCell'

export function BoardCells(gameData, numCardsToDeal, round) {
    let html = [];
    for (var i = 0; i<gameData.players.length; i++) {
        html.push(
            <td key={gameData.players.indexOf(gameData.players[i])}>
                <span>{gameData.players[i].bids[round-1]}/{gameData.players[i].tricks[round-1]}</span>
            </td>
        )
    }
    return html;
}