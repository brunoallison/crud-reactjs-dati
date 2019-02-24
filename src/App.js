import React, { Component } from 'react';
import ProductList from './components/ProductList';
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

    this.showProduct = this.showProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
  }

  async componentDidMount() {
    this.refs.description.focus();

    await this.searchAll();
  }

  async searchAll() {
    const datas = await axios.get('http://18.228.14.48/api/products?cmd=list');

    this.setState({ datas: datas.data });
  }

  createProduct = (e) => {
  }

  showProduct = (id) => {
    console.log("Mostrando Produto" + id);
  }

  removeProduct = (id) => {
    axios.delete(`http://18.228.14.48/api/products/${id}`)
      .then(res => {
        this.searchAll();
        this.refs.formProduct.reset();
        this.refs.description.focus();
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
          <input type="number" step="0.01" ref="value" placeholder="value" className="formFieldProduct" />
          <input type="number" ref="qty" placeholder="Quantidade" className="formFieldProduct" />
          <button onClick={this.createProduct} className="formProductSubmit">Salvar</button>
        </form>

        <pre>
          {datas.map((data, i) => 
            <ProductList
              key={i}
              id={data.id}
              description={data.description}
              status={data.status}
              showProduct={this.showProduct}
              removeProduct={this.removeProduct}
              editProduct={this.editProduct}
            />
          )}
        </pre>
      </div>
    );
  }
}

export default App;
