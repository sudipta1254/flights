import React from 'react'
import $ from "jquery"
import { Country } from '../../assets/env'

/* Returns country name from an object */
export const CountryName = (code) => {
   return Country[code]
}

/* Returns an image of country flag */
export const CountryFlag = (flag) => {
   flag = flag === "UK" ? "gb" : flag;
   return <img alt="(Country flag)" src={`https://flagcdn.com/24x18/${flag?.toLowerCase()}.png`} />
}

/* Return an image of airline logo */
export const AirlineFlag = (logo) => {
   return <div id="logo-div"><img alt="(Airline flag)" src={`https://airlabs.co/img/airline/m/${logo}.png`} id='logo' /></div>
}

/* Converts UTC to IST & returns it */
export const UTCtoIST = (t) => {
   let vr = typeof t === 'string' ? new Date(t + 'Z') : new Date(t * 1000);
   return vr.toLocaleString().replace(':00', '');
}

/* Returns a string in xDays,xHours,xMinutes format */
export const Interval = (t) => {
   let day =  Math.floor(t/24/60),
      hour = Math.floor(t/60%24),
      min = Math.floor(t%60),
      str = '';
   if(day)
      str = day+' day(s), ';
   if(hour)
      str += hour+' hour(s), ';
   if(min)
      str += min+' min(s)';
   return str;
}

/* Sorts flights by flight number in ascending/descending order */
export const SortFlight = (term, data) => {
   if(term)
      if(term?.includes('_a'))
         data?.sort(function(a, b) {
            return a[term?.slice(0,-2)] - b[term?.slice(0,-2)];
         });
      else
         data?.sort(function(a, b) {
            return b[term?.slice(0,-2)] - a[term?.slice(0,-2)];
         });
}

/* Handles click event for `enter` */
export const handleEnter = (e, target = ".btn-enter") => {
   if (e.key === 'Enter') {
      if(!e.target.value?.trim()) {
         alert("Enter data to continue..")
         return
      }
      e.preventDefault();
      e.target.blur()
      $(target).trigger("click");
   }
}

/* Returns a JSX of distance visualization */
export const Distance = (dep, arr, x) => {
   if(x > -1) {
      document.documentElement.style.setProperty("--smiley-margin", `-15px 0 0 ${x+1}%`);
      return (
         <span id='distance'>
            <span id='dep'>{ dep }</span>
            <span id='line-p'>
               <span id='line' style={{width:`${x}%`}}></span>
            </span>
            <span id='arr'>{ arr }</span>
         </span>
      )
   }
}

/* Sets the title & favicon of a page */
export const setHeaderNFavicon = (title) => {
   const link = document.querySelector("link[rel~='icon']"),
      iconUrl = "../../assets/icon1.png";
   if (title)
      document.title = title;
   if (!link) {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = iconUrl;
      document.head.appendChild(newLink);
   } else {
      link.href = iconUrl;
   }
};
