type GreenButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
}

export function GreenButton(props: GreenButtonProps){
    return (
        <button {...props} className="bg-green-700 text-white cursor-pointer py-3 px-6 rounded-md text-xl"  >{props.children}</button>
    )
}