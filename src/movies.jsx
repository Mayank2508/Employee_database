import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data'); // Fetch data from Express API
        setMovies(response.data); // Set fetched data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  return (
    
    
    
    <div>
   
      <h1>High Performance Employee</h1>
      <div className="card-container">
        {movies.map(movie => (
            
          <MovieCard key={movie.id} movie={movie} />
          
        ))}
      </div>
      
      <button type='button' onClick={()=>{
        navigate('/newJoinee')
      }}> New Joinee</button>
      
    </div>
   
    
  );
};

export default MovieList;
