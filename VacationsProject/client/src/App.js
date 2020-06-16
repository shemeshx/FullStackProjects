import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import Login from './components/Login.js'
import VacationsUser from './components/VacationsUser';
import VacationsAdmin from './components/VacationsAdmin';
function App() {
return (
  <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/vacationsuser" component={VacationsUser}/>
        <Route path="/vacationsadmin" component={VacationsAdmin}/>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
