import { JogoEspecificoProps, game, keysProps } from "../pages/GameShower/GameShower"
import { GreenButton } from "./greenButton"

type GameUiProps = {
    finalValendo: boolean,
    numJogo: number,
    handleSetWinner: (winNum: 0 | 1)=>void,
    final: game,
    keys: keysProps,
    jogoAtual: JogoEspecificoProps,


}

export function GameUi(props: GameUiProps){
    return (
        <div className="container px-0 md:px-[100px]">
                         <p className="text-center text-2xl ">{
                    props.finalValendo ? 
                    'Quem venceu a final?'
                    :
                `Quem venceu o jogo ${props.numJogo}?`}</p>
                <div className="flex justify-around items-center mt-10">
                <GreenButton onClick={() => props.handleSetWinner(0)}>{
                    
                    
                    (props.finalValendo) ?  
                    props.final.participants[0].name
                    :
                props.jogoAtual.side == 1 ? 
                props.keys.side1[props.jogoAtual.key].games[props.jogoAtual.id].participants[0].name
                    : props.keys.side2[props.jogoAtual.key].games[props.jogoAtual.id].participants[0].name
            }</GreenButton>
            OU
            <GreenButton onClick={() => props.handleSetWinner(1)}>
                {
                       (props.finalValendo) ?  
                       props.final.participants[1].name
                       :
                  
            props.jogoAtual.side == 1 ? 
                props.keys.side1[props.jogoAtual.key].games[props.jogoAtual.id].participants[1].name
                    : props.keys.side2[props.jogoAtual.key].games[props.jogoAtual.id].participants[1].name
                }
            </GreenButton>
            </div>
                </div>
    )
}