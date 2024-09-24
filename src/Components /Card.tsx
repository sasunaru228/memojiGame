import React, {ReactElement} from 'react'
import classes from './../Main.module.css'
import ReactCardFlip from 'react-card-flip'

interface CardProps{
    index: number,
    value: string,
    matched: number[],
    flipped: number[],
    handleClick: Function,
}

function Card({index, value, flipped, matched, handleClick}: CardProps): ReactElement {
    let classNameCard: string = classes.card
    if (flipped.includes(index)) {
        classNameCard = classNameCard + ' ' + classes.cardFlipped
    }
    if (matched.includes(index)) {
        classNameCard = classNameCard + ' ' + classes.cardMatched
    }
    return (
        <ReactCardFlip
            isFlipped={flipped.includes(index) || matched.includes(index)}
            flipDirection="horizontal"
            flipSpeedBackToFront={0.4}
            flipSpeedFrontToBack={0.4}
        >
            <div
                className={classes.cardBack}
                onClick={() => {
                    handleClick(index)
                }}
            >
            </div>
            <div className={classNameCard}>
                <span>{value}</span>
            </div>
        </ReactCardFlip>
    )
}


export default Card;