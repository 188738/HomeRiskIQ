import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/risk');
  };


  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to HomeRiskIQ</h1>
      </header>
      
      <main className="home-content">
        <section className="home-intro">
          <p>Supporting Lennar in evaluating land acquisition risks for building safe, sustainable communities.</p>
        </section>

        <section className="home-description">
          <h2>Why Use HomeRiskIQ?</h2>
          <p>Acquiring land for residential communities involves various risks, such as crime rates, environmental factors, weather conditions, and employment prospects. HomeRiskIQ provides a data-driven approach to assess these risks, enabling informed and confident decisions for land deals.</p>
          <h2>Calculate Risk Scores for Land Acquisition</h2>
          <p>Enter a land address to generate one or more risk scores. Our system will use available data sources to provide insights into potential risks, helping you evaluate the viability and safety of your acquisition.</p>
          <div className='button-container'>
            <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;