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
        <div id={props.id} className="absolute left-[100%] w-10 top-0" >
          
            {
            props.hasBottom ? (
                <>
            <div className="absolute top-[52px] w-5 h-[3px] bg-black"></div>
            <div className="absolute top-[52px] left-5 w-[3px] bg-black h-[calc(100%-101px)]"></div>
            <div className="absolute top-[calc(100%-52px)] w-5 h-[3px] bg-black"></div>
            <div className="absolute top-[50%] left-5 w-5 h-[3px] bg-black"></div>
            </>
            )
                :
                 <div id="arrow-line"  className="absolute top-[53px] w-10 h-[3px] bg-black"></div> 
        }
            
        </div>
            )
            :
            /* Arrows to the left */
             <div id={props.id} className="absolute right-[100%] w-10 top-0" >
          
            {
            props.hasBottom ? (
                <>
            <div className="absolute top-[52px] right-0 w-5 h-[3px] bg-black"></div>
            <div className="absolute top-[52px] left-5 w-[3px] bg-black h-[calc(100%-101px)]"></div>
            <div className="absolute top-[calc(100%-52px)] right-0 w-5 h-[3px] bg-black"></div>
            <div className="absolute top-[50%] right-5 w-5 h-[3px] bg-black"></div>
            </>
            )
                :
                <div id="arrow-line" className="absolute top-[calc(50%-2px)] w-10 h-[3px] bg-black"></div> 
        }
            
        </div>
           )
        : null}
        </>
        )
}