// Builds the <iframe> code for the widget based on user input and places it in the textarea for copying and puts it in a alert box for easy copying (AIR-778) cw 2026-05-04
     
function buildCall()
 {
	var t=document.getElementById( "Title" ).value; 
	var z=document.getElementById("Zipcode").value;
	if (document.groovyform.radio[2].checked) {
      var r = "current";
    }
    if (document.groovyform.radio[0].checked) {
      var r = "today";
    }
    if (document.groovyform.radio[1].checked) {
      var r = "tomorrow";
    }
    
	if (t==null || z=="")
  	{
  		alert("El nombre y el código postal deben completarse.");
  	} else {  
	    simba.value = "<iframe height=\"340\" src=\"https://widget.airnow.gov/aq-flag-widget/?a=" + r + "&z=" + z + "&n=" + t + "\" width=\"230\"><\/iframe>" ; 	 
      displayFunction();
    }
  } 
  
function displayFunction() {
  /* Get the text field */
  var copyText = document.getElementById("simba");
  /* Select the text field */
  console.log(copyText.value);
    /* put the text into the user clipboard */
  navigator.clipboard.writeText(copyText.value);
// update the form so that it displays the iframe code in the textarea for copying
  document.getElementById("simba").value = copyText.value;  
  // make simba field be visible so that the user can see the iframe code in the textarea for copying
  document.getElementById("simba").style.display = "block"; 
  // also put it into "simba-box" div so that the user can see the iframe code in the div for copying
  document.getElementById("simba-box").innerHTML = copyText.value;

  /* Alert the copied text */
  //alert(copyText.value);
} 
