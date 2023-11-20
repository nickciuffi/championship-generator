type ArrowsProps = {
    hasArrows: boolean,
    direction?: 'right' | 'left',
    hasBottom: boolean,
    id: string
}

export function Arrows(props: ArrowsProps){
    return (
        <>
        { props.hasArrows && props.direction ?(
            props.direction === 'right' ? (
                /* Arrows to the right */
        <div id={props.id} className="absolute left-[100%] 2xl:w-10 md:w-9 w-7 top-0" >
          
            {
            props.hasBottom ? (
                <>
            <div className="absolute top-[52px] w-[50%] h-[3px] bg-black"></div>
            <div className="absolute top-[52px] left-[50%] w-[3px] bg-black h-[calc(100%-101px)]"></div>
            <div className="absolute top-[calc(100%-52px)] w-[50%] h-[3px] bg-black"></div>
            <div className="absolute top-[50%] left-[50%] w-[50%] h-[3px] bg-black"></div>
            </>
            )
                :
                 <div id="arrow-line"  className="absolute top-[53px] w-[100%] h-[3px] bg-black"></div> 
        }
            
        </div>
            )
            :
            /* Arrows to the left */
             <div id={props.id} className="absolute right-[100%] 2xl:w-10 md:w-9 w-7 top-0" >
          
            {
            props.hasBottom ? (
                <>
            <div className="absolute top-[52px] right-0 w-[50%] h-[3px] bg-black"></div>
            <div className="absolute top-[52px] left-[50%] w-[3px] bg-black h-[calc(100%-101px)]"></div>
            <div className="absolute top-[calc(100%-52px)] right-0 w-[50%] h-[3px] bg-black"></div>
            <div className="absolute top-[50%] right-[50%] w-5 h-[3px] bg-black"></div>
            </>
            )
                :
                <div id="arrow-line" className="absolute top-[calc(50%-2px)] w-[100%] h-[3px] bg-black"></div> 
        }
            
        </div>
           )
        : null}
        </>
        )
}