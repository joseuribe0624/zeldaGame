import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Switch} from 'react-router';
import Interface from './Interface';
import GameLogic from './GameLogic';

class App extends Component {
    

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={({history}) => <Interface history={history}/>
              }></Route>
            <Route exact path="/game" render={({history}) => <GameLogic history={history}/>
              }></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
