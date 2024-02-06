// Config driver.js
const config = {
    animate: true, // Enable animations
    opacity: 0.75, // Set overlay opacity
    allowClose: false, // Allow users to close the guide
    nextBtnText: '<b>&rarr;</b>',
    prevBtnText: '<b>&larr;</b>'
};

// Define the steps for the guide
var steps = [
    {
        element: '#selects',
        popover: {
            title: 'Options',
            description: 'Wide range of options to choose from.',
            position: 'bottom'
        },
    },
    {
        element: '#select1',
        popover: {
            title: 'Choose from',
            description: 'Realtime flights, Flight schedule or Flight information.',
            position: 'bottom'
        }
    },
    {
        element: '#select2',
        popover: {
            title: 'Step 3',
            description: 'Flight number, Aircraft registration, Airline ICAO/IATA, Arrival ICAO/IATA or Departure ICAO/IATA.',
            position: 'bottom'
        }
    },
    {
        element: '#select5',
        popover: {
            title: 'Step 4',
            description: 'Select ICAO/IATA or leave when using Aircraft registration.',
            position: 'bottom-right'
        }
    },
    {
        element: '#select6',
        popover: {
            title: 'Sorting',
            description: 'Sort flights in ascending or descending order by\nFlight number, Altitude or Speed.',
            position: 'bottom-right'
        }
    },
    {
        element: '#update_span',
        popover: {
            title: 'Auto update',
            description: 'Updates query automatically with an interval of 20s.',
            position: 'bottom'
        }
    },
    {
        element: 'input[type="search"]',
        popover: {
            title: 'Query box',
            description: 'Enter your query here.',
            position: 'bottom-right'
        }
    },
    {
        element: 'button',
        popover: {
            title: 'Go!',
            description: 'Click here or click search/enter directly after entering query.',
            position: 'bottom-right'
        }
    },
];

// On DOM load create a driver instance, define the steps & start the driver
document.addEventListener("DOMContentLoaded", function() {
   var driver = new Driver(config);
   driver.defineSteps(steps);
   driver.start();
});
