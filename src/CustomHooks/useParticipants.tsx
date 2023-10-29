import {useContext} from 'react';
import { ParticipantsContext } from '../app';
import { ParticipantProps } from '../props/participants';

type useParticipantsProps = () => {
    participants: ParticipantProps[],
    setParticipants: React.Dispatch<React.SetStateAction<ParticipantProps[]>>,
}

export const useParticipants: useParticipantsProps = () => {
    const {participants, setParticipants} = useContext(ParticipantsContext)
    return {participants, setParticipants}
  }