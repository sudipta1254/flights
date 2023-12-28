let select2 = $('#select2'), select3 = $('#select3'),
select4 = $('#select4'), select5 = $('#select5'),
fill = $('#data'), txt = $('input[type="text"]'),
ifrm = $('iframe'), btn = $('button'), timeId,
xt = 1;

function main() {
   if(!txt.val()) {
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
            url += `/flights?api_key=${key2}&${s2}=${inp}`;
         else
            url += `/flights?api_key=${key2}&${s2}${s5}=${inp}`;
         realtime(url);
         break;
      case 2:
         url += `/schedules?api_key=${key2}&${s3}${s5}=${inp}`;
         schedule(url);
         break;
      case 3:
         url += `/flight?api_key=${key2}&${s4}${s5}=${inp}`;
         information(url);
         break;
      default:
         alert(xt);
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
      if(d.error) {
         fill.text(d.error.message+'. '+d.error.code);
         return;
      }
      if(!d.response.length) {
         alert('No data found!');
         return;
      }
      console.log(d)
      fill.empty();
      d.response.forEach(dt => {
         let text = `Registration: <b>${dt.reg_number}</b><br>
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
      if(d.error) {
         fill.text(d.error.message+'. '+d.error.code);
         return;
      }
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
   var dts = {
   "aircraft_icao":"A20N",
   "age":2,
   "built":2019,
   "engine":"jet",
   "engine_count":"2",
   "model":"Airbus A320-200 Neo",
   "manufacturer":"AIRBUS",
   "msn":"8099",
   "type":"adsb",
   "reg_number":"VT-TNI",
   "airline_iata":"UK",
   "airline_icao":"VTI",
   "flight_iata":"UK782",
   "flight_icao":"VTI782",
   "flight_number":"782",
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
   "lat":28.458755,
   "lng":77.476959,
   "alt":1630,
   "dir":284.4,
   "speed":393,
   "v_speed":-3.3,
   "squawk":"2664",
   "dep_name":"Biju Patnaik International Airport",
   "dep_city":"Bhubaneswar",
   "dep_country":"IN",
   "arr_name":"Indira Gandhi International Airport",
   "arr_city":"Delhi",
   "arr_country":"IN",
   "airline_name":"Vistara",
   "percent":88,
   "utc":"2023-12-26 17:28",
   "eta":18
}
   
   
   fetch(url)
   .then(response => {
      if(!response.ok)
         alert(response.status+' '+response.type);
      return response.json();
   })
   .then(d => {
      console.log(d)
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


$('#select1').change(function(){
   if($(this).val() === 'realtime') {
      select2.css('display', 'block');
      $('#select3, #select4').css('display', 'none');
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
   return `<div id="logo-div"><img src=https://airlabs.co/img/airline/m/${logo}.png id='logo'></div>`;
}
function updateMap(lat, long) {
   ifrm.attr('src', `https://maps.google.com/maps?hl=en&q=${lat},${long}&t=&z=13&ie=UTF8&iwloc=B&output=embed`);
}

$('#update').change(function() {
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

$('#mapt').change(function() {
   if($(this).is(':checked')) {
      ifrm.css('display', 'block');
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












const key = 'a1af1621-da48-4592-a132-52415d0cabd3',
key2 = '7e5231c8-8efc-402c-a160-6c769fe8e934';