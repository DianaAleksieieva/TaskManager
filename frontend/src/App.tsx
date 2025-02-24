import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Dashboard />
    </div>
  );
}

export default App;
