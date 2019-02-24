import React from 'react';
import './ProductList.css';

export default props => (
    <li key={props.i} className="productList">
        {props.id}. {props.short_description}, {props.status}
        <button onClick={() => props.showProduct(props.id)} className="productListButton productListButtonShow">Ver</button>
        <button onClick={() => props.removeProduct(props.id)} className="productListButton productListButtonRemove">Remover</button>
        <button onClick={() => props.editProduct(props.id)} className="productListButton productListButtonEdit">Editar</button>
        <button onClick={() => props.changeStatus(props.id, props.status)}
            className={props.status == 'enable' ? 'productListButtonEnable productListButton' : 'productListButtonDisable productListButton'}
        >
            {props.status == 'enable' ? "Ativado" : 'Desativado'}
        </button>
    </li> 
);
