import { ParticipantsContext } from "../../app";
import { useContext } from "react";

export function GameShower(){

    const {participants} = useContext(ParticipantsContext);
   
    return (
        <div className="container">
            {participants.map((part) => <p>{part.name}</p>)}
        </div>
    )
}