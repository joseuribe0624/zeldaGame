import React, { Component } from 'react';
import finish from './Resources/finish.png'
import "./Finish.css"
class Finish extends Component {

  render() {
    return (
      <div className="container"> 
        <div className="col-md-2">
        </div>
        <div className="col-md-8">
          <img className="finish1" src={finish}/>
        </div>
          <div className="col-md-2">
        </div>
      </div>
    );
  }
}
export default Finish;
