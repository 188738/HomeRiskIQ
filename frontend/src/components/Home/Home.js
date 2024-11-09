import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import './Home.css';

function Home() {
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
    <div className="home">
      <header className="home-header">
        <h1>Welcome to HomeRiskIQ</h1>
      </header>
      
      <section className="home-intro">
        <p>Supporting Lennar in evaluating land acquisition risks for building safe, sustainable communities.</p>
      </section>

      <section className="home-description">
        <div className="description-box">
          <h2>Why Use HomeRiskIQ?</h2>
          <p>Acquiring land for residential communities involves various risks, such as crime rates, environmental factors, and competitive presence. HomeRiskIQ provides a data-driven approach to assess these risks, enabling informed and confident decisions for land deals.</p>
        </div>
      </section>

      <section className="home-prompt">
        <div className="prompt-box">
          <h2>Calculate Risk Scores for Land Acquisition</h2>
          <p>Enter a land address to generate one or more risk scores. Our system will use available data sources to provide insights into potential risks, helping you evaluate the viability and safety of your acquisition.</p>
          <p>HomeRiskIQ enables teams to focus on specific risk domains, offering flexibility in data selection to tailor results for each unique acquisition scenario.</p>
        </div>
      </section>

      

    </div>
  );
}

export default Home;

