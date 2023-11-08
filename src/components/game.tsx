import { ParticipantProps } from "../props/participants"

type GameProps = {
    participant1: ParticipantProps,
    participant2: ParticipantProps
}

export function Game(props: GameProps){
    return (
        <div className="bg-slate-600 text-white p-4 rounded-md min-w-[80px] text-center">
            <p>{props.participant1.name}</p>
             <p>X</p> 
             <p>{props.participant2.name}</p>
            </div>
    )
}