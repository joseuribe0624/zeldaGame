import React, { Component } from 'react';
import over from './Resources/gameover.jpg'
import "./GameOver.css"
class GameOver extends Component {

  render() {
    return (
      <div className="container"> 
        <div className="col-md-2">
        </div>
        <div className="col-md-8">
          <img className="finish" src={over}/>
        </div>
          <div className="col-md-2">
        </div>
      </div>
    );
  }
}
export default GameOver;
