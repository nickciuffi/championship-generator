import { useNavigate } from "react-router-dom";
import { useParticipants } from "../../CustomHooks/useParticipants";
import {useEffect, useState} from 'react'
import { ParticipantProps } from "../../props/participants";

export function GameShower(){

    type keysProps = {
        side1: game[],
        side2: game[],
    }
    type game = {
        participants: ParticipantProps[],
    }
    type key = {
        games: game[]
    }
   

    const [keys, setKeys] = useState<keysProps>({
        side1: [],
        side2: []
    })
    const [nextKeys1, setNextKeys1] = useState<key[]>([])
    const [nextKeys2, setNextKeys2] = useState<key[]>([])
    
    function generateNextKeys(){
        return 
    }

    function arrangeIntoGames(values: ParticipantProps[]):game[]{
        const arrangedGames: game[] = new Array(Math.ceil(values.length/2)).fill({participants: []})
        let gameId = 0
        for(let i = 0; i < 8; i+=2){
            arrangedGames[gameId] = {participants: [values[i], values[i+1] ? values[i+1] : {id: 1000, name: ''}]};
            gameId++;
        }
        return [...arrangedGames]
    }

    function generateKeys(){
        const sortedParts = [];
        const sortObject = [...participants];
        for(let i = 0; sortObject.length > 0; i++ ){
            const num = Math.round(Math.random() * (sortObject.length - 1));
            sortedParts[i] = sortObject[num]; 
            sortObject.splice(num, 1);

        }
        const side1: game[] = arrangeIntoGames([...sortedParts])
        const side2 = side1.splice(Math.round(side1.length/2));
        setKeys({
            side1, side2
        })
        console.log('side1: ', side1)
        console.log('side2: ', side2)
        generateNextKeys();
    }

    const navigate = useNavigate();
    const {participants} = useParticipants();
    useEffect(() => {
        
        if(participants.length < 2) return navigate('/');
        generateKeys();
        
    }, [])
    
    return (
        <div className="container">
            <div className="flex justify-center">
            <div className="">
                
            {keys.side1.map((game, id) => <p key={id}>{game.participants[0].name} X {game.participants[1].name}</p>)}
            </div>
            <div className="">
            {keys.side2.map((game, id) => <p key={id}>{game.participants[0].name} X {game.participants[1].name}</p>)}
            </div>
            </div>
        </div>
    )
}