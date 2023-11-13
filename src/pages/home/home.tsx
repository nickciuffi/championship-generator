import { FormEvent, useState } from "react";
import { Participant } from "../../components/participant"
import { ParticipantProps } from "../../props/participants"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BlackBtn, PrimaryBtn } from "../../components/blackBtn";
import {useNavigate} from 'react-router-dom'
import { useParticipants } from "../../CustomHooks/useParticipants";


export function Home(){
    const [participants, setParticipants] = useState<ParticipantProps[]>([])
    const contextParticipants = useParticipants();
    const navigate = useNavigate();

    function handleAdd(formEvent: FormEvent<HTMLFormElement>){
        const MySwal = withReactContent(Swal)
        
        formEvent.preventDefault();
        const form = formEvent.target as HTMLElement;
        const inputName = form.querySelector('#name') as HTMLInputElement;
        const name = inputName.value;
        if(!name) return MySwal.fire({
            title: 'The name is required!',
            icon: 'error'
          })

        setParticipants(prev => [...prev, {
            id: prev.length, name}])
        
        inputName.value = ""
      
        
    }

    function handleDelete(id: number){
        const editParticipants = participants;
        if(!editParticipants) return;
        
        setParticipants(editParticipants.filter((part) => part.id != id));
    }

    function handleStart(){
        contextParticipants.setParticipants(participants)
        navigate('/game')
    }

    return (
        <div className="container mx-auto py-6">
            <p className="text-2xl text-center mb-4">Create your own championship</p>
            <p className="text-xl text-center">The first step is to choose the players</p>
            <div className="flex justify-around flex-col items-center md:flex-row md:items-start max-w-[1100px] mx-[auto] py-10 text-lg">
            <form onSubmit={(e) => handleAdd(e)} className="w-[70%] md:w-[40%] mb-20 min-h-[188px] p-8 rounded-md bg-slate-600 flex flex-col justify-center items-start gap-1" >
                <label htmlFor="name" className="text-white">Name</label>
                <input type="text" id="name" placeholder="name" maxLength={14} required className="w-[100%] mb-4 px-2 rounded-md" />
                <BlackBtn>Adicionar</BlackBtn>
            </form>
            <div className="min-h-[200px] md:block hidden h-[100%] bg-slate-700 w-[2px]"><></></div>
            <div className="bg-slate-600 min-h-[188px] w-[70%] md:w-[40%] rounded-xl p-8 text-white">
                <p>Participants:</p>
                <ul className="mt-5 mb-4">
                {
                participants.length == 0 ? <p>No participants yet</p> :
                participants.map((part, i) => <Participant key={i} i={i} id={part.id as number} name={part.name} handleDelete={handleDelete} />)}
                </ul>
            {   
            participants.length > 3 ?
            <BlackBtn onClick={handleStart}>Start</BlackBtn>
            : <></>
            }
            </div>
            </div>
        </div>

    )
}