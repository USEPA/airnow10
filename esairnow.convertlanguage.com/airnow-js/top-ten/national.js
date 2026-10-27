window.onload = function() {
    var img1 = document.getElementById("currentaqi");
    EXIF.getData(img1, function() {
      var dt = new Date(Number(EXIF.getTag(this, "DateTimeOriginal")));
      var exifspan = document.getElementById("currenttimestamp");
      var tz = dt.toTimeString().match(new RegExp("[A-Z](?!.*[\(])", "g")).join('');
      exifspan.innerHTML = "Updated " + moment(dt).format("MMMM DD, YYYY hh:mm A zz ") + tz;
    });
    var img2 = document.getElementById("forecastaqi");
    EXIF.getData(img2, function() {
      var dt = new Date(Number(EXIF.getTag(this, "DateTimeOriginal")));
      var exifspan = document.getElementById("forecasttimestamp");
      var tz = dt.toTimeString().match(new RegExp("[A-Z](?!.*[\(])", "g")).join('');
      exifspan.innerHTML = "Updated " + moment(dt).format("MMMM DD, YYYY hh:mm A zz ") + tz;
    });
  }
// Hide Timestamps on really small screens cw 2023-08-14
  if (screen.width < 330) {
     document.getElementById("currenttimestamp").style.visibility = "hidden";
     document.getElementById("forecasttimestamp").style.visibility = "hidden";
    }
    // Find the element with inner HTML content that contains "Calidad". This is to make the titles and maps line up for the Spanish translation of the page. cw 2024-03-21
    const elements = document.querySelectorAll('h2.text-center');
    elements.forEach(element => {
        if (element.innerHTML.includes('Calidad del aire')) {
            // Do something with the element
            element.style.height = '66px';
        }
    }); 

$(function(){
    handleAqiLegend();
    $(".po-aqi-scale").toggleClass("noData");
    function handleAqiLegend() {
      $('.po-aqi-scale-btn').click(function() {
        $(this).addClass('po-aqi-scale-btn-hidden');
        $('.po-aqi-scale-display').removeClass('po-aqi-scale-display-hidden');
      });
      $('.po-aqi-scale-display .fa-times').click(function() {
        $('.po-aqi-scale-display').addClass('po-aqi-scale-display-hidden');
        $('.po-aqi-scale-btn').removeClass('po-aqi-scale-btn-hidden');
      });
    }
  });