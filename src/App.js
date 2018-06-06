import React, { Component } from 'react';
import './App.css';
import Drawer from "./components/Drawer";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details"
import { BrowserRouter as Router,Switch, Route} from "react-router-dom";
import Modal from "./components/Modal/Modal"
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, {history} from "./store";

class App extends Component {
  render() {
    return (

      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <div className="main">
              <Drawer />
              <Switch>
                <Route exact path="/" component={Home} />         	
                <Route path="/details/:id" component={Details} />
              </Switch>
            </div> 
          </div>
        </ConnectedRouter>
      </Provider>


    );
  }
}

export default App;
