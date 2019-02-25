import React from 'react';
import './ProductList.css';

export default props => (
    <div className="card">
        <div className="buy"><a href="#">BUY</a></div>
        
        <h2>{props.short_description}</h2>
        <p>{props.description}</p>
        <div className="price">
            <span className="rs">R$</span>
            <span className="value-big">{props.value}</span>
        </div>
    </div>
);
