import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
   return (
      <div className="NotFound center">
         <h1>404 - Not found</h1>
         <h2>Seems like you have lost..</h2>
         <Link to="/">Back to the homepage...</Link>
      </div>
   );
}
 
export default NotFound;