import React, { useState,useEffect } from 'react';
import axios from 'axios';

function MovieCard({ movie }) {
  const [newSalary, setNewSalary] = useState('');
  const [updatedSalary, setUpdatedSalary] = useState(movie.salary);
  const [newposition,setNewPosition]=useState('');
  const [updatedPosition,setUpdatedPosition]=useState(movie.position);
  const [newlocation,setNewLocation]=useState('');
  const [updatedlocation,setUpdatedLocatoin]=useState(movie.location);

  const handlelocationchange=(event)=>{
    setNewLocation(event.target.value);
  }
  


  const handlepositionchange=(event)=>{
    setNewPosition(event.target.value);
  }
  const handleInputChange = (event) => {
    setNewSalary(event.target.value);
  };
  const updatePosition=async()=>{
    try {
      const response = await axios.put(`/api/data/${movie._id}`, { position: newposition });
      setUpdatedPosition(response.data.position);
      setNewPosition(''); // Clear input field after updating salary
    } catch (error) {
      console.error('Error updating position:', error);
    }
  }
const updatelocation=async ()=>{
  try {
    const response = await axios.put(`/api/data/${movie._id}`, { location: newlocation });
    setUpdatedLocatoin(response.data.location);
    setNewLocation('');
  } catch (error) {
    console.error('Error updating location:', error);
  }
}
  const updateSalary = async () => {
    try {
      const response = await axios.put(`/api/data/${movie._id}`, { salary: newSalary });
      setUpdatedSalary(response.data.salary);
      setNewSalary(''); // Clear input field after updating salary
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{movie.name}</h5>
        <p className="card-text">Position: {updatedPosition}</p>
        <p className="card-text">Address: {updatedlocation}</p>
        <p className="card-text">Salary: {updatedSalary}</p>
        <div className="input-group mb-3">
          <div className="input-group-append">
            <input type="number" className="form-control" placeholder="Enter new salary" value={newSalary} onChange={handleInputChange} />
            <button className="btn btn-primary" type="button" onClick={updateSalary}>Update Salary</button>
            <br></br>
            <input type="text" className="form-control" placeholder="Enter Position" value={newposition} onChange={handlepositionchange} />
            <button className="btn btn-primary" type="button" onClick={updatePosition}>Update Position</button>
            <br></br>
            <input type="text" className="form-control" placeholder="Enter location" value={newlocation} onChange={handlelocationchange} />
            <button className="btn btn-primary" type="button" onClick={updatelocation}>Update Location</button>
          

          </div>
        </div>
      </div>
    </div>
  );
}


export default MovieCard;
