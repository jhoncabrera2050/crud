// importamos useSte para administrar estados y realizar actualizaciones
// reactivas
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const FormularioDeLibro = (props) => {



  // usamos el useState hook para almacenar todos los detalles
  //  para agregar estado a componentes funcionales
  const [libro, setLibro] = useState({
    nombrelibro: props.libro ? props.libro.nombrelibro : '',
    autor: props.libro ? props.libro.autor : '',
    cantidad: props.libro ? props.libro.cantidad : '',
    precio: props.libro ? props.libro.precio : '',
    fecha: props.libro ? props.libro.fecha : ''
  });

  // agregando un estado para mostrar un mensaje de erorr
  // el hook usestate lo que realiza es crear una variable erroMsg y su 
  // funcion setErrorMes para actualizar su estado
  const [errorMsg, setErrorMsg] = useState('');
  const { nombrelibro, autor, precio, cantidad } = libro;

  //Esta función nos permitirá componer una 
  //función submit que no solamente evita que el 
  //formulario recargue la página, sino que nos proporciona 
  //todos los valores del formulario en un objeto formateado, 
  //y también se encargará de hacer las validaciones 
  //que configuremos en nuestros inputs
  const handleOnSubmit = (event) => {
    // esto evita que el evento cause una recarga de la pagina
    event.preventDefault();
    // creacion de un arreglo
    const valores = [nombrelibro, autor, precio, cantidad];
    let errorMsg = '';

    //
    const todosLosCamposLlenos = valores.every((campo) => {
      // plantillas literales de javascript
      // `${campo}` lo convierte en una cadena
      // trim() para eliminar espacios en blanco
      const valor = `${campo}`.trim();
      return valor !== '' && valor !== '0';
    });

    if (todosLosCamposLlenos) {
      const libro = {
        id: uuidv4(),
        nombrelibro,
        autor,
        precio,
        cantidad,
        fecha: new Date()
      };
      props.handleOnSubmit(libro);
    } else {
      errorMsg = 'Por favor, rellene todos los campos.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { nombre, valor } = event.target;
    switch (nombre) {
      case 'cantidad':
        if (valor === '' || parseInt(valor) === +valor) {
          setLibro((prevState) => ({
            ...prevState,
            [nombre]: valor
          }));
        }
        break;
      case 'precio':
        if (valor === '' || valor.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setLibro((prevState) => ({
            ...prevState,
            [nombre]: valor
          }));
        }
        break;
      default:
        setLibro((prevState) => ({
          ...prevState,
          [nombre]: valor
        }));
    }
  };

  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre del Libro</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="nombrelibro"
            value={nombrelibro}
            placeholder="Ingrese el nombre del libro"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="autor">
          <Form.Label>Autor del Libro</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="autor"
            value={autor}
            placeholder="Ingrese el nombre del autor"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="cantidad">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="cantidad"
            value={cantidad}
            placeholder="Ingrese la cantidad disponible"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="precio">
          <Form.Label>Precio del Libro</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="precio"
            value={precio}
            placeholder="Ingrese el precio del libro"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default FormularioDeLibro;