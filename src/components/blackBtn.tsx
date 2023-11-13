
type blackButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {children: React.ReactDOM | string}

export function BlackBtn(props:blackButtonProps){
    return (
        <button {...props} className="bg-slate-800 rounded-md px-6 py-3 text-white">{props.children}</button>
    )
}