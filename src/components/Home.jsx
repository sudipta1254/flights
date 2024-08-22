import React from 'react';

const Home = ({ option }) => {
   return (
      <div className="Home">
         <h4 className="center">Welcome to Flight Tracker</h4>
         <h5>{
            <div className="flight-options">
               <p className="text-underline">Start with</p>
               <div className="container">
                  {
                     option === "realtime" ?
                     <>
                        <p>Option 1:</p>
                        <ul className="container">
                           <li>Airline</li>
                           <li>Arrival airport</li>
                           <li>Departure airport</li>
                        </ul>
                        <p>Option 2:</p>
                        <ul className="container">
                           <li>IATA</li>
                           <li>ICAO</li>
                        </ul>
                        <p>Sort flights:</p>
                        <ul className="container">
                           <li>Flight number ↑</li>
                           <li>Flight number ↓</li>
                        </ul>
                     </> :
                     <>
                        <p>Option 1:</p>
                        <ul className="container">
                           <li>Flight IATA</li>
                           <li>Flight ICAO</li>
                        </ul>
                     </>
                  }
               </div>
            </div>
         }</h5>
      </div>
   );
};

export default Home;
