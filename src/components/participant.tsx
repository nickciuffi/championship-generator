
import { AiFillDelete } from 'react-icons/ai'

export type ParticipantComponentProps = {
    i: number,
    id: number,
    name: string,
    handleDelete: (arg0: number) => void,
}

export function Participant(props: ParticipantComponentProps){
    return (
        <li className="bg-slate-700 rounded-xl mb-3 flex items-center gap-5 justify-between px-4 py-2">
            <p>{props.i}</p>
            <p className="flex flex-row gap-2 items-center">
                {props.name}
            <a className="cursor-pointer" onClick={() => props.handleDelete(props.id)}><AiFillDelete /></a></p>
            
        </li>
    )
}