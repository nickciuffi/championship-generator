import { game } from "../pages/GameShower/GameShower"
import { Game } from "./game"

type keyProps = {
    games: game[], 
    id: string,
    direction: 'right' | 'left'
}

export function Key(props: keyProps){
    return (
        <div id={props.id} className="flex flex-col justify-around items-center gap-[20px] my-20 2xl:w-40 md:w-36 w-28 relative">
            {props.games.map((g, i) => <Game hasBottom={!!props.games[i+1]} hasArrows={i%2 === 0} direction={props.direction} id={`${props.id}-${i}`} key={i} participant1={g.participants[0]} participant2={g.participants[1]} />)}
        </div>
    )
}