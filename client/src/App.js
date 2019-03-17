import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Head from "./components/head";
import Search from "./components/search";
import "./App.css"

const App = () => {
  
    return (
      <Router>
        
      <div>
        <Head></Head>
        <div className="container">
          <Route exact path="/" component={Search}/>
        </div>
      </div>
      </Router>
      
    );
  
}

export default App;
