import classes from './Main.module.css'
import GameBoard from './Components /GameBoard'
import Select from "./Components /Select";
import {useState} from "react";
import Logo from "./Components /Logo";

function Main() {

    const [cardQuantity, setCardQuantity] = useState<number>(12)

    function handleChangeCardQuantity(cardQuantity: number) {
        setCardQuantity(cardQuantity)
    }

    return (
        <div className={classes.main}>
            <Logo/>
            <Select handleChange={handleChangeCardQuantity}/>
            <GameBoard cardQuantity={cardQuantity} />
        </div>
    )
}


export default Main


