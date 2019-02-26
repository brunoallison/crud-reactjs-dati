import React, { Component } from 'react';
import ProductList from '../components/ProductList/ProductList';
import axios from 'axios';
import '../assets/css/main.css';
import Swal from 'sweetalert2'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'CRUD de Produtos dati.',
      term: '',
      editing: false,
      idEditing: '',
      button: 'Salvar',
      datas: [],
      descriptionValidate: '',
      fields: {},
      errors: {}
    };

    this.showProduct = this.showProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.setToCreate = this.setToCreate.bind(this);
    this.createOrUpdateProduct = this.createOrUpdateProduct.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  async componentDidMount() {
    this.refs.description.focus();
    await this.searchAll();
  }

  async searchAll() {
      const products = await axios.get('http://18.228.14.48/api/products?cmd=list')
          .catch(function (error) {
              this.errorMessage();
              console.log(error);
          });
      this.setState({
          datas: products.data
      });
  }

  successMessage(message) {
    Swal.fire(
        message,
        'Clique em ok para continuar!',
        'success'
    );
  }

  errorMessage() {
      Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Alguma coisa está errado!',
          footer: '<a href>Porque isso acontece?</a>'
      })
  }

  createOrUpdateProduct(e) {
      e.preventDefault();

      if (!this.handleValidation()) {
          return false;
      }

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
                  this.successMessage("Inserido com sucesso");
                  this.refreshContent();
              }).catch(function (error) {
                  this.errorMessage();
                  console.log(error);
              });
      } else {
          axios.put(`http://18.228.14.48/api/products/${this.state.idEditing}`, product)
              .then(res => {
                  this.successMessage("Editado com sucesso");
                  this.refreshContent();

                  this.setState({
                      editing: false,
                      idEditing: '',
                      button: 'Salvar'
                  });
              }).catch(function (error) {
                  this.errorMessage();
                  console.log(error);
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
                  editing: null,
                  button: 'Criar novo produto'
              });

          }).catch(function (error) {
              this.errorMessage();
              console.log(error);
          });
  }

  removeProduct(id) {
      Swal.fire({
          title: 'Você tem certeza que deseja remover?',
          text: "Não será possivel reverter!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Deletar!',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.value) {
              axios.delete(`http://18.228.14.48/api/products/${id}`)
                  .then(res => {
                      Swal.fire(
                          'Removido!',
                          'Produto removido.',
                          'success'
                      )
                      this.refreshContent();
                  }).catch(function (error) {
                      this.errorMessage();
                      console.log(error);
                  });
          }
      })
  }

  refreshContent() {
    this.searchAll();
    this.refs.formProduct.reset();
    this.refs.description.focus();
    this.setState({ fields:{}, errors:{} });
  }

  async editProduct(id) {
      this.setState({
          fields: {},
          errors: {}
      });
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
                  button: 'Editar',
                  fields: {
                      description: res.data.description,
                      short_description: res.data.short_description,
                      code: res.data.code,
                      status: res.data.status,
                      value: res.data.value,
                      qty: res.data.qty
                  }
              });

          }).catch(function (error) {
              this.errorMessage();
              console.log(error);
          });
  }

  changeStatus(id, currentStatus) {
      const status = currentStatus == 'enable' ? 'disable' : 'enable';
      let product = {
          status
      };
      axios.put(`http://18.228.14.48/api/products/${id}`, product)
          .then(res => {
              this.refreshContent();
          }).catch(function (error) {
              this.errorMessage();
              console.log(error);
          });;
  }

  searchHandler(e) {
    this.setState({ term: e.target.value })
  }

  setToCreate(e) {
    e.preventDefault();

    this.refs.formProduct.reset();

    this.setState({
      editing: false,
      button: 'Salvar'
    });
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Description
    if (!fields["description"]) {
      formIsValid = false;
      errors["description"] = "Descrição não pode ser vazia";
    }

    if(typeof fields["description"] !== "undefined"){
      if (fields["description"].length > 150) {
        formIsValid = false;
        errors["short_description"] = "Descrição deve ter no máximo 150 caracteres";
      }
    }

    if (!fields["short_description"]) {
      formIsValid = false;
      errors["short_description"] = "Breve descrição não pode ser vazia";
    }

    if(typeof fields["short_description"] !== "undefined"){
      if (fields["short_description"].length > 30) {
        formIsValid = false;
        errors["short_description"] = "Breve descrição deve ter no máximo 30 caracteres";
      }
    }

    if (!fields["code"]) {
      formIsValid = false;
      errors["code"] = "Código não pode ser vazio";
    }

    if(typeof fields["code"] !== "undefined"){
      if (fields["code"].length > 10) {
        formIsValid = false;
        errors["code"] = "Código deve ter no máximo 10 caracteres";
      }
    }

    if (!fields["value"]) {
      formIsValid = false;
      errors["value"] = "Valor não pode ser vazio";
    }

    if(typeof fields["value"] !== "undefined"){
      if (fields["value"] < 0) {
        formIsValid = false;
        errors["value"] = "Valor deve ser positivo";
      }
    }

    if (!fields["qty"]) {
      formIsValid = false;
      errors["qty"] = "Quantidade não pode ser vazio";
    }

    if(typeof fields["qty"] !== "undefined"){
      if (fields["qty"] < 0) {
        formIsValid = false;
        errors["qty"] = "Quantidade deve ser positiva";
      }
      if (!Number.isInteger(parseFloat(fields["qty"]))) {
        formIsValid = false;
        errors["qty"] = "Quantidade deve ser um número inteiro";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  render() {
    const { datas, term } = this.state;

    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="formProduct" className="formProduct">
          {this.state.descriptionValidate == '' ? '' : this.state.descriptionValidate}
          <textarea type="text" ref="description" placeholder="Descrição do Produto" onChange={this.handleChange.bind(this, "description")} className="formFieldProduct" disabled={this.state.editing == null ? 'disabled' : ''} required />
          <span style={{color: "red"}}>{this.state.errors["description"]}</span>
          <input type="text" ref="short_description" placeholder="Breve Descrição" onChange={this.handleChange.bind(this, "short_description")} className="formFieldProduct" disabled={this.state.editing == null ? 'disabled' : ''} required />
          <span style={{color: "red"}}>{this.state.errors["short_description"]}</span>
          <input type="text" ref="code" placeholder="Código" onChange={this.handleChange.bind(this, "code")} className="formFieldProduct" disabled={this.state.editing == null ? 'disabled' : ''} required />
          <span style={{color: "red"}}>{this.state.errors["code"]}</span>
          <select ref="status" className="formFieldProduct" disabled={this.state.editing == null ? 'disabled' : ''} >
            <option value="enable">Ativado</option>
            <option value="disable">Desativado</option>
          </select>
          <input type="number" step="0.01" ref="value" placeholder="Valor" onChange={this.handleChange.bind(this, "value")} className="formFieldProduct" disabled={this.state.editing == null ? 'disabled' : ''} required />
          <span style={{color: "red"}}>{this.state.errors["value"]}</span>
          <input type="number" ref="qty" placeholder="Quantidade" onChange={this.handleChange.bind(this, "qty")} className="formFieldProduct" disabled={this.state.editing == null ? 'disabled' : ''} required />
          <span style={{color: "red"}}>{this.state.errors["qty"]}</span>
          <button onClick={this.state.editing == null ? this.setToCreate : this.createOrUpdateProduct } className="formProductSubmit" >{this.state.button}</button>
        </form>

        <form ref="searchProduct" className="formProduct">
          <input type="text" ref="term" placeholder="Buscar por descrição" className="formFieldProduct" onChange={this.searchHandler} />
        </form>

        <div className="flex-container">
          { 
            datas.filter(
              data => {
                return data.description.toLowerCase().indexOf(term.toLowerCase()) >= 0
              }
            )
            .map( data => 
              <ProductList
                key={data.id}
                id={data.id}
                short_description={data.short_description}
                description={data.description}
                value={data.value}
                status={data.status}
                showProduct={this.showProduct}
                removeProduct={this.removeProduct}
                editProduct={this.editProduct}
                changeStatus={this.changeStatus}
              />
            )
          }
        </div>
      </div>
    );
  }
}

export default Main;
