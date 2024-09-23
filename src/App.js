import React from 'react';
import { Route, Router } from 'wouter';
import Home from './pages/Home'; 
import Movie from './pages/Movie';

const App = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/movie/:id" component={Movie} />
    </Router>
  );
};

export default App;
