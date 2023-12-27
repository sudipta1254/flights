let check = $('input[type="radio"]'),
txt = $('input[type="text"]'), btn = $('button'),
fill = $('#data'), xt = 0, timeId;

function main() {
    if(!txt.val()) {
        alert('Enter query to continue!');
        return;
    }
    if(xt == 1) {
        var rt = `https://airlabs.co/api/v9/flights?api_key=a1af1621-da48-4592-a132-52415d0cabd3`;
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
        var rt = `https://airlabs.co/api/v9/schedules?api_key=a1af1621-da48-4592-a132-52415d0cabd3`;
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
        var rt = `https://airlabs.co/api/v9/flights?api_key=a1af1621-da48-4592-a132-52415d0cabd3`;
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
        }
        let dt = d.response[0],
        text = `Registration: <b>${dt.reg_number}</b><br>
                Flag: <b>${dt.flag} <img src="https://flagcdn.com/24x18/${dt.flag.toLowerCase()}.png"></b><br>
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
                Airline ICAO/IATA: <b>${dt.airline_icao}/${dt.airline_iata}</b><br>
                Aircraft ICAO: <b>${dt.aircraft_icao}</b><br>
                Updated: <b>${time(dt.updated)}</b><br>
                Status: <b>${dt.status}</b><br>
                Type: <b>${dt.type}</b>`;
        $('#data').html(text);
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
    })
    .catch(e => {
        alert(`Schedule error: ${e.message}`);
    })
}
function information(url) {
    fetch(url)
    .then(response => {
        if(!response.ok)
            alert(response.status+' '+response.type);
        return response.json();
    })
    .then(d => {
        if(!d.response.length)
            alert('No data found!');
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
   return new Date(t*1000).toLocaleString().replace(':00', '');
}

function ck(a, b) {
   return a.eq(b).prop('checked');
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
    main();
  }
});

btn.click(() => {
   main();
});
