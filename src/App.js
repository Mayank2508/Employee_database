import React from "react";
import MovieList from './movies';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  NewEmployee from "./newJoinee";


function App() {
  return (
    <div>
      <Router>
      
      
        <Routes>
        <Route path="/" element={<MovieList/>} />
        <Route path="/newJoinee" element={<NewEmployee/>}/>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
