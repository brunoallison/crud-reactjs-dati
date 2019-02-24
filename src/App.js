import React, { Component } from 'react';
import ProductList from './components/ProductList';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'CRUD de Produtos dati.',
      editing: false,
      idEditing: '',
      button: 'Salvar',
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
    const products = await axios.get('http://18.228.14.48/api/products?cmd=list');
    this.setState({ datas: products.data });
  }

  createOrUpdateProduct(e) {
    e.preventDefault();

    let product = {
      description: this.refs.description.value,
      short_description: this.refs.short_description.value,
      code: this.refs.code.value,
      status: this.refs.status.value,
      value: this.refs.value.value,
      qty: this.refs.qty.value
    };

    if (!this.state.editing) {
      axios.post('http://18.228.14.48/api/products/', product)
      .then(res => {
        this.refreshContent();
      });
    } else {
      axios.put(`http://18.228.14.48/api/products/${this.state.idEditing}`, product)
      .then(res => {
        this.refreshContent();

        this.setState({
          editing: false,
          idEditing: '',
          button: 'Salvar'
        });
      });
    }
  }

  async showProduct(id) {
    let product = await axios.get(`http://18.228.14.48/api/products?cmd=details&id=${id}`)
      .then(res => {
        this.refs.description.value = res.data.description;
        this.refs.short_description.value = res.data.short_description;
        this.refs.code.value = res.data.code;
        this.refs.status.value = res.data.status;
        this.refs.value.value = res.data.value;
        this.refs.qty.value = res.data.qty;

        this.setState({
          editing: null
        });

      });
  }

  removeProduct(id) {
    axios.delete(`http://18.228.14.48/api/products/${id}`)
      .then(res => {
        this.refreshContent();
      });
  }

  refreshContent() {
    this.searchAll();
    this.refs.formProduct.reset();
    this.refs.description.focus();
  }

  async editProduct(id) {
    let product = await axios.get(`http://18.228.14.48/api/products?cmd=details&id=${id}`)
      .then(res => {
        this.refs.description.value = res.data.description;
        this.refs.short_description.value = res.data.short_description;
        this.refs.code.value = res.data.code;
        this.refs.status.value = res.data.status;
        this.refs.value.value = res.data.value;
        this.refs.qty.value = res.data.qty;

        this.setState({
          editing: true,
          idEditing: res.data.id,
          button: 'Editar'
        });

      });
  }

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="formProduct" className="formProduct">
          <textarea type="text" ref="description" placeholder="Descrição do Produto" className="formFieldProduct" disabled={this.state.editing == null ? 'disabled' : ''} />
          <input type="text" ref="short_description" placeholder="Breve Descrição" className="formFieldProduct" disabled={this.state.editing == null ? 'disabled' : ''} />
          <input type="text" ref="code" placeholder="Código" className="formFieldProduct" disabled={this.state.editing == null ? 'disabled' : ''} />
          <select ref="status" className="formFieldProduct" disabled={this.state.editing == null ? 'disabled' : ''} >
            <option value="enable">Enable</option>
            <option value="disable">Disable</option>
          </select>
          <input type="number" step="0.01" ref="value" placeholder="value" className="formFieldProduct" disabled={this.state.editing == null ? 'disabled' : ''} />
          <input type="number" ref="qty" placeholder="Quantidade" className="formFieldProduct" disabled={this.state.editing == null ? 'disabled' : ''} />
          <button onClick={this.createOrUpdateProduct} className="formProductSubmit" disabled={this.state.editing == null ? 'disabled' : ''} >{this.state.button}</button>
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
