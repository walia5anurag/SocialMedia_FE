import React from 'react';
import {BrowserRouter,Switch, Route} from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/login/register'
import Dashboard from './container/dashboard/dashboard'
import './App.css';

function App() {
  return (
    <BrowserRouter>
            <Switch>
              <Route path="/register" component={Register}/>
              <Route path='/' exact component={Login}/>
              <Route path='/post' exact component={Dashboard}/>
            </Switch>
    </BrowserRouter>
  
  );
}

export default App;