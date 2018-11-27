import React, { Component } from 'react'
import { Stage, Layer, Image } from 'react-konva'
import linkA from './Resources/front_green.gif'
// import linkI from './Resources/left_green.gif';
// import linkD from './Resources/right_green.gif';
// import linkB from './Resources/back_green.gif';
import coin from './Resources/coin.png'
import life from './Resources/life.png'
import diamond2 from './Resources/diamante2.png'
import diamond1 from './Resources/diamante1.png'
import './GameLogic.css'
import GameOver from './GameOver'
import FinishGame from './Finish'


let linkZelda = new window.Image()
let badDiamond = new window.Image()
let goodDiamond = new window.Image()
let finish = 0
let good = false
let bad=false
function generateRandomNumber(min , max) {
   		let random_number = Math.random() * (max-min) + min;
    	return Math.floor(random_number);
}
class GameLogic extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			imageBase: linkA,
			positionX: 10,
			positionY: 10,
			bad : diamond2,
			good: diamond1,
		    lifeLink: 3,
		    scoreLink: 0,
		    badX: generateRandomNumber(0,400),
		    badY: generateRandomNumber(0,400),
		    goodX: generateRandomNumber(0,400),
		    goodY: generateRandomNumber(0,400)
		}
	}

	componentDidMount(){
    console.log(this.refs)
		// setear o definir los elementos de nuestro contador
	}

	componentWillMount(){
		// limpiar y reiniciar los valores del contador
	}

	counter(){
		this.setState({goodY: generateRandomNumber(0,400)})
		this.setState({goodX: generateRandomNumber(0,400)})
		good=false
	
	
		this.setState({badY: generateRandomNumber(0,400)})
		this.setState({badX: generateRandomNumber(0,400)})	
		good=false
		
	}

	handleEscKey = (e) => {
    if (e.key === "ArrowRight") {
      this.setState({positionX: this.state.positionX+10})
    } else if (e.key === "ArrowLeft") {
      this.setState({positionX: this.state.positionX-10})
    } else if (e.key === "ArrowUp") {
      this.setState({positionY: this.state.positionY-10})
    } else if (e.key === "ArrowDown") {
      this.setState({positionY: this.state.positionY+10})
    }
    console.log(this.state)
		// captura de los eventos de las teclas y toma de decisiones
    e.preventDefault();
	if (this.state.positionX === 410){
		 this.setState({positionX: this.state.positionX-this.state.positionX})
	}else if (this.state.positionY === 410){
		this.setState({positionY: this.state.positionY-this.state.positionY})
	}
	
	if ( this.state.badX-10 <= this.state.positionX && this.state.positionX <= this.state.badX+10
	   && this.state.badY-10 <= this.state.positionY && this.state.badY+10 >= this.state.positionY){
		if (this.state.lifeLink === 1){
			finish=1
		}
		else{
			this.state.lifeLink=this.state.lifeLink-1
		}
		bad=true
		this.counter();		
	}
	if ( this.state.goodX-10 <= this.state.positionX && this.state.positionX <= this.state.goodX+10
	   && this.state.goodY-10 <= this.state.positionY && this.state.goodY+10 >= this.state.positionY){
		if (this.state.scoreLink === 2){
			finish=2
		}
		else{
			this.state.scoreLink=this.state.scoreLink+1
		}
		good = true
		this.counter();
	}
	}

	returnHome(){
	  window.location.replace("http://localhost:3000");

	}
	render(){ 

    if (finish == 0){
    	linkZelda.src = this.state.imageBase;
		linkZelda.onload = () => {
	      this.imageNode.getLayer().batchDraw();
	    };
	    badDiamond.src = this.state.bad;
			badDiamond.onload = () => {
	      this.imageNode.getLayer().batchDraw();
	    };
	    goodDiamond.src = this.state.good;
			goodDiamond.onload = () => {
	           this.imageNode.getLayer().batchDraw();
	        };
		return(

				<div ref="div" className="row row-game" tabIndex="0" onKeyDown={this.handleEscKey}>
					
					<div className = "col-md-12">
						<div><button className="exit-button" onClick={this.returnHome}>Terminar Juego</button></div>
					</div>
					<div className="col-md-4"></div>
					<div className="col-md-4">
						<div className="information col-md-12">
							<div className="col-md-4">
								<img src={life} alt="" className="img-bar"/><p>Vidas: {this.state.lifeLink}</p>
							</div>
							<div className="col-md-2"></div>
							<div className="col-md-4">
								<img src={coin} alt="" className="img-bar"/><p>Puntos: {this.state.scoreLink}</p>
							</div>
						</div>
						<Stage
	            width={414}
	            height={414}
	            ref="canvas"
	          >
	            <Layer>
	              <Image
	                image={linkZelda}
	                y={this.state.positionY}
	                x={this.state.positionX}
	                width={30}
	                height={40}
	                ref={node => {
	                  this.imageNode = node;
	                }}
	              />
	              <Image 
	                image={badDiamond}
	                y={this.state.badY}
	                x={this.state.badX}
	                width={20}
	                height={40}
	                ref={node => {
	                  this.imageNode = node;
	                }}
	              />
	              <Image 
	                image={goodDiamond}
	                y={this.state.goodY}
	                x={this.state.goodX}
	                width={20}
	                height={40}
	                ref={node => {
	                  this.imageNode = node;
	                }}
	              />
	            </Layer>
	          </Stage>
					</div>
					<div className="col-md-4"></div>
				</div>
			)
		}
		else if(finish == 1){
			return(
				<GameOver />
			)
		}
		else if(finish == 2){
			return(
				<FinishGame />
			)
		}
	}
}

export default GameLogic;