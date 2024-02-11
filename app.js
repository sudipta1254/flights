let select2 = $('#select2');
let select3 = $('#select3');
let select4 = $('#select4');
let s5 = $('#select5');
let fill = $('#data');
let msgbox = $('#msgBox');
let msgbox2 = $('#msgBox2');
let msgmap = $('#msgMap');
let txt = $('input[type="search"]');
let ifrm = $('iframe');
let btn = $('button');
let timeId;
let xt = 1;
let key;
let dataStore;
let isMapAv;

function origin() {
   if(!txt.val().trim()) {
      alert('Enter query to continue!');
      return;
   }
   let url = 'https://airlabs.co/api/v9',
   inp = txt.val().trim(),
   s2 = select2.val(), s3 = select3.val(),
   s4 = select4.val();
   switch(xt) {
      case 1:
         if(s2 === 'reg_number')
            url += `/flights?api_key=${key}&${s2}=${inp}`;
         else
            url += `/flights?api_key=${key}&${s2}${s4}=${inp}`;
         realtime(url);
         break;
      case 2:
         url += `/flight?api_key=${key}&${s3}${s4}=${inp}`;
         information(url);
         break;
      default:
         alert(xt);
   }
}

async function realtime(url, stored = 0) {
   try {
      let d, isFromStored = 1;
      if(!stored) {
         start(1);
         const response = await fetch(url);
         if(!response.ok) {
            alert(response.status+' '+response.type);
            stop();
            return;
         }
         d = await response.json();
         dataStore = d; /* Store current data for better UX */
         if(d.error) {
            fill.html(`<b>${d.error.message}<b>`);
            stop();
            return;
         }
         if(!d.response.length) {
            fill.html('<em>No data found!</em>');
            alert('No data found!');
            stop();
            return;
         }
         keyLeft(d);
      } else {
         start(1);
         d = dataStore;
         isFromStored = 0;
      }
      
      sortFl(d.response); /* Sort flights */
      // console.log(d);
      fill.empty();
      let maxCount = d.response.length, count = 0;
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
         if(++count === maxCount)
            stop(isFromStored, maxCount);
      });
   } catch(e) {
      stop();
      alert(`Realtime error: ${e.message}`);
   }
   help2()
}
function information(url) {
   msgbox.show();
   fetch(url)
   .then(response => {
      if(!response.ok)
         alert(response.status+' '+response.type);
      return response.json();
   })
   .then(async (d) => {
      // console.log(d);
      if(d.error) {
         fill.html(`<b>${d.error.message}<b>`);
         stop();
         return;
      }
      if(!Object.keys(d.response)) {
         fill.html('<em>No data found!</em>');
         alert('No data found!');
         stop();
         return;
      }
      keyLeft(d);
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
      if(dts.reg_number)
         text += `<br>Registration: <b>${dts.reg_number}</b>`;
      if(dts.flag)
         text += `<br>Flag: <b>${await help3(dts.flag)} ${flag(dts.flag.toLowerCase())}</b>`;
      if(dts.lat)
         text += `<br>Position: <b>${dts.lat.toFixed(2)}, ${dts.lng.toFixed(2)}</b>`;
      if(dts.alt)
         text += `<br>Altitude: <b>${(dts.alt*3.28).toFixed(0)} ft</b>`;
      if(dts.dir)
         text += `<br>Direction: <b>${dts.dir}°</b>`;
      if(dts.speed)
         text += `<br>Speed: <b>${dts.speed} Kmph</b>`;
      if(dts.v_speed)
         text+= `<br>V speed: <b>${dts.v_speed}</b>`;
      if(dts.squawk)
         text += `<br>Squawk: <b>${dts.squawk}</b>`;
      /*Arrival*/
      if(dts.arr_name)
         text += `<br><br>Arrival: <b>${dts.arr_name}, ${dts.arr_city}, ${await help3(dts.arr_country)} ${flag(dts.arr_country)}</b>`;
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
      if(dts.built && dts.age)
         text += `<br>Built: <b>${dts.built} - ${dts.age+2}y</b>`;
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
      stop();
   })
   .catch(e => {
      stop();
      alert(`Information error: ${e.message}`);
   })
}


$('#select1').change(function(){
   if($(this).val() === 'realtime') {
      $('#select2, #select5').css('display', 'block');
      $('#select3').css('display', 'none');
      fill.css('height', '68vh');
      xt = 1;
   } else if($(this).val() === 'information'){
      select3.css('display', 'block');
      $('#select2, #select5').css('display', 'none');
      fill.css('height', '65vh');
      xt = 2;
   }
})
s5.change(function() {
   realtime(0, 1);
})

function time(t) {
   let vr;
   if(typeof t === 'string')
      vr = new Date(t+'Z');
   else
      vr = new Date(t*1000);
   
   let day = vr.getDate(),
   month = vr.getMonth()+1,
   year = vr.getFullYear();
   vr = vr.toLocaleString().split(',');
   return `${day}/${month}/${year}, ${vr[1].replace(':00', '')}`;
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
   isMapAv = lat && long ? 0 : 1;
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
   // fill.text('Loadixng...');
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
   if(s5.val()) {
      let term = s5.val();
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
function keyLeft(d) {
   let key = d.request.key.limits_total;
   const keys = '500 400 300 200 100 50 40 30 20 10 5 1';
   if(keys.includes(key))
      alert(`${key} call(s) letf!`);
}
function start(zz) {
   if(zz)
      msgbox.show();
   s5.prop('disabled', msgbox.is(':visible'));
   /*let str, counter = 0;
   str = zz === 0 ? 'Loading.' : 'Sorting flights.';
   const intervalId = setInterval(() => {
      const dots = '.'.repeat(++counter % 3);
      msgbox.text(str + dots);

      // Stop the animation after 3 interaction & clear text
      if (msgbox.css('display') === 'none') {
         msgbox.text();
         clearInterval(intervalId);
      }
   }, 500);*/
}
function stop(zz = 0, num = 0) {
   msgbox.hide();
   if(zz) {      
      msgbox2.show().html(`<em>${num} flights found!</em>`);
      setTimeout(() => {
         msgbox2.hide();
      }, 2000);
   }
   start(0);
}


$('#update').change(function() {
   $(this).is(':checked') ?
      timeId = setInterval(function() {
         txt.val() ? origin() : (
            clearInterval(timeId),
            $('#update').prop('checked', false)
         );
      }, 20000)
   : clearInterval(timeId);
})

$('#mapt').change(function() {
   if($(this).is(':checked')) {
      if(!isMapAv) {
         ifrm.show();
         //Smooth scroll to map when checked
         $('html, body').animate({
             scrollTop: ifrm.offset().top
         }, 1000);
      } else {
         msgmap.show();
         $('html, body').animate({
             scrollTop: msgmap.offset().top
         }, 1000);
      }
   } else {
      ifrm.hide();
      msgmap.hide();
      $('html, body').animate({
         scrollTop: 0
      }, 500);
   }
})

txt.on("keypress", function(event) {
   if (event.key === "Enter") {
      event.preventDefault();
      if(msgbox.css('display') === 'none') {
         $(this).blur();
         origin();
      }
   }
});

$('button').click(() => {
   if(msgbox.css('display') === 'none')
      origin();
});

//dataStore = {"request":{"lang":"en","currency":"USD","time":0,"id":"ms0wg9u4hlc","server":"g","host":"airlabs.co","pid":1559923,"key":{"id":29163,"api_key":"7e5231c8-8efc-402c-a160-6c769fe8e934","type":"free","expired":"2024-02-26T23:00:00.000Z","registered":"2023-12-28T01:54:14.000Z","upgraded":null,"limits_by_hour":2500,"limits_by_minute":250,"limits_by_month":1000,"limits_total":3},"params":{"airline_iata":"uk","lang":"en"},"version":9,"method":"flights","client":{"ip":"2401:4900:7014:72e::635:f248","geo":{"country_code":"IN","country":"India","continent":"Asia","city":"Gunupur","lat":19.0827,"lng":83.8054,"timezone":"Asia/Kolkata"},"connection":{},"device":{},"agent":{},"karma":{"is_blocked":false,"is_crawler":false,"is_bot":false,"is_friend":false,"is_regular":true}}},"response":[{"hex":"801408","reg_number":"VT-TQA","flag":"IN","lat":24.393788,"lng":73.83297,"alt":1838,"dir":39.8,"speed":359,"v_speed":0,"flight_number":"623","flight_icao":"VTI623","flight_iata":"UK623","dep_icao":"VABB","dep_iata":"BOM","arr_icao":"VAUD","arr_iata":"UDR","airline_icao":"VTI","airline_iata":"UK","aircraft_icao":"A20N","updated":1707544662,"status":"en-route","type":"adsb"},{"hex":"801439","reg_number":"VT-TQE","flag":"IN","lat":23.767746,"lng":74.628147,"alt":12074,"dir":202.1,"speed":700,"v_speed":0,"flight_number":"995","flight_icao":"VTI995","flight_iata":"UK995","dep_icao":"VIDP","dep_iata":"DEL","arr_icao":"VABB","arr_iata":"BOM","airline_icao":"VTI","airline_iata":"UK","aircraft_icao":"A20N","updated":1707544662,"status":"en-route","type":"adsb"},{"hex":"801493","reg_number":"VT-TYC","flag":"IN","lat":15.874803,"lng":80.858722,"alt":11945,"dir":52.7,"speed":960,"v_speed":0,"flight_number":"755","flight_icao":"VTI755","flight_iata":"UK755","dep_icao":"VOBL","dep_iata":"BLR","arr_icao":"VEGT","arr_iata":"GAU","airline_icao":"VTI","airline_iata":"UK","aircraft_icao":"A20N","updated":1707544662,"status":"en-route","type":"adsb"},{"hex":"801534","reg_number":"VT-TQN","flag":"IN","lat":23.919537,"lng":77.378116,"alt":11465,"dir":355.2,"speed":891,"v_speed":0,"flight_number":"830","flight_icao":"VTI830","flight_iata":"UK830","dep_icao":"VOHS","dep_iata":"HYD","arr_icao":"VIDP","arr_iata":"DEL","airline_icao":"VTI","airline_iata":"UK","aircraft_icao":"A20N","updated":1707544662,"status":"en-route","type":"adsb"},{"hex":"801602","reg_number":"VT-TQR","flag":"IN","lat":26.352692,"lng":78.261064,"alt":11884,"dir":325.9,"speed":763,"v_speed":0,"flight_number":"786","flight_icao":"VTI786","flight_iata":"UK786","dep_icao":"VEBS","dep_iata":"BBI","arr_icao":"VIDP","arr_iata":"DEL","airline_icao":"VTI","airline_iata":"UK","aircraft_icao":"A20N","updated":1707544662,"status":"en-route","type":"adsb"}],"terms":"Unauthorized access is prohibited and punishable by law. \nReselling data 'As Is' without AirLabs.Co permission is strictly prohibited. \nFull terms on https://airlabs.co/. \nContact us info@airlabs.co"};
//realtime(0, 1);











const key1 = 'a1af1621-da48-4592-a132-52415d0cabd3',
key2 = '7e5231c8-8efc-402c-a160-6c769fe8e934',
key3 = '5dbaf919-6297-43d4-bf12-b155f0a70d55';
key = key3;
