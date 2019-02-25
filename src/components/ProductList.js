import React from 'react';
import './ProductList.css';

export default props => (
    <div className="card col-6">
        <h1>{props.short_description}</h1>
        <p className="price">R$ {props.value}</p>
        <p>{props.description}</p>
        <p><button>Add to Cart</button></p>
    </div>
);
