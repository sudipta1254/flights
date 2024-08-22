import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import OptionsRealtime from './options/OptionsRealtime';
import OptionsInformation from './options/OptionsInformation';
import NotFound from './NotFound';
import Realtime from "./Realtime"
import Information from './Information';
import Weather from './weather/Weather';
import GenAI from './genAI/GenAI';
import "../index.css"
import BarcodeScanner from './Scanner';

const Main = () => {
   const [inpRealtime, setInpRealtime] = useState(null)
   const [inpInformation, setInpInformation] = useState(null)

   return (
      <div className="Main">
         <div className='container'>
            <Routes>
               <Route path="/"
               element={
                  <>
                     <OptionsRealtime inpRealtime={inpRealtime} setInpRealtime={setInpRealtime} />
                     <Home option={"realtime"} />
                  </>
               }
               />
               <Route path="/info"
               element={
                  <>
                     <OptionsInformation inpInformation={inpInformation} setInpInformation={setInpInformation} />
                     <Home option="information" />
                  </>
               }
               />
               <Route path="/genai" element={ <GenAI /> } />
               <Route path="/weather" element={ <Weather /> } />
               <Route path="/barcode" element={ <BarcodeScanner /> } />
               <Route path="/:id"
               element={
                  <>
                     <OptionsRealtime inpRealtime={inpRealtime} setInpRealtime={setInpRealtime} />
                     <Realtime />
                  </>
               }
               />
               <Route path="/info/:id"
               element={
                  <>
                     <OptionsInformation inpInformation={inpInformation} setInpInformation={setInpInformation} />
                     <Information />
                  </>
               }
               />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
      </div>
   );
};

export default Main;
