import React from 'react';
import Top5movies from '../components/Top5movies/Top5movies'; 
import Top5actors from '../components/Top5actors/Top5actors';
import '../pages/Home.css'; 

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Movie Rentals</h1>
        <p>Explore our top 5 most rented films of all time.</p>
      </section>

      <Top5movies />
      <Top5actors />

    </div>
  );
};

export default Home;
