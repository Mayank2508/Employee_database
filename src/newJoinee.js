import React, { useState } from "react";
import './frame10.css'
import axios from "axios";

const NewEmployee=()=>{

  const [empname,setEmpName]=useState('');
  const [empPosition,setEmpPosition]=useState('');
  const [empLocation,setEmpLocation]=useState('');
  const handlenamechange=(event)=>{
    setEmpName(event.target.value);
  }
  const handlepositionchange=(event)=>{
    setEmpPosition(event.target.value);
  }
  const handlelocationchange=(event)=>{
    setEmpLocation(event.target.value);
  }

  const addEmployee=async()=>{
    try {
      const response=await axios.post(`/api/data`,{
        name:empname,
        position:empPosition,
        location:empLocation
      })
      console.log('Employee added successfully',response.data)
      setEmpName('');
      setEmpPosition('');
      setEmpLocation('');

      
    } catch (error) {
      console.error('Error updating salary:', error);
      
    }
  }



    return(
        <div className="frame10-container">
        <div className="frame10-frame10">
          <div className="frame10-inputs">
            <div className="frame10-textfield">
              <span className="frame10-text">Name</span>
              <input
                type="text"
                placeholder="Enter email or username"
                className="frame10-input-field"
                value={empname}
                onChange={handlenamechange}
              />
            </div>
          </div>
          <div className="frame10-inputs1">
            <div className="frame10-textfield1">
              <span className="frame10-text1">Position</span>
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter the position of employee"
            className="frame10-input-field1"
            value={empPosition}
            onChange={handlepositionchange}
          />
          <span className="frame10-text2">Location</span>
          <div className="frame10-verification">
            <div className="frame10-inputs2">
              <div className="frame10-textfield2">
                <span className="frame10-text3 Label">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter the location"
            className="frame10-input-field2"
            value={empLocation}
            onChange={handlelocationchange}
          />
         <div className="frame10-cta">
  <button className="frame10-cta1" onClick={addEmployee}>
    <span className="frame10-text4">Submit</span>
  </button>
</div>
        </div>
      </div>
    )
}
export default NewEmployee;