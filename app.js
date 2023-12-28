let check = $('input[type="radio"]'),
ifrm = $('iframe'), txt = $('input[type="text"]'),
btn = $('button'), fill = $('#data'),
xt = 0, timeId;

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
      var rt = `https://airlabs.co/api/v9/flight?api_key=`+key2;
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
   let dts = {
      "request": {
          "lang": "en",
          "currency": "USD",
          "time": 2,
          "id": "obd0uvqamn4",
          "server": "l",
          "host": "airlabs.co",
          "pid": 2624334,
          "key": {
              "id": 29163,
              "api_key": "7e5231c8-8efc-402c-a160-6c769fe8e934",
              "type": "free",
              "expired": "2024-01-27T00:00:00.000Z",
              "registered": "2023-12-28T02:54:14.000Z",
              "upgraded": null,
              "limits_by_hour": 2500,
              "limits_by_minute": 250,
              "limits_by_month": 1000,
              "limits_total": 985
          },
          "params": {
              "airline_iata": "ai",
              "lang": "en"
          },
          "version": 9,
          "method": "flights",
          "client": {
              "ip": "2401:4900:7164:68a:bd3a:f12f:f795:80c4",
              "geo": {
                  "country_code": "IN",
                  "country": "India",
                  "continent": "Asia",
                  "city": "Bhubaneswar",
                  "lat": 20.2706,
                  "lng": 85.8334,
                  "timezone": "Asia/Kolkata"
              },
              "connection": {},
              "device": {},
              "agent": {},
              "karma": {
                  "is_blocked": false,
                  "is_crawler": false,
                  "is_bot": false,
                  "is_friend": false,
                  "is_regular": true
              }
          }
      },
      "response": [
          {
              "hex": "800584",
              "reg_number": "VT-ALU",
              "flag": "IN",
              "lat": 65.521344,
              "lng": 56.554751,
              "alt": 9753,
              "dir": 328,
              "speed": 874,
              "v_speed": 0,
              "squawk": "0562",
              "flight_number": "187",
              "flight_icao": "AIC187",
              "flight_iata": "AI187",
              "dep_icao": "VIDP",
              "dep_iata": "DEL",
              "arr_icao": "CYYZ",
              "arr_iata": "YYZ",
              "airline_icao": "AIC",
              "airline_iata": "AI",
              "aircraft_icao": "B77W",
              "updated": 1703735743,
              "status": "en-route",
              "type": "adsb"
          },
          {
              "hex": "801591",
              "reg_number": "VT-RTC",
              "flag": "IN",
              "lat": 28.528381,
              "lng": 77.153338,
              "alt": 510,
              "dir": 283,
              "speed": 259,
              "v_speed": -4.2,
              "squawk": "6311",
              "flight_number": "818",
              "flight_icao": "AIC818",
              "flight_iata": "AI818",
              "dep_icao": "VAAH",
              "dep_iata": "AMD",
              "arr_icao": "VIDP",
              "arr_iata": "DEL",
              "airline_icao": "AIC",
              "airline_iata": "AI",
              "aircraft_icao": "A21N",
              "updated": 1703735743,
              "status": "en-route",
              "type": "adsb"
          },
          {
              "hex": "801595",
              "reg_number": "VT-RTD",
              "flag": "IN",
              "lat": 25.12657,
              "lng": 77.252595,
              "alt": 9745,
              "dir": 358,
              "speed": 787,
              "v_speed": -0.3,
              "squawk": "2671",
              "flight_number": "436",
              "flight_icao": "AIC436",
              "flight_iata": "AI436",
              "dep_icao": "VABP",
              "dep_iata": "BHO",
              "arr_icao": "VIDP",
              "arr_iata": "DEL",
              "airline_icao": "AIC",
              "airline_iata": "AI",
              "aircraft_icao": "A21N",
              "updated": 1703735743,
              "status": "en-route",
              "type": "adsb"
          },
          {
              "hex": "801613",
              "reg_number": "VT-RTQ",
              "flag": "IN",
              "lat": 12.079188,
              "lng": 76.430391,
              "alt": 8907,
              "dir": 325,
              "speed": 809,
              "v_speed": 5.5,
              "squawk": "2760",
              "flight_number": "608",
              "flight_icao": "AIC608",
              "flight_iata": "AI608",
              "dep_icao": "VOCB",
              "dep_iata": "CJB",
              "arr_icao": "VABB",
              "arr_iata": "BOM",
              "airline_icao": "AIC",
              "airline_iata": "AI",
              "aircraft_icao": "A20N",
              "updated": 1703735743,
              "status": "en-route",
              "type": "adsb"
          }],
          "terms": "Unauthorized access is prohibited and punishable by law. \nReselling data 'As Is' without AirLabs.Co permission is strictly prohibited. \nFull terms on https://airlabs.co/. \nContact us info@airlabs.co"
      };
   fetch(url)
   .then(response => {
      if(!response.ok)
         alert(response.status+' '+response.type);
      return response.json();
   })
   .then(d => {
      console.log(d, '1');
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
      console.log(d, '2');
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
      console.log(d, '3');
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
});

$('#mapt').change(function() {
   if($(this).is(':checked')) {
      ifrm.css('display', 'block');
   } else {
      ifrm.css('display', 'none');
   }
});

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
