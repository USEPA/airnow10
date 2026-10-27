// This script will read the url varables and display the correct AirNow Heat Exposeure messaging
// cw 2025-03-13

document.addEventListener("DOMContentLoaded", function() {
    console.log("Running heat.js: First, get the URL parameters and then display the correct AirNow Heat Exposure messaging. If there are no URL values available or they are incorrect, then redirect to the top level of the site. cw 2025-08-13.");

    /// Check the referrer and redirect if not from an allowed domain cw-cp 2025-08-04
    let ref = document.referrer;
    if (ref === "") {
        // If the referrer is empty, set it to the current URL
        console.log("heat.js: No referrer found, setting to current URL Parameters.");
        const urlParamsReferer = new URLSearchParams(window.location.search);
        const embeddedReferrer = urlParamsReferer.get('referrer');
        console.log('Embedded referrer:', embeddedReferrer)
        ref = embeddedReferrer;
    }
    console.log("heat.js: Document referrer is:", ref); // Output the referrer
    console.log(document);

    // Allowed domains regex
    //   /^https?:\/\/([a-zA-Z0-9-]+\.)*airnow\.gov/,
    const allowed = [
        /^https?:\/\/([a-zA-Z0-9-]+\.)esairnow\.convertlanguage\.com/,
        /^https?:\/\/([a-zA-Z0-9-]+\.)*app\.cloud\.gov/,
        /^https?:\/\/127\.0\.0\.1/,
        /^https?:\/\/localhost/
    ];
    // If not from allowed domain, redirect to www. of the referring domain
    if (!allowed.some(rx => rx.test(ref))) {
        try {
        const url = new URL(ref);
        let host = url.hostname;
        // If not already www., add it
        if (!host.startsWith('www.')) {
            host = 'www.' + host.replace(/^([^.]+\.)?/, '');
        }
        const redirectUrl = url.protocol + '//' + host;
        console.log(`heat.js: Referrer is not from an allowed domain. Redirecting to ${redirectUrl}`);
        // put the city, state, and country in the redirect URL
        const city = AirNowGov.GeoLocation.getCityName();
        const state = AirNowGov.GeoLocation.getStateCode();
        const country = AirNowGov.GeoLocation.getCountryCode();
        if (city && state && country) {
            redirectUrl += `?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&country=${encodeURIComponent(country)}`;
        }
        window.location.href = redirectUrl;
        } catch (e) {
        // If referrer is invalid or missing
        window.location.href = "https://www.airnow.gov";
        }
    } else {
        console.log("heat.js: Referrer is from an allowed domain. Script will continue.");
    }

    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Subscribe to the PageLoader topic to update URL parameters when a new location is selected
    // let AirNowGov = Drupal.behaviors.AirNowGov;
    // let PageLoader = AirNowGov.PageLoader;
    // let GeoLocation = AirNowGov.GeoLocation;
    // let PubSub = window.PubSub;
    // PubSub.subscribe(GeoLocation.TOPICS.new_location, function () {
    //       let locationDisplayName = GeoLocation.getLocationDisplayName();
    //       geoLocationCity = AirNowGov.GeoLocation.getCityName();
    //       geoLocationState = AirNowGov.GeoLocation.getStateCode();
    //       if (urlParams.get('city') !== geoLocationCity || urlParams.get('state') !== geoLocationState) {
    //         // reset pmaqi and heat variables
    //         pmaqi = null;
    //         heat = null;
    //         let newUrl = new URL(window.location.href);
    //         newUrl.searchParams.set('city', geoLocationCity);
    //         newUrl.searchParams.set('state', geoLocationState);
    //         window.history.replaceState({}, '', newUrl);
    //         window.location.reload();
    //       }
    //     });
    
    // Get the value of the "lat" parameter
    let lat = urlParams.get('lat'); 
    // Get the value of the "long" parameter
    let long = urlParams.get('long');
    // Get the value of the "city" parameter
    let city = urlParams.get('city');
    // Get the value of the "state" parameter
    let state = urlParams.get('state');
    // Get the value of the "heat" parameter
    let heat = urlParams.get('heat');
    // Get the value of the "aqi" parameter
    let pmaqi = urlParams.get('pmaqi');
    // Get the value of the "alertNum" parameter
    const alertId = urlParams.get('alertId');
    let category = "None";
    let pollutant = "PM2.5";

    // city and state are required, so if they are not present in the URL, then set them from local storage
    if (!city || !state) {
        city = AirNowGov.GeoLocation.getCityName();
        state = AirNowGov.GeoLocation.getStateCode();
    }

    // If less than USG, OR missing either value, then ALWAYS redirect to the main page with city, state, and country in the URL cw-cp 2025-08-05
    //alert( isNaN(Number(heat)) );
    if (pmaqi < 101 || pmaqi === null || heat === "" || heat === null || heat === undefined || !isNaN(Number(heat)) || isNaN(Number(pmaqi))) {
       // put the city, state, and country in the redirect URL
        country = 'USA';
        let redirectUrl = "https://esairnow.convertlanguage.com/";
        if (city && state && country) {
            redirectUrl += `?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&country=${encodeURIComponent(country)}`;
        }
        window.location.href = redirectUrl;
    }
    
    console.log('URL city= ',city); // Output the value of aqi
    console.log('URL state= ',state); // Output the value of aqi
    console.log('URL pmaqi= ',pmaqi); // Output the value of pmaqi
    console.log('URL heat=',heat); // Output the value of heat
    console.log('alertId=',alertId); // Output the value of heat

    // insert the heat value into the p element with the id "heat_value" but capitalize the first letter
    if(heat !== null && heat !== undefined) {
        if (heat === "advisory") {
            document.getElementById("heat_value").innerHTML = "Aviso de calor";
        } else if (heat === "warning") {
            document.getElementById("heat_value").innerHTML = "Advertencia de calor extremo";
            // On esairnow.convertlanguage.com, the "Extreme Heat Warning" is too long, so we will make the box bigger cw-cp 2025-08-05
            if (window.location.hostname === "esairnow.convertlanguage.com" || window.location.hostname === "espanol.airnow.gov") {
                document.getElementById("heat_value").style.width = "180px";
            }
        } else {
            document.getElementById("heat_value").innerHTML = "Sin alerta de calor";
        } 
        // // Hide NWS Area Description and NWS Description "blank lines" if not using NWS data
        // document.getElementById("heat-alert-link").style.display = "none";
        // document.getElementById("heat-alert-link-anchor-text").innerHTML = "&nbsp;";
    }

    /// ONLY use URL parameters! cw 2025-08-05
    //
    // } else {
        // // Retrieve lat & long from local storage
        // let userLatitude = AirNowGov.GeoLocation.getLatLng().lat;
        // let userLongitude = AirNowGov.GeoLocation.getLatLng().lng;
        // console.log("No heat data in URL, using lat: ", userLatitude, " and lng: ", userLongitude, " to get heat data from NWS API from here:");
        // console.log("https://api.weather.gov/alerts/active?point=" + userLatitude + "," + userLongitude);

        // const lat = userLatitude;
        // const lon = userLongitude;

        // try {
        //     const response = await fetch(`https://api.weather.gov/alerts/active?point=${lat},${lon}`);
        //     const data = await response.json();
        //     const heatAlerts = data.features.filter(alert =>
        //         alert.properties.event === "Heat Advisory" || alert.properties.event === "Extreme Heat Warning"
        //     );
        //     console.log("heatAlerts: ", heatAlerts);
        //     // If there are multiple heat alerts, use the highest one
        //      if (heatAlerts.length > 1) {  
        //         console.log("heatAlerts length: ", heatAlerts.length);
        //         console.log("There are multiple heat alerts, sorting them by severity.");
        //             heatAlerts.sort((a, b) => {
        //                 const eventTypeA = a.properties.event;
        //                 const eventTypeB = b.properties.event;
        //                 if (eventTypeA.includes("Extreme Heat Warning")) return -1; // Extreme Heat Warning is more severe
        //                 if (eventTypeB.includes("Extreme Heat Warning")) return 1;
        //                 if (eventTypeA.includes("Heat Advisory")) return -1; // Heat Advisory is less severe
        //                 if (eventTypeB.includes("Heat Advisory")) return 1;
        //                 return 0; // If both are the same type, keep original order
        //             });
        //     }
        //     console.log("heatAlerts after sort: ", heatAlerts);
        
        //     if (heatAlerts.length > 0) {
        //         const eventType = heatAlerts[0].properties.event
        //         if (eventType.includes("Heat Advisory")) {
        //             heat = "advisory";
        //         } else if (eventType.includes("Extreme Heat Warning")) {
        //             heat = "warning";
        //         }
                
        //         document.getElementById("heat-alert-type").innerHTML = eventType;
        //         const eventHeadline = heatAlerts[0].properties.headline;
        //         document.getElementById("top-message").style = "text-align: center; width: 300px;";
        //         document.getElementById("top-message").innerHTML = eventHeadline + "<p>&nbsp;</p>";
        //         if (heat === "advisory") {
        //             document.getElementById("heat_value").innerHTML = "Heat Advisory";
        //         } else if (heat === "warning") {
        //             document.getElementById("heat_value").innerHTML = "Extreme Heat Warning";
        //         } else {
        //             document.getElementById("heat_value").innerHTML = "No Heat Alert";
        //         } f
        //         // NWS Area Description
        //         const areaDesc = heatAlerts[0].properties.areaDesc;
        //         document.getElementById("nws-areaDesc").innerHTML = "<strong>National Weather Service Area Description:</strong> " + areaDesc+"<p>&nbsp;</p>";
        //         // NWS Description
        //         const description = heatAlerts[0].properties.description;
        //         document.getElementById("nws-description").innerHTML = "<strong>National Weather Service "+eventType+" Description:</strong> " + description +"<p>&nbsp;</p>";

        //     }
        // } catch (error) {
        //     console.error('NWS API error:', error);
        // }
    // }

    // insert the aqi value into the p element with the id "aqi_value"
    document.getElementById("aqi_value").innerHTML = pmaqi;

    /// ONLY use URL parameters! cw 2025-08-05

    //

    // // If missing from the URL the retrieve AQI data from Local Storage cw 2025-07-23
    // if (pmaqi === null || pmaqi === undefined || pmaqi === "null" || pmaqi === "undefined") {
    //     let ReportingArea = AirNowGov.ReportingArea;
    //     let currentAQData = ReportingArea.getMaxCurrentReportingAreaData();
    //     let category = currentAQData[ReportingArea.FIELDS.category];
    //     let max_aqi = currentAQData[ReportingArea.FIELDS.aqi];
    //     //substitute the pmaqi value with the max_aqi value
    //     pmaqi = max_aqi;
    //     pollutant = currentAQData[ReportingArea.FIELDS.parameter];
    //     document.getElementById("pollutant").innerHTML = pollutant + " Current AQI";

    //     console.log("pmaqi from Local Storage: ", pmaqi);
    //     console.log("category from Local Storage: ", category);
    //     console.log("heat: ", heat);
    // }

    // console.log("Max AQI pollutant is: ", pollutant + "... We need to find the PM25 value in the otherAQData array.");
    // // if max is a non-PM25 polutant, then find the PM25 value
    // if (pollutant !== "PM2.5") {
    //     category = "Not Available";
    //     pmaqi = "Not Available";
    //     pollutant = "Not Available";

    //     ReportingArea = AirNowGov.ReportingArea;
    //     otherAQData = ReportingArea.getOtherCurrentReportingAreaData();
    //     console.log("otherAQData length: " + otherAQData.length);
    //     if (otherAQData[0] !== undefined ) {
    //         // If the otherData is available, then look for "PM25" in the otherAQData
    //         if (otherAQData[0][ReportingArea.FIELDS.parameter] === "PM2.5") {
    //             category = otherAQData[0][ReportingArea.FIELDS.category];
    //             pmaqi = otherAQData[0][ReportingArea.FIELDS.aqi];
    //             pollutant = otherAQData[0][ReportingArea.FIELDS.parameter];

    //             console.log("otherAQData pmaqi : ", pmaqi);
    //             console.log("otherAQData category : ", category);
    //             console.log("otherAQData pollutant : ", pollutant);

    //             document.getElementById("pollutant").innerHTML = pollutant + " Current AQI";
    //         } 
    //     } 
        /// ONLY use URL parameters! cw 2025-08-05
        //
        // else {
        //         // If the otherData is not available, then use the forecast data
        //         console.log("No otherAQData available, using forecast data to find a PM25 value.");
        //         // check to see if there is a forecast value ... ToDO: LOOP?? or sort for PM25
        //         ReportingArea = AirNowGov.ReportingArea;
        //         let forecastAQData = ReportingArea.getAllForecastReportingAreaData();
        //         console.log("forecastAQData: ", forecastAQData);
        //         console.log("forecastAQData[0]: ", forecastAQData[0]);
        //         if (forecastAQData[0] !== undefined && forecastAQData[0][ReportingArea.FIELDS.parameter] === "PM2.5" && forecastAQData.length > 0) {
        //             console.log("forecastAQData[0] pollutant: ", forecastAQData[0][ReportingArea.FIELDS.parameter]);
        //             // If there is a forecast value, then use that
        //             category = forecastAQData[0][ReportingArea.FIELDS.category];
        //             pmaqi = forecastAQData[0][ReportingArea.FIELDS.aqi];
        //             pollutant = forecastAQData[0][ReportingArea.FIELDS.parameter];
                    
        //             document.getElementById("pollutant").innerHTML = pollutant + " Forecast AQI";
        //         } else {
        //             // If there is no forecast value, then set the category and pmaqi to "Not Available"
        //             console.log("No PM2.5 value available in forecast data, either.");
        //             category = "Not Available";
        //             pmaqi = "Not Available";
        //             pollutant = "Not Available";
        //             document.getElementById("pollutant").innerHTML = pollutant + " Current AQI";
        //         }
        // }

    //}

    // Modify the template page
    document.getElementById("city").innerHTML = "<h2>" + city + ", " + state + "</h2>";

    document.getElementById("aqi_value").innerHTML = pmaqi;
    // find the category of the aqi value all the way up to 301
    if (pmaqi > 0 && pmaqi <= 50) { category = "Good"; }   
    else if (pmaqi > 50 && pmaqi <= 100) { category = "Moderate"; }
    else if (pmaqi > 100 && pmaqi <= 150) { category = "Unhealthy for Sensitive Groups"; }
    else if (pmaqi > 150 && pmaqi <= 200) { category = "Unhealthy"; }
    else if (pmaqi > 200 && pmaqi <= 300) { category = "Very Unhealthy"; }
    else if (pmaqi > 300) { category = "Hazardous"; } 

        // Change Spaces to correct style names
    categoryDisplay = "No disponible";
    if (category === "Good") {
            categoryDisplay = "Good"; // good
        } else if (category === "Moderate") {
            categoryDisplay = "Moderate"; // moderate
        } else if (category == "Unhealthy for Sensitive Groups") {
            category = "unhealthy-sensitive";
            categoryDisplay = "Unhealthy for Sensitive Groups"; // semi unhealthy
        } else if (category == "Unhealthy") {
            categoryDisplay = "Unhealthy"; // unhealthy
        } else if (category == "Very Unhealthy") {
            category = "very-unhealthy";
            categoryDisplay = "Very Unhealthy"; // very unhealthy
        } else if (category == "Hazardous") {
            categoryDisplay = "Hazardous"; // hazardous
        } else if (category == "No disponible") {
            category = "not-available";
            categoryDisplay = "None";
        }
    // Apply the correct style to the circle
    document.getElementById("aqi_value").classList.add(category.toLowerCase());
    document.getElementById("aqi_category").innerHTML = categoryDisplay;
    // Set the Heat color
    if (heat === "advisory") {
        document.getElementById("heat_value").style.backgroundColor = "#FFD700"; // yelow
    } else if (heat === "warning") {
        document.getElementById("heat_value").style.backgroundColor =  "#FF0000"; // red
    } else {
        document.getElementById("heat_value").style.backgroundColor = "grey"; // grey
    }
    document.getElementById("heat_value").style.color = "black";

    // set heat-alert-type-info
    document.getElementById("heat-alert-type-info").innerHTML = "Calor esperado";

    // Set the heat alert period
    document.getElementById("heat-alert-period").innerHTML = "over the next 3-12 hours";

    // Set the heat alert type 
    if (heat === "advisory") {
        document.getElementById("heat-alert-type").innerHTML = "Aviso de calor";
        //document.querySelector("#heat-alert-link a").href = "https://alerts.weather.gov/search?id=" + alertId;
    } else if (heat === "warning") {
        document.getElementById("heat-alert-type").innerHTML = "Advertencia de calor extremo";
    } else {
        document.getElementById("heat-alert-type").innerHTML = "Sin alerta de calor";
        document.getElementById("heat-alert-type-info").innerHTML = "&nbsp;";
        document.getElementById("heat-alert-period").innerHTML = "&nbsp;";
        document.getElementById("heat-alert-link").innerHTML = "&nbsp;";
    }

    // Set the heat messaging. First Advisory then Alert
    if (heat === "advisory") {
        // use Middle themometer for advisory
        document.getElementById("thermometer").src = "/sites/default/files/inline-images/thermometerMiddle.png";
        // update the Middle Message
        document.getElementById("middle-message").innerHTML = "<span style='font-size: medium; font-weight: bold;'>El calor empeora los efectos del humo, tome precauciones adicionales.</span><p>&nbsp;</p>";
        document.getElementById("middle-message").style.display = "flex";
        document.getElementById("middle-message").style.justifyContent = "center";
        document.getElementById("middle-message").style.height = "5vh";
        // Update the alert link with the alertID value
        document.getElementById("heat-alert-link").href = "https://www.weather.gov/alerts?alertId=" + alertId;
        if (pmaqi <= 50) {
            document.getElementById("heat-tips").innerHTML = "<ol>\n                <li>La calidad del aire es buena, pero hoy hay un aviso de calor vigente. Está bien estar afuera en la parte más fresca del día.<\/li>\n                <li>Aunque la calidad del aire es buena, durante el calor del día busque aire más fresco, especialmente si tiene síntomas. <ul>\n                    <li>Si tiene que estar al aire libre, tome descansos frecuentes a la sombra.<\/li>\n                    <\/ul>\n                <\/li>\n                <li>Bebe mucha agua.<\/li>\n                <li>Cierre persianas o persianas para mantener el calor fuera durante el día.<\/li>\n            <\/ol>";
        } else if (pmaqi > 50 && pmaqi <= 100) {
            document.getElementById("heat-tips").innerHTML = "<ol>\n                <li>La calidad del aire es moderada, pero hoy hay un aviso de calor vigente. Está bien estar afuera en la parte más fresca del día.<\/li>\n                <li>Aunque la calidad del aire es moderada, durante el calor del día busque aire más fresco, especialmente si tiene síntomas. <ul>\n                    <li>Si tiene que estar al aire libre, tome descansos frecuentes a la sombra.<\/li>\n                    <\/ul>\n                <\/li>\n                <li>Bebe mucha agua.<\/li>\n                <li>Cierre persianas o persianas para mantener el calor fuera durante el día.<\/li>\n            <\/ol>";
        } else if (pmaqi > 100 && pmaqi <= 150) {
            document.getElementById("heat-tips").innerHTML = "<ol>\n                <li> Busque aire más limpio y fresco. <ul>\n                    <li>Reduzca la actividad al aire libre, especialmente si tiene síntomas.<\/li>\n                    <li>Si tiene que estar al aire libre, tome descansos frecuentes a la sombra.<\/li>\n                    <\/ul>\n                <\/li>\n                <li>Bebe mucha agua.<\/li>\n                <li>Cierre persianas o persianas para mantener el calor fuera durante el día.<\/li>\n            <\/ol>";
        }
        else if (pmaqi > 150 && pmaqi <= 200) {
            document.getElementById("heat-tips").innerHTML = "<ol>\n                <li> Busque aire más limpio y fresco. <ul>\n                    <li>Reduzca la actividad al aire libre, especialmente si tiene síntomas.<\/li>\n                    <li>Si tiene que estar al aire libre, tome descansos frecuentes a la sombra.<\/li>\n                    <\/ul>\n                <\/li>\n                <li>Bebe mucha agua.<\/li>\n                <li>Cierre persianas o persianas para mantener el calor fuera durante el día.<\/li>\n            <\/ol>";
        }
        else if (pmaqi > 200 && pmaqi <= 300) {
            document.getElementById("heat-tips").innerHTML = "<ol>\n                <li> Permanezca en el interior con aire más limpio y fresco tanto como sea posible. <ul>\n                    <li>Evite las actividades al aire libre, especialmente si tiene síntomas.<\/li>\n                    <li>Si tiene que estar al aire libre, tome descansos frecuentes a la sombra.<\/li>\n                    <\/ul>\n                <\/li>\n                <li>Bebe mucha agua.<\/li>\n                <li>Cierre persianas o persianas para mantener el calor fuera durante el día.<\/li>\n            <\/ol>";
        }
        else if (pmaqi > 300) {
            document.getElementById("heat-tips").innerHTML = "<ol>\n                <li> Permanezca en el interior con aire más limpio y fresco tanto como sea posible. <ul>\n                    <li>Evite toda actividad física al aire libre.<\/li>\n                    <\/ul>\n                <\/li>\n                <li>Bebe mucha agua.<\/li>\n                <li>Cierre persianas o persianas para mantener el calor fuera durante el día.<\/li>\n                <li>Consulte con su gobierno estatal o local para averiguar si hay refugios de aire más limpio y enfriamiento abiertos cerca de usted o llame al 2-1-1 para obtener referencias a refugios locales.<\/li>\n            <\/ol>";
        }
    } else if (heat === "warning") {
        // use High themometer for warning 
        document.getElementById("thermometer").src = "/sites/default/files/inline-images/thermometerHigh.png";
        // update the Middle Message
        document.getElementById("middle-message").innerHTML = "<span style='font-size: medium; font-weight: bold;'>El calor empeora los efectos del humo, tome precauciones adicionales.</span><p>&nbsp;</p>";
        document.getElementById("middle-message").style.display = "flex";
        document.getElementById("middle-message").style.justifyContent = "center";
        document.getElementById("middle-message").style.height = "5vh";
        if (pmaqi <= 50) {
            document.getElementById("heat-tips").innerHTML = "<ol>\n                <li>La calidad del aire es buena, pero hoy hay una advertencia de calor extremo vigente. Evite las actividades extenuantes al aire libre.<\/li>\n                <li>Aunque la calidad del aire sea buena, busque aire acondicionado, incluso durante la noche, especialmente si tiene síntomas. <ul>\n                    <li>Si tiene que estar al aire libre, tome descansos frecuentes a la sombra y use ropa liviana.<\/li>\n                    <li>Cierre persianas o persianas para mantener el calor fuera durante el día.<\/li>\n                    <\/ul>\n                <\/li>\n                <li>Bebe mucha agua.<\/li>\n                <li>Consulte con su gobierno estatal o local para averiguar si hay refugios de aire más limpio y enfriamiento cerca de usted o llame al 2-1-1 para obtener referencias.<\/li>\n            <\/ol>";
        } else if (pmaqi > 50 && pmaqi <= 100) {
            document.getElementById("heat-tips").innerHTML = "<ol>\n                <li>La calidad del aire es moderada, pero hoy hay una advertencia de calor extremo vigente. Evite las actividades extenuantes al aire libre.<\/li>\n                <li>Aunque la calidad del aire sea moderada, busque aire acondicionado, incluso durante la noche, especialmente si tiene síntomas. <ul>\n                    <li>Si tiene que estar al aire libre, tome descansos frecuentes a la sombra y use ropa liviana.<\/li>\n                    <li>Cierre persianas o persianas para mantener el calor fuera durante el día.<\/li>\n                    <\/ul>\n                <\/li>\n                <li>Bebe mucha agua.<\/li>\n            <\/ol>";
        } else if (pmaqi > 100 && pmaqi <= 150) {
            document.getElementById("heat-tips").innerHTML = "<ol>\n                <li> Busque aire más limpio y fresco, especialmente si tiene síntomas. <ul>\n                    <li>Evite las actividades extenuantes al aire libre, especialmente si tiene síntomas.<\/li>\n                    <li>Si tiene que estar al aire libre, tome descansos frecuentes a la sombra y use ropa liviana.<\/li>\n                    <\/ul>\n                <\/li>\n                <li>Bebe mucha agua.<\/li>\n                <li>Cierre persianas o persianas para mantener el calor fuera durante el día.<\/li>\n            <\/ol>";
        } else if (pmaqi > 150 && pmaqi <= 200) {
            document.getElementById("heat-tips").innerHTML = "<ol>\n                <li> Busque aire más limpio y fresco, especialmente si tiene síntomas. <ul>\n                    <li>Evite las actividades extenuantes al aire libre, especialmente si tiene síntomas.<\/li>\n                    <li>Si tiene que estar al aire libre, tome descansos frecuentes a la sombra y use ropa liviana.<\/li>\n                    <\/ul>\n                <\/li>\n                <li>Bebe mucha agua.<\/li>\n                <li>Cierre persianas o persianas para mantener el calor fuera durante el día.<\/li>\n            <\/ol>";
        }
        else if (pmaqi > 200 && pmaqi <= 300) {
            document.getElementById("heat-tips").innerHTML = "<ol>\n                <li> Permanezca en el interior con aire más limpio y con aire acondicionado tanto como sea posible, incluso durante la noche. <ul>\n                    <li>Evite toda actividad física al aire libre.<\/li>\n                    <li>Si tiene que estar al aire libre, tome descansos frecuentes a la sombra.<\/li>\n                    <li>Cierre persianas o persianas para mantener el calor fuera durante el día.<\/li>\n                    <\/ul>\n                <\/li>\n                <li>Bebe mucha agua.<\/li>\n                <li>Consulte con su gobierno estatal o local para averiguar si hay refugios de aire más limpio y enfriamiento abiertos cerca de usted o llame al 2-1-1 para obtener referencias a refugios locales.<\/li>\n            <\/ol>";
        }
        else if (pmaqi > 300) {
            document.getElementById("heat-tips").innerHTML = "<ol>\n                <li> Permanezca en el interior con aire más limpio y con aire acondicionado tanto como sea posible, incluso durante la noche. <ul>\n                    <li>Evite toda actividad física al aire libre.<\/li>\n                    <li>Si tiene que estar al aire libre, tome descansos frecuentes a la sombra.<\/li>\n                    <li>Cierre persianas o persianas para mantener el calor fuera durante el día.<\/li>\n                    <\/ul>\n                <\/li>\n                <li>Bebe mucha agua.<\/li>\n                <li>Consulte con su gobierno estatal o local para averiguar si hay refugios de aire más limpio y enfriamiento cerca de usted o llame al 2-1-1 para obtener referencias a refugios locales.<\/li>\n            <\/ol>";
        }
    }

    // Add "in English" without any parenthesis after the two links referenced by their href of "https://www.weather.gov/heat" & "https://www.weather.gov/wrn/heat_infographics" only when on espanol.airnow.gov  The words "in English" are not part of the link. cw-cp 2025-08-13
    if (window.location.hostname === "espanol.airnow.gov") {
        var heatLink = document.querySelector('a[href="https://www.weather.gov/heat"]');
        if (heatLink) {
            heatLink.insertAdjacentHTML('afterend', ' en inglés');
        }
        var heatInfographicLink = document.querySelector('a[href="https://www.weather.gov/wrn/heat_infographics"]');
        if (heatInfographicLink) {
            heatInfographicLink.insertAdjacentHTML('afterend', ' en inglés');
        }
    }

    console.log("heat.js Done!");

});

// Add another DOMContentLoaded event listener to forward the browser to the current domain after ten minutes; include a documentation line that explains the conversion for time to milliseconds. Add the city, state, and country URL parameters using urlParams.get() to the forwarding URL using the encodeURIComponent function. cw-cp 2025-08-28
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var urlParams = new URLSearchParams(window.location.search);
        var city = urlParams.get('city');
        var state = urlParams.get('state');
        var country = urlParams.get('country');
        
        window.location.href = window.location.origin + "?city=" + encodeURIComponent(city) + "&state=" + encodeURIComponent(state) + "&country=" + encodeURIComponent(country);
    }, 600000); // 600,000 ms = 10 minutes
});
