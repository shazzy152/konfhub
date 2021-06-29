import React,{useEffect, useState} from 'react'
import './App.css';
import Table from './components/Table'
import Datavis from './components/Datavis'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact>
          <Table />
        </Route>
        <Route path="/datavis">
          <Datavis />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
