import React from 'react';

export function DropDownCell(numCardsToDeal) {
    let options = [];
    for (var i=0; i<=numCardsToDeal; i++) {
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
