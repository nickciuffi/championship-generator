import { useNavigate } from "react-router-dom";
import { useParticipants } from "../../CustomHooks/useParticipants";
import {useEffect, useState} from 'react'
import { ParticipantProps } from "../../props/participants";
import { Key } from "../../components/key";
import { Game } from "../../components/game";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type keysProps = {
    side1: key[],
    side2: key[],
}
export type game = {
    participants: ParticipantProps[];
    winner?: ParticipantProps;
} 

type key = {
    games: game[]
}
type JogoEspecificoProps = {
    side: 1 | 2,
    key: number,
    id: number,
}



export function GameShower(){

   const [final, setFinal] = useState<game>( {participants: [{name: "???"}, {name: "???"}]});

   const [jogoAtual, setJogoAtual] = useState<JogoEspecificoProps>({side: 1, id: 0, key: 0});
   const [numJogo, setNumJogo] = useState<number>(1);
   const [finalValendo, setFinalValendo] = useState(false);

   const navigate = useNavigate();
   const {participants} = useParticipants();

    const [keys, setKeys] = useState<keysProps>({
        side1: [],
        side2: []
    })

    useEffect(() => {
        
        if(participants.length < 2) {
            const pastChampionships = localStorage.getItem('participants');
            
            if(!pastChampionships) return navigate('/');
            const loadedPastChampionships = JSON.parse(pastChampionships) as ParticipantProps[]
            generateKeys(loadedPastChampionships);
        }
        else{
        localStorage.setItem('participants', JSON.stringify(participants));
        generateKeys(participants);
        }
        
    }, [])

    function verifyInitialWinners(dado: key){

        const newDados = {...dado};

        newDados.games.forEach((game, i) => {
            if(game.participants[0].id === undefined){
                newDados.games[i].winner = game.participants[1];
            }
            else if(game.participants[1].id === undefined){
                newDados.games[i].winner = game.participants[0];
            }
        })
      return newDados;
    }
    
    
   function generateNextKeys(nextKeys: key[]){

    
        if(nextKeys[nextKeys.length - 1].games.length == 1) return nextKeys
        
        const nextKeyEmpty: game[] = new Array(Math.ceil(nextKeys[nextKeys.length-1].games.length / 2)).fill({participants: [{name: "???"}, {name: "???"}]});
        const nextKey = nextKeyEmpty.map((game, id) => {
           if(nextKeys[nextKeys.length - 1].games[id*2].winner){
                 return {participants: [nextKeys[nextKeys.length - 1].games[id*2].winner as ParticipantProps, {name: "???"}]};
            }
            if(nextKeys[nextKeys.length - 1].games[(id*2)+1]) {
           
            if(nextKeys[nextKeys.length - 1].games[(id*2)+1].winner){
                return {participants: [ nextKeys[nextKeys.length - 1].games[id*2+1].winner as ParticipantProps, {name: "???"},]};
            }
        }
        return game
        })
        const newNextKeys = [...nextKeys, {games: nextKey}]
        return generateNextKeys(newNextKeys);

   }

    function arrangeIntoGames(values: ParticipantProps[]):game[]{
        const arrangedGames: game[] = new Array(Math.ceil(values.length/2)).fill({participants: []})
        let gameId = 0
        for(let i = 0; i < values.length; i+=2){
            arrangedGames[gameId] = {participants: [values[i], values[i+1] ? values[i+1] : {name: '???'}]};
            gameId++;
        }
        return [...arrangedGames]
    }

    function generateKeys(parts: ParticipantProps[]){
        const sortedParts = [];
        const sortObject = [...parts];
        for(let i = 0; sortObject.length > 0; i++ ){
            const num = Math.round(Math.random() * (sortObject.length - 1));
            sortedParts[i] = sortObject[num]; 
            sortObject.splice(num, 1);

        }
        const side1Games: game[] = arrangeIntoGames([...sortedParts])
        const side2Games = side1Games.splice(Math.floor(side1Games.length/2));
        

       
        const nextKeysSide1 = generateNextKeys([
            verifyInitialWinners({ games: side1Games })
        ])
        const nextKeysSide2 = generateNextKeys([
            verifyInitialWinners({games: side2Games})
        ])
        console.log("side1: ", nextKeysSide1);
        console.log("side2: ", nextKeysSide2);
        setKeys({
            side1: nextKeysSide1,
            side2: nextKeysSide2
        })
       
    }

  
    

    function getAtualGame(jogo: JogoEspecificoProps){
        return keys[`side${jogo.side}` as 'side1' | 'side2'][jogo.key].games[jogo.id];
    }

    function getChildGame(jogo:JogoEspecificoProps): JogoEspecificoProps{
        const child:JogoEspecificoProps = {
            side: jogo.side,
            key: jogo.key + 1,
            id: Math.floor(jogo.id/2),
        }
        return child
    }

    function setProximoJogo(jogo: JogoEspecificoProps):JogoEspecificoProps | undefined{
        
       
        if(!keys[`side${jogo.side}` as 'side1' | 'side2'][jogoAtual.key].games[jogo.id + 1]){
            
            //next key side
            if(jogo.side === 1) {
                jogo.side = 2
            }else{
                if(!keys[`side1`][jogoAtual.key+1]){
                    //começa final
                    if(!keys[`side2`][jogoAtual.key+1]) return 
                    //Fica na direita 
                    jogo.key = jogo.key + 1;
                  
                   
                }
                else{
                
                jogo.side = 1
                jogo.key = jogo.key + 1
                }
            }
            jogo.id = 0;
        }
        else{
            jogo.id++
        }
        
        if(getAtualGame(jogo).winner){
            return setProximoJogo(jogo); 
        }
       /* 
       Ainda bugado
       if(!getAtualGame(jogo).participants[0].id || !getAtualGame(jogo).participants[1].id){
            setWinnerToGame(jogo, getAtualGame(jogo).participants[[0]])
            setWinnerToGame(getChildGame(jogo), getAtualGame(jogo).participants[0])
            
            return setProximoJogo(jogo)
        } */
        return jogo

    }

    function setWinnerToGame(editGame: JogoEspecificoProps, winner: ParticipantProps){
        const editKeys = {...keys}
        const editGameKey = [...editKeys[`side${editGame.side}` as 'side1' | 'side2'][editGame.key].games];
        const finalEditGames = editGameKey.map((game, id):game => {
            if(id !== editGame.id)return game;
            return {
                participants: [
                    winner,
                    game.participants[0]
                ]
            }
        })

        editKeys[`side${editGame.side}` as 'side1' | 'side2'][editGame.key].games = finalEditGames
    }


    function handleSetWinner(winNum: 0 | 1){
        const MySwal = withReactContent(Swal)
        if(finalValendo){
            MySwal.fire({
                title: `${ final.participants[winNum].name} is the winner`,
                icon: 'success'
              })
            return setFinal({participants: final.participants, winner: final.participants[winNum]})
        } 
        setNumJogo(numJogo + 1)
        const editKeys = {...keys}
        const key =  editKeys[`side${jogoAtual.side}` as 'side1' | 'side2'][jogoAtual.key]
        const newWinner = key.games[jogoAtual.id].participants[winNum]
        key.games[jogoAtual.id].winner = newWinner;
        // quando foi a ultima key manda para a final
        if(key.games.length === 1) {
             setFinal({participants: [
                newWinner,
                final.participants[0]
                
            ]})
            
            const jogo = setProximoJogo({...jogoAtual})
            if(!jogo) return setFinalValendo(true);
            return setJogoAtual(jogo)
        }
        else{
            const child = getChildGame({...jogoAtual});
            setWinnerToGame(child, newWinner)

            const jogo = setProximoJogo({...jogoAtual}) as JogoEspecificoProps;

           console.log(keys)
            setJogoAtual(jogo);
        }
       
    }
    
    return (
        <div className="container mx-[auto]">
            <div className="flex py-[60px] justify-center h-[100%] items-center">
            <div className="flex mr-6">
                { keys.side1.map((k, i) => <Key key={i} games={k.games} />)}
            </div>
            <div className="flex flex-col items-center relative"><p className="absolute top-[-30px]">Final</p><Game participant1={final.participants[0]} participant2={final.participants[1]}/></div>
            <div className="flex flex-row-reverse ml-6">
                {keys.side2.map((k, i) => <Key key={i} games={k.games} />)}
            
            </div>
            </div>
            <div className=" mb-40">
                {
                    final.winner ? 
                    <>
                        <button> Reiniciar</button>
                        <button> Criar outro campeonato</button>
                        </>
                        : 
                      
                        <div>
                         <p className="text-center text-2xl ">{
                    finalValendo ? 
                    'Quem venceu a final?'
                    :
                `Quem venceu o jogo ${numJogo}?`}</p>
                <div className="flex justify-around items-center mt-10">
                <a className="bg-green-700 text-white cursor-pointer py-4 px-6 rounded-md text-xl" onClick={() => handleSetWinner(0)}>{
                    
                    
                    (finalValendo) ?  
                    final.participants[0].name
                    :
                    keys.side1.length === 0 ? <> Loading</> :
                jogoAtual.side == 1 ? 
                keys.side1[jogoAtual.key].games[jogoAtual.id].participants[0].name
                    : keys.side2[jogoAtual.key].games[jogoAtual.id].participants[0].name
            }</a>
            OU
            <a className="bg-green-700 cursor-pointer text-white py-4 px-6 rounded-md text-xl" onClick={() => handleSetWinner(1)}>
                {
                       (finalValendo) ?  
                       final.participants[1].name
                       :
                    keys.side2.length === 0 ? <> Loading</> :
            jogoAtual.side == 1 ? 
                keys.side1[jogoAtual.key].games[jogoAtual.id].participants[1].name
                    : keys.side2[jogoAtual.key].games[jogoAtual.id].participants[1].name
                }
            </a>
            </div>
                </div>
                    }
            </div>
        </div>
    )
}