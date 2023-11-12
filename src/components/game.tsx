import { ParticipantProps } from "../props/participants"
import { clsx } from 'clsx';

type GameProps = {
    participant1: ParticipantProps,
    participant2: ParticipantProps,
    isFinal: boolean,
    id: string
}

export function Game(props: GameProps){
    return (
        <div id={props.id} className={clsx("bg-slate-600 md:text-base text-sm text-white md:p-4 p-2 rounded-md min-w-[80px] md:w-[75%] md:max-w-[75%] w-[80 %] max-w-[80%] text-center", 
        { 
        "relative" : props.isFinal,
        "absolute" : !props.isFinal,
        },)}>
        {/* <div className="bg-slate-600 text-white p-4 rounded-md min-w-[80px] max-w-[100%] text-center relative">*/}
            <p className="overflow-hidden whitespace-nowrap">{props.participant1.name}</p>
             <p>X</p> 
             <p className="overflow-hidden whitespace-nowrap">{props.participant2.name}</p>
            </div> 
    )
}