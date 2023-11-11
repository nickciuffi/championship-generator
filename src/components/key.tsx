import { game } from "../pages/GameShower/GameShower"
import { Game } from "./game"

type keyProps = {
    games: game[], 
    id: string
}

export function Key(props: keyProps){
    return (
        <div id={props.id} className="flex flex-col justify-around items-center gap-10 my-20 w-44 relative">
            {props.games.map((g, i) => <Game id={`${props.id}-${i}`} key={i} isFinal={false} participant1={g.participants[0]} participant2={g.participants[1]} />)}
        </div>
    )
}