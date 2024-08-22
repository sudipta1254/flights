import React from 'react'
import { CountryName, CountryFlag, AirlineFlag, Interval, UTCtoIST, Distance } from "../helper/Helper"

const DataInformation = ({ data }) => {
   const dts = data.response;
   
   return (
      <div className="DataInformation">
         { data.error ? <b className="error-text">{ data.error.message }</b> :
            !Object.keys(dts).length ? <b className="error-text">No data found!</b> :
            Object.keys(dts).length &&
            <div id="data">
               { <h6 className="center text-underline">Departure</h6> }
               <div className="data-scroll">
                  { dts.dep_name ? <>Departure: <b>{dts.dep_name}, {dts.dep_city}, {CountryName(dts.dep_country)} {CountryFlag(dts.dep_country)}</b><br/></> : null }
                  { dts.dep_icao ? <>Departure ICAO/IATA: <b>{`${dts.dep_icao}/${dts.dep_iata}`}</b><br/></> : null }
                  { dts.dep_terminal ? <>Terminal: <b>{dts.dep_terminal}</b><br/></> : null }
                  { dts.dep_gate ? <>Gate: <b>{dts.dep_gate}</b><br/></> : null }
                  { dts.dep_time_utc ? <>Departure time: <b>{UTCtoIST(dts.dep_time_utc)}</b><br/></> : null }
                  { dts.dep_estimated_utc && dts.dep_actual_utc ?
                     dts.dep_estimated_utc === dts.dep_actual_utc &&
                        <>Departed: <b>{UTCtoIST(dts.dep_actual_utc)}</b><br /></>
                     : (<>
                           { dts.dep_estimated_utc ? <>Estimated: <b>{UTCtoIST(dts.dep_estimated_utc)}</b></> : null }
                           { dts.dep_actual_utc ? <>Departed: <b>{UTCtoIST(dts.dep_actual_utc)}</b></> : null }
                        </>
                  )}

                  {/* Airline */}
                  { dts.airline_name ? <>Airline: <b>{dts.airline_name} {AirlineFlag(dts.airline_iata)}</b><br/></> : null }
                  { dts.airline_icao ? <>Airline ICAO/IATA: <b>{dts.airline_icao}/{dts.airline_iata}</b><br/></> : null }
                  { !dts.airline_name ? <>{AirlineFlag(dts.airline_iata)}<br/></> : null }
                  { dts.flight_icao ? <>Flight ICAO/IATA: <b>{dts.flight_icao}/{dts.flight_iata}</b><br/></> : null }
                  { dts.flight_number ? <>Flight Number: <b>{dts.flight_number}</b><br/></> : null }
                  { dts.reg_number ? <>Registration: <b>{dts.reg_number}</b><br/></> : null }
                  { dts.flag ? <>Flag: <b>{CountryName(dts.flag)} {CountryFlag(dts.flag)}</b><br/></> : null }
                  { dts.lat ? <>Position: <b>{dts.lat.toFixed(2)}, {dts.lng.toFixed(2)}</b><br/></> : null }
                  { dts.alt ? <>Altitude: <b>{(dts.alt*3.28).toFixed(0)} ft</b><br/></> : null }
                  { dts.dir ? <>Direction: <b>{dts.dir}°</b><br/></> : null }
                  { dts.speed ? <>Speed: <b>{dts.speed} Kmph</b><br/></> : null }
                  { dts.v_speed ? <>Speed: <b>{dts.v_speed} Kmph</b><br/></> : null }
                  { dts.squawk ? <>Squawk: <b>{dts.squawk}</b><br/></> : null }
               </div>

               { <h6 className="center text-underline">Arrival</h6> }
               <div className="data-scroll">
                  { dts.arr_name ? <>Arrival: <b>{dts.arr_name}, {dts.arr_city}, {CountryName(dts.arr_country)} {CountryFlag(dts.arr_country)}</b><br/></> : null }
                  { dts.airline_icao ? <>Arrival ICAO/IATA: <b>{dts.arr_icao}/{dts.arr_iata}</b><br/></> : null }
                  { dts.arr_baggage ? <>Baggage: <b>{dts.arr_baggage}</b><br/></> : null }
                  { dts.arr_terminal ? <>Terminal: <b>{dts.arr_terminal}</b><br/></> : null }
                  { dts.arr_gate ? <>Gate: <b>{dts.arr_gate}</b><br/></> : null }
                  { dts.arr_time_utc ? <>Arrival time: <b>{UTCtoIST(dts.arr_time_utc)}</b><br/></> : null }
                  { dts.arr_estimated_utc && dts.arr_actual_utc ?
                     dts.arr_estimated_utc === dts.arr_actual_utc &&
                        <>Departed: <b>{UTCtoIST(dts.arr_actual_utc)}</b><br /></>
                     : (<>
                           { dts.arr_estimated_utc ? <>Estimated: <b>{UTCtoIST(dts.arr_estimated_utc)}</b><br /></> : null}
                           { dts.arr_actual_utc ? <>Arrived: <b>{UTCtoIST(dts.arr_actual_utc)}</b><br /></> : null}
                        </>
                  )}
                  { dts.duration ? <>Duration: <b>{Interval(dts.duration)}</b><br/></> : null }
                  { dts.delay ? <>Delay: <b>{Interval(dts.delay)}</b><br/></> : null }
                  { dts.dep_delayed ? <>Departure delay: <b>{Interval(dts.dep_delayed)}</b><br/></> : null }
                  { dts.arr_delayed ? <>Arrival delay: <b>{Interval(dts.arr_delayed)}</b><br/></> : null }

                  {/* Manufacturer */}
                  { dts.model ? <>Airliner: <b>{dts.model} - {dts.manufacturer}</b><br/></> : null }
                  { dts.aircraft_icao ? <>Aircraft ICAO: <b>{dts.aircraft_icao}</b><br/></> : null }
                  { dts.engine ? <>Engine: <b>{dts.engine_count} {dts.engine}</b><br/></> : null }
                  { dts.built && dts.age ? <>Built: <b>{dts.built} - {dts.age+2}y</b><br/></> : null }
                  { dts.eta && dts.eta > -1 ? <>Arriving in <b>{Interval(dts.eta)}</b><br/></> : null }
                  { dts.status ? <>Status: <b>{dts.status}</b><br/></> : null }
                  { dts.updated ? <>Updated: <b>{UTCtoIST(dts.updated)}</b><br/></> : null }
               </div>

               { dts.dep_iata && dts.arr_iata && dts.percent ?
                  Distance(dts.dep_iata, dts.arr_iata, dts.percent) : null
               }
            </div>
         }
      </div>
   );
}
 
export default DataInformation;