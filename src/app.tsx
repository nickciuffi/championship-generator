import { Header } from "./components/header"
import {Outlet} from 'react-router-dom'
import { createContext, useState } from "react"
import { ParticipantProps } from "./props/participants";

type contextProps = {
    participants: ParticipantProps[],
    setParticipants: React.Dispatch<React.SetStateAction<ParticipantProps[]>>,
}
export const ParticipantsContext = createContext<contextProps>({
    participants: [], setParticipants: () => {}
});

export function App() {
    
    const [participants, setParticipants] = useState([{id:1, name: 'Nico1'}, {id:2, name: 'Nico2'}, {id:3, name: 'Nico3'}, {id:4, name: 'Nico4'} , {id:5, name: 'Nico5'} , {id:6, name: 'Nico6'} , {id:7, name: 'Nico7'} ])
    const value = {participants, setParticipants};
    return (
        <ParticipantsContext.Provider value={value}>
        <Header />
        <Outlet />
        </ParticipantsContext.Provider>
    )

}