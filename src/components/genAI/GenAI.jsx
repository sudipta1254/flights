import React, { useEffect, useState } from 'react'
import spark from "../../assets/spark.svg"
import M from "materialize-css"
import MarkDown from "react-markdown"
import "materialize-css/dist/css/materialize.min.css"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { handleEnter, setHeaderNFavicon } from "../helper/Helper"
import "../../index.css"

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GENAI_KEY);

const GenAI = () => {
   useEffect(() => {
      M.AutoInit();
      setHeaderNFavicon("Gemini 1.5 Flash")
   }, [])
   const [input, setInput] = useState(null)
   const [data, setData] = useState(null)
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)
   
   const generateContent = async() => {
      if (!input) {
         alert("Enter prompt to continue..")
         return
      }
      setLoading(true)
      try {
         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
         const prompt = input
         const result = await model.generateContent(prompt);
         const response = result.response;
         const text = response.text();
         setData(text)
         setError(null)
         setLoading(false)
      } catch (err) {
         console.log(err)
         setData(null)
         setError(err)
         setLoading(false)
      }
   }

   return (
      <div className="GenAI container">
         <h3 className="center">Gemini 1.5 Flash
            <img src={spark} alt="spark" />
         </h3>
         <div className="input-container">
            <input id="GenAI-input" type="text" placeholder="Enter prompt.."
               onKeyDown={ e => handleEnter(e, ".GenAI-btn") }
               onChange={ e => setInput(e.target.value?.trim()) }
            />
            <i className="material-icons GenAI-btn" type="button"
               onClick={ generateContent }
            >send</i>
         </div>
         <div className="message-text">
            { error }
            { loading && <div id="msgBox"></div> }
         </div>
         <div className="markdown-container">
            <MarkDown>{ data }</MarkDown>
         </div>
      </div>
   );
}
 
export default GenAI;