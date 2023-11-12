import {Link} from 'react-router-dom'

export function Header (){
    return (
        <header className="flex justify-center py-8 bg-slate-700 text-white">
            <Link to="/" className="text-4xl">
            Nick Championships
            </Link>  </header>
    )
} 

