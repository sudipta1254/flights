let check = $('input[type="radio"]'),
txt = $('input[type="text"]'), btn = $('button'),
fill = $('#data'), xt = 0, timeId;

function main() {
   if(!txt.val()) {
      alert('Enter query to continue!');
      return;
   }
   if(xt == 1) {
      var rt = `https://airlabs.co/api/v9/flights?api_key=`+key2;
      if(ck(check, 3)) {//registration
         rt += '&reg_number='+txt.val();
      } else if(ck(check, 4)) {//flight icao/iata
         if(txt.val().length == 5)
            rt += '&flight_iata='+txt.val();
         else if(txt.val().length == 6)
            rt += '&flight_icao='+txt.val();
         else {
            alert('Invalid icao/iata');
            return;
         }
      } else if(ck(check, 5)) {//airline icao/iata
         if(txt.val().length == 2)
            rt += '&airline_iata='+txt.val();
         else if(txt.val().length == 3)
            rt += '&airline_icao='+txt.val();
         else {
            alert('Invalid icao/iata');
            return;
         }
      } else if(ck(check, 6)) {//arrival icao/iata
         if(txt.val().length == 3)
            rt += '&arr_iata='+txt.val();
         else if(txt.val().length == 4)
            rt += '&arr_icao='+txt.val();
         else {
            alert('Invalid icao/iata');
            return;
         }
      } else { //departure icao/iata
         if(txt.val().length == 3)
            rt += '&dept_iata='+txt.val();
         else if(txt.val().length == 4)
            rt += '&dept_icao='+txt.val();
         else {
            alert('Invalid icao/iata');
            return;
         }
      }
      realtime(rt);
   } else if(xt == 2) {
      var rt = `https://airlabs.co/api/v9/schedules?api_key=`+key2;
      if(ck(check, 8)) {//flight icao/iata
         if(txt.val().length == 5)
            rt += '&flight_iata='+txt.val();
         else if(txt.val().length == 6)
            rt += '&flight_icao='+txt.val();
         else {
            alert('Invalid icao/iata');
            return;
         }
      } else if(ck(check, 9)) {//airline icao/iata
         if(txt.val().length == 2)
            rt += '&airline_iata='+txt.val();
         else if(txt.val().length == 3)
            rt += '&airline_icao='+txt.val();
         else {
            alert('Invalid icao/iata');
            return;
         }
      } else if(ck(check, 10)) {//arrival icao/iata
         if(txt.val().length == 3)
            rt += '&arr_iata='+txt.val();
         else if(txt.val().length == 4)
            rt += '&arr_icao='+txt.val();
         else {
            alert('Invalid icao/iata');
            return;
         }
      } else {//departure icao/iata
         if(txt.val().length == 3)
            rt += '&dept_iata='+txt.val();
         else if(txt.val().length == 4)
            rt += '&dept_icao='+txt.val();
         else {
            alert('Invalid icao/iata');
            return;
         }
      }
      schedule(rt);
   } else {
      var rt = `https://airlabs.co/api/v9/flights?api_key=`+key2;
      if(txt.val().length == 5)
         rt += '&flight_iata='+txt.val();
      else if(txt.val().length == 6)
         rt += '&flight_icao='+txt.val();
      else {
         alert('Invalid icao/iata');
         return;
      }
      information(rt);
   }
}
function realtime(url) {
   fetch(url)
   .then(response => {
      if(!response.ok)
         alert(response.status+' '+response.type);
      return response.json();
   })
   .then(d => {
      if(!d.response.length) {
         alert('No data found!');
         return;
      }if(!d.response.length) {
         alert('No data found!');
         return;
      }
      fill.empty();
      d.response.forEach(dt => {
         text = `Registration: <b>${dt.reg_number}</b><br>
               Flag: <b>${dt.flag} ${flag(dt.flag.toLowerCase())}</b><br>
               Position: <b>${dt.lat.toFixed(2)}, ${dt.lng.toFixed(2)}</b><br>
               Altitude: <b>${(dt.alt*3.28).toFixed(0)} ft</b><br>
               Direction: <b>${dt.dir}°</b><br>
               Speed: <b>${dt.speed} Kmph</b><br>
               V speed: <b>${dt.v_speed}</b><br>
               Squawk: <b>${dt.squawk}</b><br>
               Flight number: <b>${dt.flight_number}</b><br>
               Flight ICAO/IATA: <b>${dt.flight_icao}/${dt.flight_iata}</b><br>
               Departure ICAO/IATA: <b>${dt.dep_icao}/${dt.dep_iata}</b><br>
               Arrival ICAO/IATA: <b>${dt.arr_icao}/${dt.arr_iata}</b><br>
               Airline ICAO/IATA: <b>${dt.airline_icao}/${dt.airline_iata} ${logo(dt.airline_iata)}</b><br>
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
}
function schedule(url) {
   fetch(url)
   .then(response => {
      if(!response.ok)
         alert(response.status+' '+response.type);
      return response.json();
   })
   .then(d => {
      if(!d.response.length)
         alert('No data found!');
      fill.empty();
      fill.html(2);
   })
   .catch(e => {
      alert(`Schedule error: ${e.message}`);
   })
}
function information(url) {
   var d = {
      "aircraft_icao":"A20N",
      "age":2,
      "built":2019,
      "engine":"jet",
      "engine_count":"2",
      "model":"Airbus A320-200 Neo",
      "manufacturer":"AIRBUS",
      "msn":"8099",
      "type":"adsb",
      "reg_number":"VT-TNI",//1
      "airline_iata":"UK",//11
      "airline_icao":"VTI",//11
      "flight_iata":"UK782",//7
      "flight_icao":"VTI782",//7
      "flight_number":"782",//6
      "dep_iata":"BBI",
      "dep_icao":"VEBS",
      "dep_terminal":"1",
      "dep_gate":null,
      "dep_time":"2023-12-26 20:30",
      "dep_estimated":"2023-12-26 20:53",
      "dep_actual":"2023-12-26 20:53",
      "dep_time_utc":"2023-12-26 15:00",
      "dep_estimated_utc":"2023-12-26 15:23",
      "dep_actual_utc":"2023-12-26 15:23",
      "dep_time_ts":1703602800,
      "dep_estimated_ts":1703604180,
      "dep_actual_ts":1703604180,
      "arr_iata":"DEL",
      "arr_icao":"VIDP",
      "arr_terminal":"T3",
      "arr_gate":null,
      "arr_baggage":"8",
      "arr_time":"2023-12-26 22:55",
      "arr_estimated":"2023-12-26 23:17",
      "arr_actual":null,
      "arr_time_utc":"2023-12-26 17:25",
      "arr_estimated_utc":"2023-12-26 17:47",
      "arr_actual_utc":null,
      "arr_time_ts":1703611500,
      "arr_estimated_ts":1703612820,
      "cs_airline_iata":null,
      "cs_flight_number":null,
      "cs_flight_iata":null,
      "status":"en-route",
      "duration":145,
      "delayed":22,
      "dep_delayed":23,
      "arr_delayed":22,
      "updated":1703611660,
      "hex":"800C8F",
      "flag":"IN",
      "lat":28.458755,//2
      "lng":77.476959,//2
      "alt":1630,//3
      "dir":284.4,//4
      "speed":393,//5
      "v_speed":-3.3,
      "squawk":"2664",
      "dep_name":"Biju Patnaik International Airport",//9
      "dep_city":"Bhubaneswar",//9
      "dep_country":"IN",//9
      "arr_name":"Indira Gandhi International Airport",//10
      "arr_city":"Delhi",//10
      "arr_country":"IN",//10
      "airline_name":"Vistara",//11
      "percent":88,
      "utc":"2023-12-26 17:28",
      "eta":18
   };
   
   fetch(url)
   .then(response => {
      if(!response.ok)
         alert(response.status+' '+response.type);
      return response.json();
   })
   .then(d => {
      if(d.error) {
         fill.text(d.error.message+'. '+d.error.code);
         return;
      }
      if(!Object.keys(d.response)) {
         alert('No data found!');
         return;
      }
      fill.empty();
      /*let txt = `Registration: ${d.reg_number}<br>
                Aircraft ICAO: ${d.aircraft_icao}<br>`;
      fill.html(txt);*/
      $.each(d.response, (k, v) => {
         fill.append(k+': '+v+'<br>');
      })
   })
   .catch(e => {
      alert(`Information error: ${e.message}`);
   })
}


$('input[type="radio"]').change(function(){
   if($('#op1 input').is(':checked')) {
      $('#realtime').css('display', 'block');
      $('#livesc, #flinfo').css('display', 'none');
      xt = 1;
   } else if($('#op2 input').is(':checked')) {
      $('#livesc').css('display', 'block');
      $('#realtime, #flinfo').css('display', 'none');
      xt = 2;
   } else if($('#op3 input').is(':checked')) {
      $('#flinfo').css('display', 'block');
      $('#realtime, #livesc').css('display', 'none');
      xt = 3;
   }
})

function time(t) {
   return new Date(t*1000).toLocaleString();
}
function ck(a, b) {
   return a.eq(b).prop('checked');
}
function flag(flag) {
   return `<img src="https://flagcdn.com/24x18/${flag.toLowerCase()}.png">`;
}
function logo(logo) {
   return `<img src=https://airlabs.co/img/airline/m/${logo}.png id='logo'>`;
}

$('input[type="checkbox"]').change(function() {
   if($(this).is(':checked')) {
      timeId = setInterval(function() {
         if(!txt.val())
            clearInterval(timeId);
         else
            btn.click();
      }, 20000);
   } else {
      clearInterval(timeId);
   }
})

txt.on("keypress", function(event) {
   if (event.key === "Enter") {
      event.preventDefault();
      $(this).blur();
      main();
   }
});

btn.click(() => {
   main();
});

// information(info);

function air(){
   fetch('https://airlabs.co/api/v9/flights?api_key=a1af1621-da48-4592-a132-52415d0cabd3')
   .then(r => r.json())
   .then(d => {
      let g=0;
      d.response.forEach((f) => {
         let li = $('<li>');
         g = Object.keys(f).length
         li.text(d.callsign);
         fill.append(li);
      })
      alert(g)
   })
}
//air()




const key = 'a1af1621-da48-4592-a132-52415d0cabd3',
key2 = '7e5231c8-8efc-402c-a160-6c769fe8e934';