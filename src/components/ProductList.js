import React from 'react';
import './ProductList.css';

export default props => (
    <li key={props.i} className="productList">
        {props.id}. {props.short_description}, {props.status}
        <button onClick={() => props.showProduct(props.id)} style={{'backgroundColor': '#007bff'}} className="productListButton">Ver</button>
        <button onClick={() => props.removeProduct(props.id)} style={{'backgroundColor': '#dc3545'}} className="productListButton">Remover</button>
        <button onClick={() => props.editProduct(props.id)} style={{'backgroundColor': '#ffc107'}} className="productListButton">Editar</button>
        <button onClick={() => props.changeStatus(props.id, props.status)}
            className="productListButton"
            style={props.status == 'enable' ? {'backgroundColor': '#28a745'} : {'backgroundColor': '#dc3545'}}
        >
            {props.status == 'enable' ? "Ativado" : 'Desativado'}
        </button>
    </li> 
);
