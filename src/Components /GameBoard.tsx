import Card from "./Card";
import {useEffect, useState} from "react"
import classes from './../Main.module.css';
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '50%',
        padding: '0',
        margin: '0',
        border: 'none',
        borderRadius: '30px'
    }
};

interface GameBoardProps {
    cardQuantity: number
}
interface cardItem {
    index: number,
    value: string,
}

const emoji = ["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"]
    .sort(() => Math.random() - 0.5)

export default function GameBoard({cardQuantity}: GameBoardProps) {

    const [cards, setCards] = useState<cardItem[]>([])
    const [flippedCards, setFLippedCards] = useState<number[]>([])
    const [matchedCards, setMatchedCards] = useState<number[]>([])
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)


    function setGame() {
        setCards([])
        setMatchedCards([])
        setFLippedCards([])
        let gameModule: cardItem[] = []
        for (let i = 0; i < cardQuantity; i++) {
            let emojiNumber = i
            if (i % 2 === 1) {
                emojiNumber--
            }
            gameModule.push({index: i, value: emoji[emojiNumber]})
            gameModule.sort(() => Math.random() - 0.5)
        }
        setCards(gameModule)
    }
    useEffect(() => {
        setGame()
    }, [cardQuantity])

    function handleClickCard(index: number) {
        if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return
        setFLippedCards((prev) => [...prev, index])
        if (flippedCards.length === 1) {
            const firstIndex = flippedCards[0]
            const secondIndex = index
            if (cards[firstIndex].value === cards[secondIndex].value) {
                console.log('matched!')
                setMatchedCards([...matchedCards, firstIndex, secondIndex])
            }
            setTimeout(() => setFLippedCards([]), 1000)
        }
    }
    const restartGame = () => {
        setModalIsOpen(false)
        setGame()
    }

    useEffect(() => {
        if (matchedCards.length === cardQuantity) {
            setTimeout(() => setModalIsOpen(true), 2000)
        }
    }, [matchedCards, cardQuantity]);

    return (
        <div className={classes.gameBoard}>
            {cards.map((item, index) => {
                return (
                    <Card
                        value={item.value}
                        index={index}
                        matched={matchedCards}
                        flipped={flippedCards}
                        key={index}
                        handleClick = {handleClickCard}
                    />
                )
            })}

            <Modal
                isOpen={modalIsOpen}
                // shouldCloseOnOverlayClick={true}
                // shouldCloseOnEsc={true}
                // onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
            >
                <div className={classes.modal}>
                    <span>U win !</span>
                    <button onClick={() => restartGame()}>Restart</button>
                </div>
            </Modal>
        </div>
    )
}