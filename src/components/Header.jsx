import React from 'react'
import icon1 from "../assets/icon1.png"
import { Link } from "react-router-dom"
import $ from "jquery"
import M from "materialize-css"

const flex = {display:"flex",alignItems:"center",justifyContent:"space-between"};

const Header = () => {
   $(function() {
      $('.header-navlink').on('click', e => {
         M.Sidenav.getInstance($('.sidenav')).close()
      })
   })

   return (
      <header className='header blue lighten-4 green-text text-darken-2' style={flex}>
         <div className="app-logo-text">
            <img src={icon1} alt="app logo" />
            <p><Link to="/">Flighty</Link></p>
         </div>
         <div>
            <a href='#!' data-target="slide-nav" className="sidenav-trigger">
               <i className="material-icons green-text text-lighten-1">menu</i>
            </a>
         </div>
         <ul className="sidenav" id="slide-nav">
            <li><a className="subheader" href="#!">More options</a></li>
            <li><Link className="header-navlink navlink-realtime" to="/">Realtime</Link></li>
            <li><Link className="header-navlink navlink-information" to="/info">Information</Link></li>
            <li><a className="subheader" href="#!">Miscellaneous</a></li>
            <li><Link className="header-navlink navlink-genai" to="/genai">Generative AI</Link></li>
            <li><Link className="header-navlink navlink-chart" to="/weather">Weather info</Link></li>
            <li><Link className="header-navlink navlink-barcode" to="/barcode">Barcode Reader</Link></li>
         </ul>
      </header>
   );
}

export default Header;
