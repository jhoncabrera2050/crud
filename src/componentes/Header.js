import React from 'react' 
import { NavLink } from 'react-router-dom';

const Header = () => {
    return(
        <header>
            <h1>Aplicacion de administracion de libros</h1>
            <hr></hr>
            <div className='links'>
                <NavLink to="/" className="link" activeClassName="active" exact>
                    Lista de libros
                </NavLink>
                <NavLink to="/add" className="link" activeClassName="active">
                    Agrega libro
                </NavLink>
            </div>
        </header>
    )
}

export default Header;