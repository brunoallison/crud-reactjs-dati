import React from 'react';
import './ProductList.css';

export default props => (
    <div className="card">
        <h1>{props.short_description}</h1>
        <p className="price">R$ {props.value}</p>
        <p>{props.description}</p>
        <div className="flex-button">
            <button onClick={() => props.showProduct(props.id)} className="productListButtonShow">Ver</button>
            <button onClick={() => props.removeProduct(props.id)} className="productListButtonRemove">Remover</button>
            <button onClick={() => props.editProduct(props.id)} className="productListButtonEdit">Editar</button>
            <button
                onClick={() => props.changeStatus(props.id, props.status)}
                className={props.status == 'enable' ? 'productListButtonEnable' : 'productListButtonDisable'}
            >
                {props.status == 'enable' ? 'Ativado' : 'Desativado'}
            </button>
        </div>
    </div>
);
