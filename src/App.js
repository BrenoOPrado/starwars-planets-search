import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Planet from './components/Planet';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" exact component={ Planet } />
      </Switch>
    </main>
  );
}

export default App;
