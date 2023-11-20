import { useNavigate } from "react-router-dom";
import { useParticipants } from "../../CustomHooks/useParticipants";
import {useEffect, useState} from 'react'
import { ParticipantProps } from "../../props/participants";
import { Key } from "../../components/key";
import { Game } from "../../components/game";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { EndGame } from "../../components/endGame";
import { GameUi } from "../../components/GameUi";

export type keysProps = {
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
export type JogoEspecificoProps = {
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
   const gameSize = 104;
   const gameMargin = 20;


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
        
        const sortedParts = sortGames(participants)
        localStorage.setItem('participants', JSON.stringify(sortedParts));
        generateKeys(sortedParts);
        }

    }, [])
    useEffect(() => {
        if(keys.side1.length === 0) return 
        const keyEl1 = document.getElementById(`1-0`) as HTMLElement;
        const keyEl2 = document.getElementById(`2-0`) as HTMLElement;
        const finalEl = document.getElementById('3-0') as HTMLElement;
        const heightNum = ((keys.side2[0].games.length * gameSize) + ((keys.side2[0].games.length - 1) * gameMargin));
        keyEl1.style.height = `${heightNum}px`;
        keyEl2.style.height = `${heightNum}px`;
        finalEl.style.height = `${heightNum}px`;
        arrangeGamePositions(1, [...keys.side1]);
        arrangeGamePositions(2, [...keys.side2]);
    }, [keys])

    function fixArrowSize(side: number, key: number, games: game[], isStandard: boolean){
        let hasArrows = true;
        games.forEach((game, gameId) => {
        if(!hasArrows){
            hasArrows = !hasArrows;
            return;
        }
        const gameEl = document.getElementById(`${side}-${key}-${gameId}`) as HTMLElement;
        if(!gameEl){
            return;
        }
        const arrows = gameEl.querySelector(`#arrow-${gameEl.id}`) as HTMLElement | null;
        if(!arrows) return;
       
        
        const nextGame = gameEl.nextSibling as HTMLElement | null;
        
        if(!nextGame) {
           arrows.style.height = `${gameSize}px`;
            return;
        }
        if(isStandard){
           
            arrows.style.height = `${(gameSize*2)+gameMargin}px`;
            return;
        }
       
        const arrowNewHeight = parseInt(nextGame.style.top) - parseInt(gameEl.style.top) + gameSize;
        arrows.style.height = `${arrowNewHeight}px`;
        hasArrows = !hasArrows;
    })

    }

    function arrangeGamePositions(side: number, arrangeKeys: key[]){
        
       
        arrangeKeys.forEach((key, keyId) => {
            
            key.games.forEach((_game, gameId) => {
                
                if(keyId === 0){
                    const gameEl = document.getElementById(`${side}-${keyId}-${gameId}`) as HTMLElement;
                    let possibleTop = 0 
                    if(side === 1 && key.games.length < keys.side2[0].games.length){
                     possibleTop = (gameSize/2) + (gameMargin/2);
                    }
                    const topNum = (gameId * (gameSize + gameMargin)) + possibleTop;
                    gameEl.style.top = `${topNum}px`; 
                    
                       
                }
                //se não for a primeira key
                else{
                    const parentsKey = keyId - 1;
                    const parent1GameId = gameId * 2;
                    const parent2GameId = parent1GameId+1;
                    const gameEl = document.getElementById(`${side}-${keyId}-${gameId}`) as HTMLElement;
                    
                    const parent1El = document.getElementById(`${side}-${parentsKey}-${parent1GameId}`) as HTMLElement;
                    const parent2El = document.getElementById(`${side}-${parentsKey}-${parent2GameId}`);
                    
                    if(!parent2El){
                         gameEl.style.top = parent1El.style.top;
                        
                         return;
                    }
                    const topNum = (parseInt(parent1El.style.top) + parseInt(parent2El.style.top))/2;
                    
                    
                    gameEl.style.top = `${topNum}px`
                   

                }
               
            })
           
                fixArrowSize(side, keyId, key.games, keyId === 0);
        })
        
        //Arrange final game
        const finalEl = document.getElementById('3-0-0') as HTMLElement;
        const semifinal1 = document.getElementById(`1-${keys.side1.length-1}-0`) as HTMLElement;
        const semifinal2 = document.getElementById(`2-${keys.side2.length-1}-0`) as HTMLElement;
        
        finalEl.style.top = `${(parseInt(semifinal1.style.top) + parseInt(semifinal2.style.top))/2}px`;
        const semiArrowLine1 = semifinal1.querySelector('#arrow-line') as HTMLElement;
        const semiArrowLine2 = semifinal2.querySelector('#arrow-line') as HTMLElement;
        if(!finalEl.style.top) return;
        semiArrowLine1.style.top = `${(gameSize/2)-((parseInt(semifinal1.style.top) - parseInt(finalEl.style.top))/2)}px`;
        semiArrowLine2.style.top = `${(gameSize/2)-((parseInt(semifinal2.style.top) - parseInt(finalEl.style.top))/2)}px`;
    }

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

    function sortGames(games: ParticipantProps[]):ParticipantProps[]{
        const sortedParts = [];
        const sortObject = [...games];
        for(let i = 0; sortObject.length > 0; i++ ){
            const num = Math.round(Math.random() * (sortObject.length - 1));
            sortedParts[i] = sortObject[num]; 
            sortObject.splice(num, 1);

        }
        return [...sortedParts]
    }

    function generateKeys(parts: ParticipantProps[]){
        
        
        const side1Games = arrangeIntoGames([...parts])
        const side2Games = side1Games.splice(Math.floor(side1Games.length/2));
        
       
        const nextKeysSide1 = generateNextKeys([
            verifyInitialWinners({ games: side1Games })
        ])
        const nextKeysSide2 = generateNextKeys([
            verifyInitialWinners({games: side2Games})
        ])
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
      
       if(getAtualGame(jogo).participants[1].id === undefined){
            
            setWinnerToGame(jogo, getAtualGame(jogo).participants[0])
            setWinnerToGame(getChildGame(jogo), getAtualGame(jogo).participants[0])    
            return setProximoJogo(jogo)
        } 
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

            setJogoAtual(jogo);
        }
       
    }

    function handleCreateAnotherChampionship(){
        localStorage.clear();
        return navigate('/')
    }
    function handleRestart(){
        
        return window.location.reload();
    }
    
    return (
        <div className="container mx-[auto]">
            <div className={`flex overflow-x-scroll md:overflow-hidden justify-left md:justify-center h-[100%] items-center`}>
            <div className="flex">
                { keys.side1.map((k, i) => <Key direction="right" id={`1-${i}`} key={i} games={k.games} />)}
            </div>
            <div id="3-0" className="flex flex-col justify-around items-center gap-10 my-20 2xl:w-40 md:w-36 w-28  relative"><p className="mb-[50px]">Final</p><Game hasArrows={false} hasBottom={false} id="3-0-0" participant1={final.participants[0]} participant2={final.participants[1]}/></div>
            <div className="flex flex-row-reverse">
                {keys.side2.map((k, i) => <Key direction="left" id={`2-${i}`} key={i} games={k.games} />)}
            
            </div>
            </div>
            <div className=" mb-40">
                {
                    final.winner ? 
                   <EndGame createAnotherFunc={handleCreateAnotherChampionship} restartFunc={handleRestart} />
                        : (
                        keys.side1.length > 0  ?
                    <GameUi final={final} finalValendo={finalValendo} handleSetWinner={handleSetWinner} jogoAtual={jogoAtual} keys={keys} numJogo={numJogo} />
                       : null 
                       )
                    }
            </div>
        </div>
    )
}