import { ParticipantProps } from "../props/participants"

type GameProps = {
    participant1: ParticipantProps,
    participant2: ParticipantProps
}

export function Game(props: GameProps){
    return (
        <div className="bg-slate-600 text-white p-4 rounded-md min-w-[80px] max-w-[100%] text-center">
            <p className="overflow-hidden">{props.participant1.name}</p>
             <p>X</p> 
             <p className="overflow-hidden">{props.participant2.name}</p>
            </div>
    )
}