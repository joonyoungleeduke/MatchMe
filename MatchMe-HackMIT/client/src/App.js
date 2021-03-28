import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Routes from "./Routes";

const App = props => {
  
  useEffect(() => {
    document.title = "MatchMe";
}, []);

return(
    <div>
        <Routes />
    </div>
  );
};


export default App;