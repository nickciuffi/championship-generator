
type props = {
    children: string | JSX.Element,
    onClick: () => void
}
export function PrimaryBtn({children, onClick}:props){
    return (
        <button onClick={onClick} className="bg-emerald-600 rounded-md px-4 py-2 text-white">{children}</button>
    )
}