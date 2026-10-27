
populateTopTen();

function populateTopTen() {
    //alert("populateTopTen starting");

    // Retrieve the Top Ten aqi cw 2020-07-30
    // resetting because it could be set from previous calls
    topTenData = {};
        // use ajax to get the data cw 2020-07-30
        //console.log(AirNowGov.API_URL);
        $.ajax({
            type: "GET",
            url: "https://airnowgovapi.com/v2/reportingarea/get_top",
            context: this,
            success: function (response) {
                //console.log("top-ten.js Running...");
                // output it
                for (let i = 0; i < response.length; i++) {
                    //console.log(response[i]);
                    //console.log(response[i].reportingArea);
                    //console.log(response[i].stateCode);
                    //console.log(response[i].aqi);
                    //console.log(response[i].reportingArea + " category is " + response[i].category);
                    //console.log("ActionDay is " + response[i].isActionDay);

                    // data insertion
                    eval('cityCell'+i).innerHTML = response[i].reportingArea + ", " + response[i].stateCode;
                    eval('cityCell'+i).href = "/?reportingArea=" + response[i].reportingArea + "&stateCode=" + response[i].stateCode;
                    eval('cityCell'+i).classList.add("NtnlSummaryCity");
                    eval('cityCell'+i).alt = "City"+i;
                    // for Site Improve cw 2025-08-07
                    eval('cityCell'+i).ariaLabel = response[i].reportingArea + ", " + response[i].stateCode;

                    eval('aqiCell'+i).innerHTML = response[i].aqi;
                    eval('aqiCell'+i).classList.add(categoryStyle(response[i].category));

                    // Site Improve fix; need more contrast USG and Unhealty categories cw 2025-08-12
                    if (response[i].category == 'Unhealthy' || response[i].category == 'Insalubre para grupos sensibles' || response[i].category == 'Moderate' || response[i].category == 'Good') {
                    document.getElementById(eval('"aqiCell'+i+'"')).style.color = "black"; 
                    }
                    document.getElementById(eval('"aqiCell'+i+'"')).style.fontWeight = "bold";
                    }
                },
                error: function (response) {
                // TODO: Handle errors
                // console.error(response);
                topTenData = false;
                console.log("Top Ten AQI Locations data not found. This is an AirNow API error.");
                }
            });
            }

// Convert category to color for use in CSS references cw 2020-07-30
function categoryStyle(category){
    let style = "green"; // good
        if (category === "Moderate") {
            style = "moderate"; // moderate
        } else if (category === "Unhealthy for Sensitive Groups") {
            style = "unhealthy-sensitive"; // semi unhealthy
        } else if (category === "Unhealthy") {
            style = "unhealthy"; // unhealthy
        } else if (category === "Very Unhealthy") {
            style = "very-unhealthy"; // very unhealthy
        } else if (category === "Hazardous") {
            style = "hazardous"; // hazardous
        }
        return style;
    }