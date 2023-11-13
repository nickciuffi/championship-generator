import { GreenButton } from "./greenButton";

export function EndGame(){
    return (
        <div className="flex justify-center flex-col gap-8 items-center ">
       <GreenButton>Reiniciar</GreenButton>
        <GreenButton>Criar outro campeonato</GreenButton>
        </div>
    )
}