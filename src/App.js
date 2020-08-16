import React from 'react';
import './App.css';
import MainPage from './components/MainPage';
import CurlecAdmin from './components/curlecAdmin';
import { Router, Route, Switch } from "react-router";

function App() {
  return (
    <div className="App">
      <MainPage></MainPage>
    </div>
  );
}

export default App;
