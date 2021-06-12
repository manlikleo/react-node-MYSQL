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
            <a className="navbar__logo" href="/tutorials">Node Joke App</a>
            <ul className="navbar__navitems">
              <li className="navbar__navitem"><Link  to={"/tutorials"} className="navbar__navlinks">view Tutorials</Link></li>
              <li className="navbar__navitem"><Link className="navbar__navlinks" to={"/add"}>Add course</Link></li>
            </ul>
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
