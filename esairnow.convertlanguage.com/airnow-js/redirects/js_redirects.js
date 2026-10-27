// Redirect to specific pages based on the current URL or conditions 20250506-SO

function handleRedirects() {
    // Define a mapping of source paths to target paths
    const redirects = {
       "/teachers": "/education/teachers",
       "/picturebook": "/publications/why-is-coco-orange/why-is-coco-orange-picture-book/",
       "/dc": "/state/?name=district-of-columbia",
       "/publications/wildfire-guide-factsheets/prepare-for-fire-season": "/publications/wildfire-guide-factsheets/wildfire-guide-factsheet-prepare-for-fire-season",
       "/wildfire-guide": "/publications/wildfire-smoke-guide/wildfire-smoke-a-guide-for-public-health-officials",
       "/airaware": "/aqaw",
       "/publications/activity-guides/air-quality-and-outdoor-activity-guidance-for-schools": "/publications/air-quality-flag-program-getting-started/air-quality-and-outdoor-activity-guidance-for-schools-flag-program/",
       "/publications/activity-guides/air-quality-guide-for-ozone": "/publications/activity-guides/air-quality-activity-guide-for-ozone",
       "/coco": "/education/why-is-coco-orange",
       "/flag": "/air-quality-flag-program",
       "/fires": "/wildfires",
       "/aircompare": "https://www3.epa.gov/aircompare/",
       "/students": "/education/students",
       "/flag-program-widget": "/air-quality-flag-program-widget/",
       "/publications/wildfire-smoke-guide/wildfire-smoke-protect-yourself-from-ash": "/publications/wildfire-guide-factsheets/protect-yourself-from-ash/",
       "/publications/wildfire-smoke-guide/wildfire-smoke-protect-your-large-animals-and-livestock": "/publications/wildfire-guide-factsheets/wildfire-smoke-protect-your-large-animals-and-livestock/",
       "/publications/wildfire-smoke-guide/protect-your-lungs-from-wildfire-smoke": "/publications/wildfire-guide-factsheets/protect-your-lungs-from-wildfire-smoke",
       "/publications/activity-guides/activity-sheet-for-pm": "/publications/activity-guides/air-quality-guide-for-particle-pollution/",
       "/publications/wildfire-smoke-guide/wildfire-smoke-indoor-air-filtration-factsheet": "/publications/wildfire-guide-factsheets/wildfire-smoke-indoor-air-filtration-factsheet",
       "/publications/wildfire-smoke-guide/reduce-your-smoke-exposure": "/publications/wildfire-guide-factsheets/reduce-your-smoke-exposure/",
       "/publications/wildfire-smoke-guide/wildfire-smoke-protect-your-pets": "/publications/wildfire-guide-factsheets/wildfire-smoke-protect-your-pets/",
       "/publications/wildfire-smoke-guide/protecting-children-from-wildfire-smoke-and-ash": "/publications/wildfire-guide-factsheets/protecting-children-from-wildfire-smoke-and-ash",
       "/whichflag": "/which-flag-do-i-fly/?lang=en",

       "/wildfire-guide-information": "https://www.epa.gov/wildfires/wildfire-smoke-guide-public-health-officials/",
       "/wildfire-guide-factsheets": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources/",

       "/publications/wildfire-smoke-guide/wildfire-smoke-a-guide-for-public-health-officials": "https://www.epa.gov/wildfires/wildfire-smoke-guide-public-health-officials",
       "/publications/wildfire-guide-factsheets/wildfire-guide-factsheet-prepare-for-fire-season": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#prepare",
       "/publications/wildfire-guide-factsheets/at-risk-groups-of-people-fact-sheet": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#atrisk",
       "/publications/wildfire-guide-factsheets/reduce-your-smoke-exposure": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#reduce",
       "/publications/wildfire-guide-factsheets/protecting-children-from-wildfire-smoke-and-ash": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#childrenshealth",
       "/publications/wildfire-guide-factsheets/protect-your-lungs-from-wildfire-smoke": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#protectyourlungs",
       "/publications/wildfire-guide-factsheets/how-to-create-a-clean-room-at-home": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#cleanroom",
       "/publications/wildfire-guide-factsheets/wildfire-smoke-indoor-air-filtration-factsheet": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#indoorair",
       "/publications/wildfire-guide-factsheets/protect-yourself-from-smoke-and-extreme-heat": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#smokeandheat",
       "/publications/wildfire-guide-factsheets/protect-yourself-from-ash": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#protectfromash",
       "/publications/wildfire-guide-factsheets/using-air-quality-sensors-for-smoke": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#sensors",
       "/publications/wildfire-guide-factsheets/coping-with-the-stress-of-wildfire-smoke": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#stress",
       "/publications/wildfire-guide-factsheets/wildfire-smoke-protect-your-pets": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#protectpets",
       "/publications/wildfire-guide-factsheets/wildfire-smoke-protect-your-large-animals-and-livestock": "https://www.epa.gov/wildfires/wildfire-and-health-factsheets-and-resources#protectlargeanimals",
    };

    // Get the current path from the URL
    const currentPath = window.location.pathname;

    // Check if the current path matches any key in the redirects object
    // Handle both with and without trailing slash
    const targetPath = redirects[currentPath] || redirects[currentPath.replace(/\/$/, '')] || redirects[currentPath + '/'];
    if (targetPath) {
        // Perform the redirect
        window.location.assign(targetPath);
    }
}

// Call the function to handle redirects
handleRedirects();


