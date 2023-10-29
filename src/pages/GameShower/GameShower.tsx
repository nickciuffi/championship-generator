import { useNavigate } from "react-router-dom";
import { useParticipants } from "../../CustomHooks/useParticipants";
import {useEffect} from 'react'

export function GameShower(){
    const navigate = useNavigate();
    const {participants} = useParticipants();
    useEffect(() => {
        if(participants.length < 2) return navigate('/');
    }, [participants])
   
    return (
        <div className="container">
            {participants.map((part, id) => <p key={id}>{part.name}</p>)}
        </div>
    )
}