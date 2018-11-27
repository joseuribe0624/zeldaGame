import React, { Component } from 'react';
import logo from './logo_zelda.png';
import './Interface.css';
import './style.css';
import GoogleLogin from 'react-google-login';

import TemplateMethod from './Template_Method';

class Interface extends Component {
  constructor(props){
    super();
    this._isMounted = false;
    this.state = {objData:"", alertValue:"", path:"/game", typeQuery:""};
    this.loginGoogle = this.loginGoogle.bind(this);
    this.getValue = this.getValue.bind(this);
    this.connection = this.connection.bind(this);
    this.register = this.register.bind(this);
    this.enter = this.enter.bind(this);
    this.enterGame = this.enterGame.bind(this);
  }

  componentDidmount(){
    this._isMounted = true;
    this._isMounted && this.setState({objData:"", alertValue:"", path:"/game", typeQuery:""})
  }
  componentWillUnmount(){
    this._isMounted = false;
  }

  connection(alert){
    this._isMounted && this.setState({alertValue:alert, objData:""});
  }

  enter(){
    var objData = {
      user:this.state.user,
      password:this.state.password
    }
     this._isMounted && this.setState({objData:objData, typeQuery:"login"});
  }

  enterGame(route){
    if(this.props.history.location.pathname==="/"){
      this.props.history.push(route);
    }
  }
  register(){
    var objData = {
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      email:this.state.email,
      user:this.state.user,
      password:this.state.password,
      type : 'normal'
    }
     this._isMounted && this.setState({objData:objData, typeQuery:"register"});
  }
  
  getValue(elm){
    //console.log(user:elm.target.value);
    if (elm.target.name === "user"){
      this.setState({user: elm.target.value})
    }
     else if (elm.target.name === "password"){
      this.setState({password: elm.target.value})
    }
     else if (elm.target.name === "first_name"){
      this.setState({first_name: elm.target.value})
    }
     else if (elm.target.name === "last_name"){
      this.setState({last_name: elm.target.value})
    }
    else if (elm.target.name === "email"){
      this.setState({email: elm.target.value})
    }
  }

  loginGoogle(response,type){

    var objData = {

      first_name:response.w3.ofa,
      last_name:response.w3.wea,
      email:response.w3.U3,
      user:response.w3.ig,
      type : type,
      password:"none"
    }
     this._isMounted && this.setState({objData:objData, typeQuery:type});
  }


  render() {

    const responseGoogle = (response) => {
      this.loginGoogle(response,'Google')
    }

    if (this.state.alertValue !== "" && this.state.objData === ""){
      this.callTemplate = false
    }else{
      this.callTemplate = true
    }
    console.log(this.state.objData);
    return (
      <div className="Interface">

        <div className="container">
          <div className="row">
            <div className="col">
            <img src={logo} className="log"/>
              <div className="backDiv">
                <p>Ingresa tus datos para iniciar seccion</p>
                <form onSubmit={this.getValue}>
                  <label>Usuario</label>
                  <input type="text" name="user" onChange={this.getValue} placeholder="Usuario"/>
                  <label>Contraseña</label>
                  <input type="password" name="password" onChange={this.getValue} placeholder="Contraseña"/>
                <div>
                  <button onClick={this.enter} type="button" className="btn btn-success boton1">Entrar</button>
                </div>
               
                </form>
                <p>Si tienes cuenta en google+, inicia seccion aqui</p>
                <div className="google">
                 <GoogleLogin 
                clientId="749350337507-o999v92oarpmrevhit71i211l5pf95f2.apps.googleusercontent.com"
                buttonText="Iniciar con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                />
                </div>
                
              </div>
            </div>
            <div className="col-sm-1">
            </div>
            <div className="col">
              <div className="backDiv2">
                <p>Si no tiene cuenta registrate</p>
                <form onSubmit={this.getValue}>
                  <label>Nombre</label>
                  <input type="text" name="first_name" onChange={this.getValue} placeholder="Nombre"/>
                  <label>Apellido</label>
                  <input type="text" name="last_name" onChange={this.getValue} placeholder="Apellido"/>
                  <label>Correo electronico</label>
                  <input type="text" name="email" onChange={this.getValue} placeholder="Correo electronico"/>
                   <label>Confirmar Contraseña</label>
                  <input type="text" name="user" onChange={this.getValue} placeholder="usuario"/>
                  <label>Contraseña</label>
                  <input type="password" name="password" onChange={this.getValue} placeholder="Contraseña"/>
                 
                  <button type="button" onClick={this.register} className="btn btn-success boton2">Registrarse</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        { this.callTemplate === true ?<TemplateMethod objData={this.state.objData} type={this.state.typeQuery} 
        path={this.state.path} enterGame={this.enterGame} connection={this.connection} /> : null}

      </div>
    );
  }
}

export default Interface;
