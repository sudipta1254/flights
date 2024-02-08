const driverW = window.driver.js.driver;

const driver = driverW({
    animate: true, // Enable animations
    opacity: 0.75, // Set overlay opacity
    showProgress: true,
    steps: [
        {
            popover: {
                title: 'Welcome!',
                // description: "<img src='https://i.imgur.com/EAQhHu5.gif' style='height: 202.5px; width: 270px;'><p>Welcome to my website!</p>",
                description: "<p>Welcome to my website!<br>You can track live flights here.</p>",
                position: 'center'
            },
            highlight: false // Disable highlighting
        },
        {
            element: '#selects',
            popover: {
                title: 'Options',
                description: 'Wide range of options to choose from.',
                // position: 'bottom',
                side: 'bottom',
                align: 'center'
            },
        },
        {
            element: '#select1',
            popover: {
                title: 'Choose from',
                description: 'Realtime flights, Flight schedule or Flight information.',
                // position: 'bottom',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: '#select2',
            popover: {
                title: 'Step 3',
                description: 'Flight number, Aircraft registration, Airline ICAO/IATA, Arrival ICAO/IATA or Departure ICAO/IATA.',
                // position: 'bottom',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: '#select5',
            popover: {
                title: 'Step 4',
                description: 'Select ICAO/IATA or leave when using Aircraft registration.',
                // position: 'bottom-right',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: '#select6',
            popover: {
                title: 'Sorting',
                description: 'Sort flights in ascending or descending order by\nFlight number, Altitude or Speed.',
                // position: 'bottom-right',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: '#update_span',
            popover: {
                title: 'Auto update',
                description: 'Updates query automatically with an interval of 20s.',
                // position: 'bottom',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: 'input[type="search"]',
            popover: {
                title: 'Query box',
                description: 'Enter your query here.',
                // position: 'bottom-right',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: 'button',
            popover: {
                title: 'Go!',
                description: 'Click here or click search/enter directly after entering query.',
                // position: 'bottom-right',
                side: 'bottom',
                align: 'center'
            }
        },
    ]
});

driver.drive();

// driver.highlight({
//   element: "#some-element",
//   popover: {
//     title: "Title",
//     description: "Description"
//   }
// });
