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
        <div id={props.id} className="absolute left-[100%] w-10 h-[calc(200%+20px)] top-0" >
          
            {
            props.hasBottom ? (
                <>
            <div className="absolute top-[calc(25%-5px)] w-5 h-[3px] bg-black"></div>
            <div className="absolute top-[calc(25%-5px)] left-5 w-[3px] bg-black h-[calc(50%+13px)]"></div>
            <div className="absolute top-[calc(75%+5px)] w-5 h-[3px] bg-black"></div>
            <div className="absolute top-[50%] left-5 w-5 h-[3px] bg-black"></div>
            </>
            )
                :
                 <div className="absolute top-[calc(25%-5px)] w-10 h-[3px] bg-black"></div> 
        }
            
        </div>
            )
            :
            /* Arrows to the left */
             <div className="absolute right-[100%] w-10 h-[calc(200%+20px)] top-0" >
          
            {
            props.hasBottom ? (
                <>
            <div className="absolute top-[calc(25%-5px)] right-0 w-5 h-[3px] bg-black"></div>
            <div className="absolute top-[calc(25%-5px)] left-5 w-[3px] bg-black h-[calc(50%+13px)]"></div>
            <div className="absolute top-[calc(75%+5px)] right-0 w-5 h-[3px] bg-black"></div>
            <div className="absolute top-[50%] right-5 w-5 h-[3px] bg-black"></div>
            </>
            )
                :
                <div className="absolute top-[calc(25%-5px)] w-10 h-[3px] bg-black"></div> 
        }
            
        </div>
           )
        : null}
        </>
        )
}