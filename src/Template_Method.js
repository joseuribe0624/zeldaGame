import React, { Component } from 'react';
import axios from 'axios';

var pathServer = "http://172.17.22.137:3002"; //ruta servidor de nodejs

class TemplateMethod extends Component {

	constructor(props){

		super();

		this.requestGet= this.requestGet.bind(this);
		this.requestPost = this.requestPost.bind(this);
		this.configureRequest = this.configureRequest.bind(this);
		this.alert = this.alert.bind(this);
	}

	// recibir props al momento de establecer un estado
	componentWillReceiveProps(nextProps){

		if(nextProps.objData !== undefined && nextProps.typeQuery !== undefined){
			this.requestGet(nextProps.objData, nextProps.typeQuery, nextProps.path);
		}
	}

	//asignar el request segun el tipo
	configureRequest(objData, type, path){
		if(type === "Google"){
			this.requestPost(objData, "register", "Bienvenido a Zelda");
	        this.props.enterGame(path);
		}else if(type === "register"){
			this.requestPost(objData, "register", "Te has registrado correctamente, ahora inicia para poder jugar");
		}else if(type === "login"){
			this.requestPost(objData, "login", "Bienvenido a Zelda");
	        this.props.enterGame(path);
		}
	}
	
	// consultar usuarios
	requestGet(objData, type, path){ 
		var username = objData.username;
		//localhost:3002/api/user/login 
		axios.get(pathServer+"/api/user/getUser/"+username)

	    .then(response => {
	      if(response.data.data.length === 0){
	      	console.log("no extiste");
	        this.configureRequest(objData, type);
	      }else{
	      	if(type === "login"){
	      		this.configureRequest(objData, type);
	      	}
	      	if(type === "Google"){
	        	this.props.enterGame(path);
	      	}
	       	this.alert("Usted ya se encuentra registrado", "alert-warning");
	      }
	    })
	    .catch(e => {
	      console.log(e);
	    })

	}
	// Registrar usuarios
	requestPost(objData, tag, message){

	    axios.post(pathServer+"/api/user/"+tag, objData)
	      	.then((response) => {
	        	if(response.data.status === 200){
	        		this.alert(message, "alert-success");
	          	}else if(response.data.status === 400){
	        		this.alert("Ha ocurrido un error, verifique los datos ingresados e intente nuevamente", "alert-warning");
	          }

	      }).catch(function (err) {
	          console.log("Ha ocurrido un error interno" + err);
	    });

	}

	// mensaje a mostrar en el alerta
	alert(message, tag){

		var tagClass = "alert alertSuccess alert-dismissible fade show " + tag
		var alertValue = <div className= {tagClass} role="alert">{message}
    			<button type="button" className="close" data-dismiss="alert" aria-label="Close">
      			<span aria-hidden="true">&times;</span>
    			</button>
  			</div>

  		//si dice this.props es que recibe el objeto de un componente padre
  		this.props.connection(alertValue); //funcion desde app
	}
	render(){
		return(
			<div></div>
		)
	}
}
export default TemplateMethod;