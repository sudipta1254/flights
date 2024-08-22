import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

const Script = () => {
   const navigate = useNavigate()
   const [ab, setAb] = useState(false)

   useEffect(() => {
      ab && navigate('/14589')
   }, [navigate, ab])
   
   return { ab, setAb }
}
 
export default Script;