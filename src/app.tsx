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
    
    const [participants, setParticipants] = useState([{id:1, name: 'nick'}])
    const value = {participants, setParticipants};
    return (
        <ParticipantsContext.Provider value={value}>
        <Header />
        <Outlet />
        </ParticipantsContext.Provider>
    )

}