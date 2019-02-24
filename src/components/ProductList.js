import React from 'react';

export default props => (
    <li key={props.i} className="productList">
        {props.id}. {props.description}, {props.status}
        <button onClick={() => props.showProduct(props.id)} className="productListButton">Ver</button>
        <button onClick={() => props.removeProduct(props.id)} className="productListButton">Remover</button>
        <button onClick={() => props.editProduct(props.id)} className="productListButton">Editar</button>
    </li> 
);