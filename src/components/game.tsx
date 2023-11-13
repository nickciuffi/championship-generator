import { ParticipantProps } from "../props/participants"
import { Arrows } from "./arrows"

type GameProps = {
    participant1: ParticipantProps,
    participant2: ParticipantProps,
    id: string,
    hasArrows: boolean,
    direction?: 'right' | 'left',
    hasBottom: boolean
}

export function Game(props: GameProps){
    return (
        <div id={props.id} className="bg-slate-600 2xl:text-base text-sm text-white rounded-md min-w-[80px] w-[75%] max-w-[75%] text-center absolute">
            <div className="relative w-full h-full md:p-4 p-2">
               <Arrows id={`arrow-${props.id}`} hasBottom={props.hasBottom} hasArrows={props.hasArrows} direction={props.direction} />
           <p className="overflow-hidden whitespace-nowrap">{props.participant1.name}</p>
             <p>X</p> 
             <p className="overflow-hidden whitespace-nowrap">{props.participant2.name}</p>
             </div>
            </div> 
    )
}