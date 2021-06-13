import React from 'react';
import {Switch,Route,Link} from 'react-router-dom';
import './css/style.min.css';


import add from './components/Add';
import list from './components/List';
import tutorial from './components/Tutorial';

function App() {
    return (

      <div className="App">

        <nav className="navbar">
            <div className="navbar__wrapper">
                <a className="navbar__logo" href="/tutorials">Node Joke App</a>
                <ul className="navbar__navitems">
                  <li ><Link className="navbar__navitem"  to={"/tutorials"}>View Tutorials</Link></li>
                  <li ><Link className="navbar__navitem" to={"/add"}>Add course</Link></li>
                </ul>
            </div>
        </nav>
        <div> 
          <Switch>
            <Route exact path= {["/","/tutorials"]} component={list}/>
            <Route exact path= "/add" component={add}/>
            <Route path= "/tutorials/:id" component={tutorial}/>
          </Switch>
        </div>
        
      </div>
    );
  
}


export default App;
