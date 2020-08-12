import React from 'react';
import { BoardCells } from './BoardCells'

export function BoardRows(gameData) {
    let html = [];
    let cardDealPattern = [];
    let round = 1;
    for (var i = 1; i <= gameData.numCards; i++) {
        cardDealPattern.push(i);
    }
    for (var j = gameData.numCards; j >= 1; j--) {
        cardDealPattern.push(j);
    }
    cardDealPattern.forEach((numCardsToDeal) => {
        html.push(
            <tr key={round}>
                <td>{numCardsToDeal}</td>
                {BoardCells(gameData, numCardsToDeal, round)}
                <td>
                    <input type="button" value="edit"/>
                </td>
            </tr>
        )
        round++;
    });
    return html;
}