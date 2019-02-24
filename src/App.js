import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'CRUD de Produtos dati.',
      act: 0,
      index: '',
      datas: []
    };
  }

  async componentDidMount() {
    this.refs.description.focus();

    await this.searchAll();

    console.log(this.state.datas);
  }

  async searchAll() {
    const teste = await axios.get('http://18.228.14.48/api/products?cmd=list');

    this.setState({ datas: teste.data });
  }

  createProduct = (e) => {
    e.preventDefault();

    console.log('try');

    let datas = this.state.datas;
    let description = this.refs.description.nodeValue;
    let short_description = this.refs.short_description.nodeValue;
    let code = this.refs.code.nodeValue;
    let status = this.refs.status.nodeValue;
    let qty = this.refs.qty.nodeValue;

    let data = {
      description, short_description, code, status, qty
    }

    datas.push(data);

  }

  showProduct = (id) => {
    console.log("Mostrando Produto" + id);
  }

  removeProduct = (id) => {
    axios.delete(`http://18.228.14.48/api/products/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  editProduct = (id) => {
    console.log("Editando Produto" + id);
  }

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="formProduct" className="formProduct">
          <textarea type="text" ref="description" placeholder="Descrição do Produto" className="formFieldProduct" />
          <input type="text" ref="short_description" placeholder="Breve Descrição" className="formFieldProduct" />
          <input type="text" ref="code" placeholder="Código" className="formFieldProduct" />
          <input type="text" ref="status" placeholder="Status" className="formFieldProduct" />
          <input type="number" ref="qty" placeholder="Quantidade" className="formFieldProduct" />
          <button onClick={this.createProduct} className="formProductSubmit">Salvar</button>
        </form>

        <pre>
          {datas.map((data, i) => 
            <li key={i} className="productList">
              {data.id}. {data.description}, {data.status}
              <button onClick={() => this.showProduct(data.id)} className="productListButton">Ver</button>
              <button onClick={() => this.removeProduct(data.id)} className="productListButton">Remover</button>
              <button onClick={() => this.editProduct(data.id)} className="productListButton">Editar</button>
            </li>  
          )}
        </pre>
      </div>
    );
  }
}

export default App;
