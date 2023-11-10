import { game } from "../pages/GameShower/GameShower"
import { Game } from "./game"

type keyProps = {
    games: game[]
}

export function Key(props: keyProps){
    return (
        <div className="flex flex-col justify-around items-center gap-10 w-40">
            {props.games.map((g, i) => <Game key={i} participant1={g.participants[0]} participant2={g.participants[1]} />)}
        </div>
    )
}