import { steps, introSteps } from './env.js';

const driverW = window.driver.js.driver;

/*  */
driverW({
    animate: true, // Enable animations
    overlayOpacity: 0.75, // Set overlay opacity
    showProgress: true,
    smoothScroll: true,
    steps: steps
}).drive();

/* When user clicks on info icon, only info steps are shown */
$('.fa-info').click(() => {
    driverW({
        overlayOpacity: 0.75,
        showProgress: true,
        smoothScroll: true,
        steps: introSteps,
    }).drive()
})


// driver.highlight({
//   element: "#some-element",
//   popover: {
//     title: "Title",
//     description: "Description"
//   }
// });
