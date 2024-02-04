let select2 = $('#select2'), select3 = $('#select3'),
select4 = $('#select4'), select5 = $('#select5'),
s6 = $('#select6'), fill = $('#data'),
txt = $('input[type="search"]'), ifrm = $('iframe'),
btn = $('button'), timeId, xt = 1, key;

function main(updt = 0) {
   if(!txt.val().trim()) {
      alert('Enter query to continue!');
      return;
   }
   let url = 'https://airlabs.co/api/v9',
   inp = txt.val().trim(),
   s2 = select2.val(), s3 = select3.val(),
   s4 = select4.val(), s5 = select5.val();
   switch(xt) {
      case 1:
         if(s2 == 'reg_number')
            url += `/flights?api_key=${key}&${s2}=${inp}`;
         else
            url += `/flights?api_key=${key}&${s2}${s5}=${inp}`;
         updt ? realtime(url, 1) : realtime(url);
         break;
      case 2:
         url += `/schedules?api_key=${key}&${s3}${s5}=${inp}`;
         updt ? schedule(url, 1) : schedule(url);
         break;
      case 3:
         url += `/flight?api_key=${key}&${s4}${s5}=${inp}`;
         updt ? information(url, 1) : information(url);
         break;
      default:
         alert(xt);
   }
}

function realtime(url, updt = 0) {
   updt || fill.text('Loading...');
   fetch(url)
   .then(response => {
      if(!response.ok)
         alert(response.status+' '+response.type);
      return response.json();
   })
   .then(d => {
      if(d.error) {
         fill.html(`<b>${d.error.message}<b>`);
         return;
      }
      if(!d.response.length) {
         fill.html('<em>No data found!</em>');
         alert('No data found!');
         return;
      }
      sortFl(d.response); /* Sort flights */
      console.log(d)
      fill.empty();
      d.response.forEach(async dt => {
         let text = `Registration: <b>${dt.reg_number}</b><br>
               Flag: <b>${await help3(dt.flag)} ${flag(dt.flag.toLowerCase())}</b><br>
               Position: <b>${dt.lat.toFixed(2)}, ${dt.lng.toFixed(2)}</b><br>
               Altitude: <b>${(dt.alt*3.28).toFixed(0)} ft</b><br>
               Direction: <b>${dt.dir}°</b><br>
               Speed: <b>${dt.speed} Kmph</b><br>`;
         if(dt.v_speed)
            text+= `V speed: <b>${dt.v_speed}</b><br>`;
         if(dt.squawk)
            text += `Squawk: <b>${dt.squawk}</b><br>`;
         if(dt.flight_number)
            text += `Flight number: <b>${dt.flight_number}</b><br>`;
         if(dt.flight_icao)
            text += `Flight ICAO/IATA: <b>${dt.flight_icao}/${dt.flight_iata}</b><br>`;
         if(dt.dep_icao)
            text += `Departure ICAO/IATA: <b>${dt.dep_icao}/${dt.dep_iata}</b><br>`;
         if(dt.arr_icao)
            text +=` Arrival ICAO/IATA: <b>${dt.arr_icao}/${dt.arr_iata}</b><br>`;
         text += `Airline ICAO/IATA: <b>${dt.airline_icao}/${dt.airline_iata} ${logo(dt.airline_iata)}</b><br>
               Aircraft ICAO: <b>${dt.aircraft_icao}</b><br>
               Updated: <b>${time(dt.updated)}</b><br>
               Status: <b>${dt.status}</b><br>
               Type: <b>${dt.type}</b><hr>`;
         $('#data').append(text);
      });
   })
   .catch(e => {
      alert(`Realtime error: ${e.message}`);
   })
   help2()
}
function schedule(url, updt = 0) {
   updt || fill.text('Loading...');
   fetch(url)
   .then(response => {
      if(!response.ok)
         alert(response.status+' '+response.type);
      return response.json();
   })
   .then(d => {
      if(d.error) {
         fill.html(`<b>${d.error.message}<b>`);
         return;
      }
      if(!d.response.length) {
         fill.html('<em>No data found!</em>');
         alert('No data found!');
         return;
      }
      fill.empty();
      d.response.forEach((dts) => {
         var text = `Airline ICAO/IATA: <b>${dts.airline_icao}/${dts.airline_iata} ${logo(dts.airline_iata)}</b><br>
            Flight ICAO/IATA: <b>${dts.flight_icao}/${dts.flight_iata}</b><br>
            Flight Number: <b>${dts.flight_number}</b><br>`;
         if(dts.dep_icao)
            text += `Departure ICAO/IATA: <b>${dts.dep_icao}/${dts.dep_iata}</b>`;
         if(dts.dep_terminal)
            text += `<br>Terminal: <b>${dts.dep_terminal}</b>`
         if(dts.dep_gate)
            text += `<br>Gate: <b>${dts.dep_gate}</b>`;
         if(dts.dep_time_utc)
            text += `<br>Departure time: <b>${time(dts.dep_time_utc)}</b>`;
         if(dts.dep_estimated_utc && dts.dep_actual_utc){
            if(dts.dep_estimated_utc === dts.dep_actual_utc)
               text += `<br>Departed: <b>${time(dts.dep_actual_utc)}</b>`;
         } else {
            if(dts.dep_estimated_utc)
               text += `<br>Estimated: <b>${time(dts.dep_estimated_utc)}</b>`;
            if(dts.dep_actual_utc)
               text += `<br>Departed: <b>${time(dts.dep_actual_utc)}</b>`;
         }
         if(dts.arr_icao)
            text += `<br>Arrival ICAO/IATA: <b>${dts.arr_icao}/${dts.arr_iata}</b>`;
         if(dts.arr_baggage)
            text += `<br>Baggage: <b>${dts.arr_baggage}</b>`;
         if(dts.arr_terminal)
            text += `<br>Terminal: <b>${dts.arr_terminal}</b>`
         if(dts.arr_gate)
            text += `<br>Gate: <b>${dts.arr_gate}</b>`;
         if(dts.arr_time_utc)
            text += `<br>Arrival time: <b>${time(dts.arr_time_utc)}</b>`;
         if(dts.arr_estimated_utc && dts.arr_actual_utc){
            if(dts.arr_estimated_utc === dts.arr_actual_utc)
               text += `<br>Arrived: <b>${time(dts.arr_actual_utc)}</b>`;
         } else {
            if(dts.arr_estimated_utc)
               text += `<br>Estimated: <b>${time(dts.arr_estimated_utc)}</b>`;
            if(dts.arr_actual_utc)
               text += `<br>Arrived: <b>${time(dts.arr_actual_utc)}</b>`;
         }
         if(dts.status)
            text += `<br>Status: <b>${dts.status}</b>`;
         if(dts.duration)
            text += `<br>Duration: <b>${help1(dts.duration)} </b>`;
         if(dts.delay)
            text += `<br>Delay: <b>${help1(dts.dlay)} </b>`;
         if(dts.dep_delayed)
            text += `<br>Departure delay: <b>${help1(dts.dep_delayed)}</b>`;
         if(dts.arr_baggage)
            text += `<br>Baggage: <b>${dts.arr_baggage}</b>`;
         fill.append(text, '<hr>');
      });
   })
   .catch(e => {
      alert(`Schedule error: ${e.message}`);
   })
   help2()
}
function information(url, updt = 0) {
   updt || fill.text('Loading...');
   fetch(url)
   .then(response => {
      if(!response.ok)
         alert(response.status+' '+response.type);
      return response.json();
   })
   .then(async (d) => {
      console.log(d)
      if(d.error) {
         fill.html(`<b>${d.error.message}<b>`);
         return;
      }
      if(!Object.keys(d.response)) {
         fill.html('<em>No data found!</em>');
         alert('No data found!');
         return;
      }
      let dts = d.response;
      fill.empty();
      /*Departure*/
      let text = '';
      if(dts.dep_name)
         text = `Departure: <b>${dts.dep_name}, ${dts.dep_city}, ${await help3(dts.dep_country)} ${flag(dts.dep_country)}</b><br>`;
      if(dts.dep_icao)
            text += `Departure ICAO/IATA: <b>${dts.dep_icao}/${dts.dep_iata}</b>`;
      if(dts.dep_terminal)
            text += `<br>Terminal: <b>${dts.dep_terminal}</b>`
      if(dts.dep_gate)
            text += `<br>Gate: <b>${dts.dep_gate}</b>`;
      if(dts.dep_time_utc)
            text += `<br>Departure time: <b>${time(dts.dep_time_utc)}</b>`;
      if(dts.dep_estimated_utc && dts.dep_actual_utc){
            if(dts.dep_estimated_utc === dts.dep_actual_utc)
               text += `<br>Departed: <b>${time(dts.dep_actual_utc)}</b>`;
      } else {
         if(dts.dep_estimated_utc)
            text += `<br>Estimated: <b>${time(dts.dep_estimated_utc)}</b>`;
         if(dts.dep_actual_utc)
            text += `<br>Departed: <b>${time(dts.dep_actual_utc)}</b>`;
      }
      /*Airline*/
      if(dts.airline_name)
         text += `<br>Airline: <b>${dts.airline_name} ${logo(dts.airline_iata)}</b>`;
      if(dts.airline_icao)
         text += `<br>Airline ICAO/IATA: <b>${dts.airline_icao}/${dts.airline_iata}</b>`;
      if(!dts.airline_name)
         text += ` ${logo(dts.airline_iata)}</b>`;
      if(dts.flight_icao)
            text += `<br>Flight ICAO/IATA: <b>${dts.flight_icao}/${dts.flight_iata}</b>`;
      if(dts.flight_number)
            text += `<br>Flight Number: <b>${dts.flight_number}</b>`;
      text += `<br>Registration: <b>${dts.reg_number}</b><br>
            Flag: <b>${await help3(dts.flag)} ${flag(dts.flag.toLowerCase())}</b><br>
            Position: <b>${dts.lat.toFixed(2)}, ${dts.lng.toFixed(2)}</b><br>
            Altitude: <b>${(dts.alt*3.28).toFixed(0)} ft</b><br>
            Direction: <b>${dts.dir}°</b><br>
            Speed: <b>${dts.speed} Kmph</b><br>`;
      if(dts.v_speed)
         text+= `V speed: <b>${dts.v_speed}</b><br>`;
      if(dts.squawk)
         text += `Squawk: <b>${dts.squawk}</b>`;
      /*Arrival*/
      if(dts.arr_name)
         text += `<br>Arrival: <b>${dts.arr_name}, ${dts.arr_city}, ${await help3(dts.arr_country)} ${flag(dts.arr_country)}</b>`;
      if(dts.arr_icao)
         text += `<br>Arrival ICAO/IATA: <b>${dts.arr_icao}/${dts.arr_iata}</b>`;
      if(dts.arr_baggage)
         text += `<br>Baggage: <b>${dts.arr_baggage}</b>`;
      if(dts.arr_terminal)
         text += `<br>Terminal: <b>${dts.arr_terminal}</b>`
      if(dts.arr_gate)
         text += `<br>Gate: <b>${dts.arr_gate}</b>`;
      if(dts.arr_time_utc)
         text += `<br>Arrival time: <b>${time(dts.arr_time_utc)}</b>`;
      if(dts.arr_estimated_utc && dts.arr_actual_utc){
         if(dts.arr_estimated_utc === dts.arr_actual_utc)
            text += `<br>Arrived: <b>${time(dts.arr_actual_utc)}</b>`;
      } else {
         if(dts.arr_estimated_utc)
            text += `<br>Estimated: <b>${time(dts.arr_estimated_utc)}</b>`;
         if(dts.arr_actual_utc)
            text += `<br>Arrived: <b>${time(dts.arr_actual_utc)}</b>`;
      }
      if(dts.duration)
         text += `<br>Duration: <b>${help1(dts.duration)}</b>`;
      if(dts.delayed)
         text += `<br>Delay: <b>${help1(dts.delayed)}</b>`;
      if(dts.dep_delayed)
         text += `<br>Departure delay: <b>${help1(dts.dep_delayed)}</b>`;
      if(dts.arr_delayed)
         text += `<br>Arrival delay: <b>${help1(dts.arr_delayed)}</b>`;
      /*Airliner*/
      if(dts.model)
         text += `<br>Airliner: <b>${dts.model} - ${dts.manufacturer}</b>`;
      if(dts.aircraft_icao)
         text += `<br>Aircraft ICAO: <b>${dts.aircraft_icao}</b>`;
      if(dts.engine)
         text += `<br>Engine: <b>${dts.engine_count} ${dts.engine}</b>`;
      if(dts.built)
         text += `<br>Built: <b>${dts.built} - ${dts.age}y</b>`;
      if(dts.eta && dts.eta > -1)
         text += `<br>Arriving in <b>${help1(dts.eta)}</b>`;
      if(dts.status)
         text += `<br>Status: <b>${dts.status}</b>`;
      if(dts.updated)
         text += `<br>Updated: <b>${time(dts.updated)}</b>`;
      fill.html(text);
      if(dts.dep_iata && dts.arr_iata && dts.percent)
         distance(dts.dep_iata, dts.arr_iata, dts.percent);
      updateMap(dts.lat, dts.lng, mapZoomLvl(dts.alt ?? 0));
   })
   .catch(e => {
      alert(`Information error: ${e.message}`);
   })
}


$('#select1').change(function(){
   if($(this).val() === 'realtime') {
      select2.css('display', 'block');
      $('#select3, #select4').css('display', 'none');z
      xt = 1;
   } else if($(this).val() === 'schedule') {
      select3.css('display', 'block');
      $('#select2, #select4').css('display', 'none');
      xt = 2;
   } else {
      select4.css('display', 'block');
      $('#select2, #select3').css('display', 'none');
      xt = 3;
   }
})
select2.change(function() {
   select5.css('display', $(this).val() == 'reg_number' ?  'none' : 'block');
})

function time(t) {
   if(typeof t == 'string')
      return new Date(t+'Z').toLocaleString();
   return new Date(t*1000).toLocaleString();
}
function ck(a, b) {
   return a.eq(b).prop('checked');
}
function flag(flag) {
   return `<img src="https://flagcdn.com/24x18/${flag.toLowerCase()}.png">`;
}
function logo(logo) {
   return `<div id="logo-div"><img src=https://airlabs.co/img/airline/m/${logo}.png id='logo'></div>`;
}
function updateMap(lat, long, z) {
   help2(1);
   ifrm.attr('src', `https://maps.google.com/maps?hl=en&q=${lat},${long}&t=&z=${z}&ie=UTF8&iwloc=B&output=embed`);
}
function distance(d, a, x) {
   if(x > -1) {
      fill.append(`<span id='distance'>
            <span id='dep'>${d}</span>
            <span id='line-p'>
               <span id='line'></span>
            </span>
            <span id='arr'>${a}</span>
         </span>`);
      $('#line').css('width', x+'%');
   }
}
function help1(t) {
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
function help2(x = 0) {
   $('#map').css('display', x ? 'block' : 'none');
}
async function help3(code) {
  try {
    if(code == 'UK')
       return code;
     
    const response = await fetch(`https://restcountries.com/v3/alpha/${code}`);
    const data = await response.json();
    const countryName = data[0].name.common;
    return countryName;
  } catch (error) {
    throw new Error(error.message);
  }
}
function mapZoomLvl(z) {
   const c = 4200;
   if(z)
      z *= 3.28; /* Convert to feet */
   if(!z)
      return 13; /* Landed or altitude not available */
   else if(z < c)
      return 12;
   else if(z >= c && z < c*2)
      return 11;
   else if(z >= c*3 && z < c*4)
      return 10;
   else if(z >= c*4 && z < c*5)
      return 9;
   else if(z >= c*6 && z < c*7)
      return 8;
   else if(z >= c*7 && z < c*8)
      return 7;
   else if(z >= c*8 && z < c*9)
      return 6;
   else if(z >= c*9 && z < c*10)
      return 5;
   else if(z >= c*10)
      return 4;
}
function sortFl(d) {
   if(s6.val()) {
      let term = s6.val();
      fill.text(`Sorting flights...`);
      if(term.includes('_a'))
         d.sort(function(a, b) {
            return a[term.slice(0,-2)] - b[term.slice(0,-2)];
         });
      else
         d.sort(function(a, b) {
            return b[term.slice(0,-2)] - a[term.slice(0,-2)];
         });
   }
}


$('#update').change(function() {
   if($(this).is(':checked')) {
      timeId = setInterval(function() {
         txt.val() ? main(1) : (
            clearInterval(timeId),
            $('#update').prop('checked', false)
         );
      }, 20000);
   } else {
      clearInterval(timeId);
   }
})

$('#mapt').change(function() {
   if($(this).is(':checked')) {
      ifrm.css('display', 'block');
      //Smooth scroll to map when checked
      $('html, body').animate({
          scrollTop: ifrm.offset().top
      }, 1000);
   } else {
      ifrm.css('display', 'none');
   }
})

txt.on("keypress", function(event) {
   if (event.key === "Enter") {
      event.preventDefault();
      $(this).blur();
      main();
   }
});

$('button').click(() => {
   main();
});












const key1 = 'a1af1621-da48-4592-a132-52415d0cabd3',
key2 = '7e5231c8-8efc-402c-a160-6c769fe8e934';
key = key2;
