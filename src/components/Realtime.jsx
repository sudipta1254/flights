import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import FetchData from "./fetch/FetchData"
import DataRealtime from "./processData/DataRealtime"

const Realtime = () => {
   const { id } = useParams();
   const [searchParams] = useSearchParams()

   const KEY = process.env.REACT_APP_AIR_DEV || process.env.REACT_APP_AIR_PROD;
   const type = searchParams.get("type");
   const code = searchParams.get("code");
   const sort = searchParams.get("sort");

   let { error, loading, data } = FetchData(`https://airlabs.co/api/v9/flights?api_key=${KEY}&${type}${code}=${id}`)

   return (
      <div className="Realtime">
         { error && <b className="error-text">{ error }</b> }
         { loading && <div id="msgBox"></div> }
         { data && <DataRealtime data={data} sort={sort} /> }
      </div>
   );
}
 
export default Realtime;