import { GreenButton } from "./greenButton";

type endGameProps = {
    restartFunc: ()=>void,
    createAnotherFunc: ()=>void
}

export function EndGame(props: endGameProps){
    return (
        <div className="flex justify-center flex-col gap-8 items-center ">
       <GreenButton onClick={props.restartFunc}>Reiniciar</GreenButton>
        <GreenButton onClick={props.createAnotherFunc}>Criar outro campeonato</GreenButton>
        </div>
    )
}