import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import './CalculateRisk.css';


function CalculateRisk() {
    const [address, setAddress] = useState('');
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the address submission here
        console.log("Submitted address:", address);
        // You could add logic here to fetch risk score based on address
      };
  return (
    <div>
    <form onSubmit={handleSubmit} className="form">
        <h1>Enter Address</h1>
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
          placeholder="Enter land address"
        />
        
      </form>
      <br>
      </br>
      <button type="submit" onSubmit={handleSubmit}>Calculate Risk Score</button>

      

    </div>
  );
}

export default CalculateRisk;