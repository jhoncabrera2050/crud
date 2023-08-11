import React from "react";
import FormularioDeLibro from './FormularioDeLibro';

const AgregaLibro = () =>{
    const handleOnSubmit = (libro) =>{
        console.log(libro);
    };
    return(
        <React.Fragment>
            <FormularioDeLibro handleOnSubmit={handleOnSubmit}/>
        </React.Fragment>
    );
};

export default AgregaLibro;