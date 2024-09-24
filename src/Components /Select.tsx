import React, {ReactElement} from 'react';
import classes from './../Main.module.css'

function Select({handleChange}: {handleChange: Function}): ReactElement {
    return (
        <div>
            <select
                className={classes.select}
                onChange={(e) => handleChange(e.target.value)}
            >
                <option value={12}>12 cells</option>
                <option value={16}>16 cells</option>
                <option value={20}>20 cells</option>
            </select>
        </div>
    )
}


export default Select;