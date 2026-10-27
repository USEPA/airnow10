// This function handles all 3 banner images for the Wildfire section cw 2025-05-21
// Access this way: <script src="/airnow-js/wildfires/hero_images.js">

// Remove & Change Carousel banner elements to make a Hero Image
document.querySelector("ol.carousel-indicators.carousel-indicators-numbers").remove();
document.querySelector("div.banner-text-box").remove();
document.querySelector("div.container.related-announcements-container.pull-left").remove();
document.querySelector("div.band-card-row.band-basic.row div.col-sm-7 h1").style.fontSize="0px";

// Handle mobile image insertion
if (screen.width < 767) {
    // Get the mobile image name from the first image in the carousel
    if (window.location.href.includes('be-smoke-ready')) {
        var mobileImageName = 'be-smoke-ready-hero-mobile.png';
    } else if (window.location.href.includes('when-smoke-is-in-the-air')) {
        var mobileImageName = 'when-smoke-is-in-the-air-hero-mobile.png';
    } else if (window.location.href.includes('after-a-fire')) {
        var mobileImageName = 'after-a-fire-hero-mobile.png';
    };
    document.querySelector("img.banner-image").src = '/sites/default/files/inline-images/' + mobileImageName;
}