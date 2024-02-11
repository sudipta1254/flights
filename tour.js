const driverW = window.driver.js.driver;

driverW({
    animate: true, // Enable animations
    opacity: 0.75, // Set overlay opacity
    showProgress: true,
    smoothScroll: true,
    steps: [
        {
            popover: {
                title: 'Welcome!',
                description: "<img src='https://media2.giphy.com/media/3ohjUOUjEK1TXCQRva/giphy.gif' style='height: 202.5px; width: 270px;'><p>Welcome to my flight tracking website! ☠️</p>",
                //description: "<p>Welcome to my website!<br>You can track live flights here.</p>", //https://i.imgur.com/EAQhHu5.gif
                position: 'center'
            },
            highlight: false // Disable highlighting
        },
        {
            element: '#selects',
            popover: {
                title: 'Options',
                description: 'Wide range of options to choose from.',
                side: 'bottom',
                align: 'center'
            },
        },
        {
            element: '#select1',
            popover: {
                title: 'Choose among',
                description: 'Realtime flights & Flight information.',
                side: 'bottom',
                align: 'left'
            }
        },
        {
            element: '#select2',
            popover: {
                title: 'Choose an option',
                description: 'When you choose realtime, choose between<br><ol><li>Aircraft registration<li>Airline ICAO/IATA<li>Arrival ICAO/IATA<li>Departure ICAO/IATA.',
                side: 'bottom',
                align: 'left'
            }
        },
        {
            element: '#select4',
            popover: {
                title: 'Step 4',
                description: 'Select ICAO/IATA or leave when using Aircraft registration.',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: '#select5',
            popover: {
                title: 'Sorting',
                description: 'Sort flights in ascending or descending order by\nFlight number, Altitude or Speed.',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: '#update_span',
            popover: {
                title: 'Auto update',
                description: 'Updates query automatically every 20s when checked.',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: 'input[type="search"]',
            popover: {
                title: 'Query box',
                description: 'Enter your query here.',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: 'button',
            popover: {
                title: 'Go!',
                description: 'Click here or click search/enter directly after entering query.',
                side: 'bottom',
                align: 'center'
            }
        },
        {
            element: '#data',
            popover: {
                title: 'Data format',
                description: 'Flights will appear here.',
                side: 'bottom',
                align: 'center'
            }
        },
    ]
}).drive();

// driver.highlight({
//   element: "#some-element",
//   popover: {
//     title: "Title",
//     description: "Description"
//   }
// });
