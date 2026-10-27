/* Updated for AIR-680 cw 2024-01-11 */
function InvLinear(AQIhigh, AQIlow, Conchigh, Conclow, a)
{
var AQIhigh;
var AQIlow;
var Conchigh;
var Conclow;
var a;
var c;
c=((a-AQIlow)/(AQIhigh-AQIlow))*(Conchigh-Conclow)+Conclow;
return c;
}
// AIR-704 PM25 AQI Breakpoint Revisions cw 2024-07-09
function ConcPM25(a)
{
if (a>=0 && a<=50)
{
ConcCalc=InvLinear(50,0,9.0,0,a);
}
else if (a>=51 && a<=100)
{
ConcCalc=InvLinear(100,51,35.4,9.1,a);
}
else if (a>=101 && a<=150)
{
ConcCalc=InvLinear(150,101,55.4,35.5,a);
}
else if (a>=151 && a<=200)
{
ConcCalc=InvLinear(200,151,125.4,55.5,a);
}
else if (a>=201 && a<=300)
{
ConcCalc=InvLinear(300,201,225.4,125.5,a);
}
else if (a>=301 && a<=500)
{
	// Values above 500 should continue using the same SLOPE as the Hazardous category cw 2024-07-09
    // From the TAD page 14: The AQI value of 500 are as follows: ... PM2.5 24-hour—325.4 μg/m3 ... cw 2024-07-15
	ConcCalc=InvLinear(500,301,325.4,225.5,a);
}
else if (a>500)
{
		// Values above 500 should continue using the same SLOPE as the Hazardous category cw 2024-07-09
		// From the TAD page 14: The AQI value of 500 are as follows: ... PM2.5 24-hour—325.4 μg/m3 ... cw 2024-07-15
		ConcCalc=InvLinear(500,301,325.4,225.5,a);
		// 576.4 μg/m3 is AQI of 1000 via the "Consentration to AQI" calculator. cw 2024-07-15	
}
else
{
ConcCalc="Fuera de alcance";
}
return ConcCalc;
}
function ConcPM10(a)
{
if (a>=0 && a<=50)
{
ConcCalc=InvLinear(50,0,54,0,a);
}
else if (a>50 && a<=100)
{
ConcCalc=InvLinear(100,51,154,55,a);
}
else if (a>100 && a<=150)
{
ConcCalc=InvLinear(150,101,254,155,a);
}
else if (a>150 && a<=200)
{
ConcCalc=InvLinear(200,151,354,255,a);
}
else if (a>200 && a<=300)
{
ConcCalc=InvLinear(300,201,424,355,a);
}
else if (a>300 && a<=500)
{
ConcCalc=InvLinear(500,301,604,425,a);
}
else if (a>500)
{
	// Values above 500 should continue using the same SLOPE as the Hazardous category cw 2024-07-09
	ConcCalc=InvLinear(500,301,604,425,a);
}
else
{
ConcCalc="Fuera de alcance";
}
return ConcCalc;
}
function ConcCO(a)
{
if (a>=0 && a<=50)
{
ConcCalc=InvLinear(50,0,4.4,0,a);
}
else if (a>50 && a<=100)
{
ConcCalc=InvLinear(100,51,9.4,4.5,a);
}
else if (a>100 && a<=150)
{
ConcCalc=InvLinear(150,101,12.4,9.5,a);
}
else if (a>150 && a<=200)
{
ConcCalc=InvLinear(200,151,15.4,12.5,a);
}
else if (a>200 && a<=300)
{
ConcCalc=InvLinear(300,201,30.4,15.5,a);
}
else if (a>300 && a<=500)
{
ConcCalc=InvLinear(500,301,50.4,30.5,a);
}
else if (a>500)
{
		// Values above 500 should continue using the same SLOPE as the Hazardous category cw 2024-07-09
		ConcCalc=InvLinear(500,401,50.4,30.5,a);
}
else
{
ConcCalc="Fuera de alcance";
}
return ConcCalc;
}
function ConcSO21hr(a)
{
if (a>=0 && a<=50)
{
ConcCalc=InvLinear(50,0,35,0,a);
}
else if (a>50 && a<=100)
{
ConcCalc=InvLinear(100,51,75,36,a);
}
else if (a>100 && a<=150)
{
ConcCalc=InvLinear(150,101,185,76,a);
}
else if (a>150 && a<=200)
{
ConcCalc=InvLinear(200,151,304,186,a);
}
else if (b>201)
{
ConcCalc="PM10message"; //output values for AQI over or equal to 500 for Hazardous jb 08/01/2023
}
else
{
ConcCalc="Fuera de alcance";
}
return ConcCalc;
}
function ConcSO224hr(a)
{
if (a>=201 && a<=300)
{
ConcCalc=InvLinear(300,201,604,305,a);
}
else if (a>300 && a<=400)
{
ConcCalc=InvLinear(400,301,804,605,a);
}
else if (a>400 && a<=500)
{
		// Values above 500 should continue using the same SLOPE as the Hazardous category cw 2024-07-09
		ConcCalc=InvLinear(500,401,1004,805,a);
}
else
{
ConcCalc="Fuera de alcance";
}
return ConcCalc;
}
function ConcOzone8hr(a)
{
if (a>=0 && a<=50)
{
ConcCalc=InvLinear(50,0,54,0,a);
}
else if (a>50 && a<=100)
{
ConcCalc=InvLinear(100,51,70,55,a);
}
else if (a>100 && a<=150)
{
ConcCalc=InvLinear(150,101,85,71,a);
}
else if (a>150 && a<=200)
{
ConcCalc=InvLinear(200,151,105,86,a);
}
else if (a>200 && a<=300)
{
ConcCalc=InvLinear(300,201,200,106,a);
}
else
{
ConcCalc="O3message";
}
return ConcCalc;
}

function ConcOzone1hr(a)
{
if (a>100 && a<=150)
{
ConcCalc=InvLinear(150,101,164,125,a);
}
else if (a>150 && a<=200)
{
ConcCalc=InvLinear(200,151,204,165,a);
}
else if (a>200 && a<=300)
{
ConcCalc=InvLinear(300,201,404,205,a);
}
else if (a>300)
{
ConcCalc=InvLinear(500,301,604,404,a);
}
else
{
ConcCalc="Fuera de alcance";
}
return ConcCalc;
}

function ConcNO2(a)
{
if (a>=0 && a<=50)
{
ConcCalc=InvLinear(50,0,53,0,a);
}
else if (a>50 && a<=100)
{
ConcCalc=InvLinear(100,51,100,54,a);
}
else if (a>100 && a<=150)
{
ConcCalc=InvLinear(150,101,360,101,a);
}
else if (a>150 && a<=200)
{
ConcCalc=InvLinear(200,151,649,361,a);
}
else if (a>200 && a<=300)
{
ConcCalc=InvLinear(300,201,1249,650,a);
}
else if (a>300)
{
		// Values above 500 should continue using the same SLOPE as the Hazardous category cw 2024-07-09
		ConcCalc=InvLinear(500,301,2049,1250,a);
}
else
{
ConcCalc="Fuera de alcance";
}
return ConcCalc;
}

function AQICategory(AQIndex)
{
var AQI=parseFloat(AQIndex)
var AQICategory;
if (AQI<51)
{
	AQICategory="Good";
}
else if (AQI>=50 && AQI<=100)
{
	AQICategory="Moderate";
}
else if (AQI>=101 && AQI<=150)
{
	AQICategory="Unhealthy for Sensitive Groups";
}
else if (AQI>=151 && AQI<=200)
{
	AQICategory="Unhealthy";
}
else if (AQI>=201 && AQI<=300)
{
	AQICategory="Very Unhealthy";
}
else if (AQI>=301) 
{
	AQICategory="Hazardous";
}
else
{
	AQICategory="Fuera de alcance";
}
return AQICategory;
}
//316

function ClearColorA()
{

	document.form1.outputbox2.style.backgroundColor="white";
	
}

function PollutantUnit(form1)
{
//var form

document.form1.messageunit.style.textAlign="center";
document.form1.outputbox2.style.backgroundColor="white";

document.form1.inputbox.value="";
document.form1.outputbox1.value="";
document.form1.outputbox2.value="";
document.form1.TextSensitive.value="";
document.form1.HealthEffects.value="";
document.form1.Cautionary.value="";

if (document.form1.pollutant.selectedIndex == '1' || document.form1.pollutant.selectedIndex == '2')
{
	document.form1.messageunit.value="ug/m3";	
}
else if (document.form1.pollutant.selectedIndex == '3')
{
	document.form1.messageunit.value="ppm";	
}
else if (document.form1.pollutant.selectedIndex == '4' || document.form1.pollutant.selectedIndex == '5' || document.form1.pollutant.selectedIndex == '6' || form1.pollutant.selectedIndex == '7' || form1.pollutant.selectedIndex == '8')
{
	document.form1.messageunit.value="ppb";	
}
return true;
}

function AQICalc(form1)
{
var b;
var c;

document.form1.inputbox.style.textAlign="center";
document.form1.inputbox.style.backgroundColor="white";

if (document.form1.pollutant.selectedIndex == '0')
{
alert("No seleccionó un contaminante.")
}
if (document.form1.pollutant.selectedIndex == '1')
{
	b=Math.round(document.form1.inputbox.value);
	if (b < 0)
	{		
		b= "lessThan0message";
	}
	else
	{
		c=Math.floor(10*ConcPM25(b))/10;
	}  		
}
else if (document.form1.pollutant.selectedIndex == '2')
{
	b=(document.form1.inputbox.value);
	if (b < 0 )
	{		
		b= "lessThan0message";
	}
	else
	{
		c=Math.floor(ConcPM10(b));
	}  		
}
else if (document.form1.pollutant.selectedIndex == '3')
{
	b=Math.round(document.form1.inputbox.value);
	if (b < 0)
	{		
		b= "lessThan0message";
	} 
	else
	{
		c=Math.floor(10*ConcCO(b))/10;	
	} 		
}
else if (document.form1.pollutant.selectedIndex == '4')
{
	b=Math.round(document.form1.inputbox.value);
	
		if (b<0)
	{		
		b="lessThan0message";
		
	}
	else if (b>200 && b<=500)
	{		
		b= "SO21hrmessage";
	}
		else
	{
		c=Math.floor(ConcSO21hr(b));
	}  		
}
else if (document.form1.pollutant.selectedIndex == '5')
{
	b=Math.round(document.form1.inputbox.value);
		if (b<0 || b>500)
	{		
		b="Fuera de alcance";
	}
	else if (b>=0 && b<=200)
	{		
		b= "SO224hrmessage";
	}
		else
	{
		c=Math.floor(ConcSO224hr(b));
	}  		
}
else if (document.form1.pollutant.selectedIndex == '6')
{
	b=Math.round(document.form1.inputbox.value);	
		if (b<0 || b>500)
	{		
		b="Fuera de alcance";
		
	}
	
	else if (b>300 && b<=500)
	{		
		b= "O3message";
	}
		
	else
	{
		c=Math.floor(ConcOzone8hr(b));
	} 
}


else if (document.form1.pollutant.selectedIndex == '7')
{
	b=Math.round(document.form1.inputbox.value);
		if (b<0)
	{		
		b="lessThan0message";
	}
	else if (b>=0 && b<=100)
	{		
		b= "O31hrmessage";
	}
		else
	{
		c=Math.floor(ConcOzone1hr(b));	
	}  		
}
else if (document.form1.pollutant.selectedIndex == '8')
{
	b=Math.round(document.form1.inputbox.value);
	if (b<0)
	{		
		b= "lessThan0message";
	}
	else
	{
		c=Math.floor(ConcNO2(b));
	}
}
if (b =="Fuera de alcance")
{
//function closeWin() {
//   myWindowOofR.close();
//}
//document.form1.outputbox1.value="Values above 500 are considered Hazardous."; // changed message from Beyond the Index to Hazardous - jb

document.form1.outputbox2.value="Fuera de alcance";	
}

else if (b =="SO21hrmessage")
{

	document.form1.outputbox1.value="AQI values of 201 or greater are calculated with 24-hour SO2 concentrations.";
	document.form1.outputbox2.value="";
}

else if (b =="SO224hrmessage")
{

	
	
	document.form1.outputbox1.value="AQI values less than 201 are calculated with 1-hour SO2 concentrations.";
	document.form1.outputbox2.value="";
	
}

else if (b =="O31hrmessage")
{
	
	
	document.form1.outputbox1.value="AQI values of 100 or lower are calculated with 8-hour ozone concentrations";
	document.form1.outputbox2.value="";
	
}
	
else if (b =="O3message")
{
	
	document.form1.outputbox1.value="AQI values of 301 or greater are calculated with 1-hour ozone concentrations.";
	document.form1.outputbox2.value="";
	
}

else if (b =="PM25message")
{
	document.form1.outputbox1.value="AQI value must be larger than 0.";
	document.form1.outputbox2.value="";
	
}
else if (b =="PM10message")
	{
		document.form1.outputbox1.value="AQI value must be larger than 0.";
		document.form1.outputbox2.value="Hazardous";	
	}
else if (b =="lessThan0message")
	{
		document.form1.outputbox1.value="AQI value must be larger than 0.";
		document.form1.outputbox2.value="";
	}
			

else
{
	document.form1.outputbox1.value=c;
	document.form1.outputbox2.value=AQICategory(b);
}
document.form1.outputbox1.style.textAlign="center";
document.form1.outputbox2.style.textAlign="center";
document.form1.TextSensitive.style.textAlign="center";
document.form1.HealthEffects.style.textAlign="center";
document.form1.Cautionary.style.textAlign="center";

if (document.form1.outputbox2.value == 'Good')
{
	document.form1.outputbox2.style.backgroundColor="#00e000";
	document.form1.outputbox2.style.color="black";
	document.form1.HealthEffects.value="None";
	document.form1.Cautionary.value="None";
	if (document.form1.pollutant.selectedIndex == '1')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";
	}
	else if (document.form1.pollutant.selectedIndex == '2')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades respiratorias son el grupo de mayor riesgo.";
	}
	else if (document.form1.pollutant.selectedIndex == '3')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades cardíacas son el grupo de mayor riesgo.";
	}
	else if (document.form1.pollutant.selectedIndex == '4' || form1.pollutant.selectedIndex == '5')
	{
		document.form1.TextSensitive.value="Las personas con asma son el grupo de mayor riesgo.";
	}
	else if (document.form1.pollutant.selectedIndex == '6' || form1.pollutant.selectedIndex == '7')
	{
		document.form1.TextSensitive.value="Los niños y las personas con asma son los grupos de mayor riesgo.";
	}
	else if (document.form1.pollutant.selectedIndex == '8')
	{
		document.form1.TextSensitive.value="Las personas con asma u otras enfermedades respiratorias, los ancianos y los niños son los grupos de mayor riesgo.";
	}
}
else if (document.form1.outputbox2.value == 'Moderate')
{
	document.form1.outputbox2.style.backgroundColor="#ffff00";
	document.form1.outputbox2.style.color="black";
	if (document.form1.pollutant.selectedIndex == '1')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Las personas inusualmente sensibles deben considerar reducir el esfuerzo prolongado o intenso.";
		document.form1.Cautionary.value="Las personas inusualmente sensibles deben considerar reducir el esfuerzo prolongado o intenso.";	
	}
	else if (document.form1.pollutant.selectedIndex == '2')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades respiratorias son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Las personas inusualmente sensibles deben considerar reducir el esfuerzo prolongado o intenso.";
		document.form1.Cautionary.value="Las personas inusualmente sensibles deben considerar reducir el esfuerzo prolongado o intenso.";	
	}
	else if (document.form1.pollutant.selectedIndex == '3')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades cardíacas son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="None";
		document.form1.Cautionary.value="None";	
	}
	else if (document.form1.pollutant.selectedIndex == '4' || form1.pollutant.selectedIndex == '5')
	{
		document.form1.TextSensitive.value="Las personas con asma son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="None";
		document.form1.Cautionary.value="None";	
	}
	else if (document.form1.pollutant.selectedIndex == '6' || form1.pollutant.selectedIndex == '7')
	{
		document.form1.TextSensitive.value="Los niños y las personas con asma son los grupos de mayor riesgo.";
		if (document.form1.pollutant.selectedIndex == '6')
		{
			document.form1.HealthEffects.value="Las personas inusualmente sensibles pueden experimentar síntomas respiratorios.";
			document.form1.Cautionary.value="Las personas inusualmente sensibles deben considerar limitar el esfuerzo prolongado al aire libre.";
		}
	}
	else if (document.form1.pollutant.selectedIndex == '8')
	{
		document.form1.TextSensitive.value="Las personas con asma u otras enfermedades respiratorias, los ancianos y los niños son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Las personas inusualmente sensibles pueden experimentar síntomas respiratorios.";
		document.form1.Cautionary.value="Las personas inusualmente sensibles deben considerar reducir el esfuerzo prolongado o intenso al aire libre.";
	}
}
else if (document.form1.outputbox2.value == 'Insalubre para grupos sensibles')
{
	document.form1.outputbox2.style.backgroundColor="#ff7600";
	document.form1.outputbox2.style.color="black";
	if (document.form1.pollutant.selectedIndex == '1')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Aumento de la probabilidad de síntomas respiratorios en personas sensibles, agravamiento de enfermedades cardíacas o pulmonares y mortalidad prematura en personas con enfermedades cardiopulmonares y ancianos.";
		document.form1.Cautionary.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños deben limitar el esfuerzo prolongado.";
	}
	else if (document.form1.pollutant.selectedIndex == '2')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades respiratorias son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Aumento de la probabilidad de síntomas respiratorios y agravamiento de la enfermedad pulmonar, como el asma.";
		document.form1.Cautionary.value="Las personas con enfermedades respiratorias, como el asma, deben limitar el esfuerzo al aire libre.";
	}
	else if (document.form1.pollutant.selectedIndex == '3')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades cardíacas son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Aumento de la probabilidad de reducir la tolerancia al ejercicio debido al aumento de los síntomas cardiovasculares, como el dolor de pecho, en personas con enfermedades cardiovasculares.";
		document.form1.Cautionary.value="Las personas con enfermedades cardiovasculares, como la angina de pecho, deben limitar el esfuerzo intenso y evitar las fuentes de CO, como el tráfico intenso.";
	}
	else if (document.form1.pollutant.selectedIndex == '4' || form1.pollutant.selectedIndex == '5')
	{
		document.form1.TextSensitive.value="Las personas con asma son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Aumento de la probabilidad de presentar síntomas respiratorios, como opresión en el pecho y molestias respiratorias, en personas con asma.";
		document.form1.Cautionary.value="Las personas con asma deben considerar limitar el esfuerzo al aire libre.";
	}
	else if (document.form1.pollutant.selectedIndex == '6' || form1.pollutant.selectedIndex == '7')
	{
		document.form1.HealthEffects.value="Aumento de la probabilidad de síntomas respiratorios y molestias respiratorias en niños y adultos activos y personas con enfermedades respiratorias, como el asma.";
		document.form1.TextSensitive.value="Los niños y las personas con asma son los grupos de mayor riesgo.";
		if (document.form1.pollutant.selectedIndex == '6')
		{
			document.form1.Cautionary.value="Los niños y adultos activos, y las personas con enfermedades respiratorias, como el asma, deben limitar el esfuerzo prolongado al aire libre.";
		}
		else if (document.form1.pollutant.selectedIndex == '7')
		{
			document.form1.Cautionary.value="Los niños y adultos activos, y las personas con enfermedades respiratorias, como el asma, deben limitar el esfuerzo intenso al aire libre.";
		}
	}
	else if (document.form1.pollutant.selectedIndex == '8')
	{
		document.form1.TextSensitive.value="Las personas con asma u otras enfermedades respiratorias, los ancianos y los niños son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Aumento de la probabilidad de presentar síntomas respiratorios y molestias respiratorias en niños activos, ancianos y personas con enfermedades pulmonares, como el asma.";
		document.form1.Cautionary.value="Los niños activos, los ancianos y las personas con enfermedades pulmonares, como el asma, deben reducir el esfuerzo prolongado o intenso al aire libre.";
	}
}
else if (document.form1.outputbox2.value == 'Unhealthy')
{
	document.form1.outputbox2.style.backgroundColor="#ff0000";
	document.form1.outputbox2.style.color="black";
	if (document.form1.pollutant.selectedIndex == '1')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Increased aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; increased respiratory effects in general population.";
		document.form1.Cautionary.value="People with respiratory or heart disease, the elderly and children should avoid prolonged exertion; everyone else should limit prolonged exertion.";
	}
	else if (document.form1.pollutant.selectedIndex == '2')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades respiratorias son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Increased respiratory symptoms and aggravation of lung disease, such as asthma; possible respiratory effects in general population.";
		document.form1.Cautionary.value="People with respiratory or heart disease, the elderly and children should avoid prolonged exertion; everyone else should limit prolonged exertion.";
	}
	else if (document.form1.pollutant.selectedIndex == '3')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades cardíacas son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Reducción de la tolerancia al ejercicio debido al aumento de los síntomas cardiovasculares, como el dolor de pecho, en personas con enfermedades cardiovasculares.";
		document.form1.Cautionary.value="Las personas con enfermedades cardiovasculares, como la angina de pecho, deben limitar el esfuerzo moderado y evitar las fuentes de CO, como el tráfico pesado.";
	}
	else if (document.form1.pollutant.selectedIndex == '4'  || form1.pollutant.selectedIndex == '5')
	{
		document.form1.TextSensitive.value="Las personas con asma son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Increased respiratory symptoms, such as chest tightness and wheezing in people with asthma; possible aggravation of heart or lung disease.";
		document.form1.Cautionary.value="Los niños, los asmáticos y las personas con enfermedades cardíacas o pulmonares deben limitar el esfuerzo al aire libre.";
	}
	else if (document.form1.pollutant.selectedIndex == '6' || form1.pollutant.selectedIndex == '7')
	{
		document.form1.TextSensitive.value="Los niños y las personas con asma son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Greater likelihood of respiratory symptoms and breathing difficulty in active children and adults and people with respiratory disease, such as asthma; possible respiratory effects in general population.";
		if (document.form1.pollutant.selectedIndex == '6')
		{		
			document.form1.Cautionary.value="Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion.";
		}
		else if (document.form1.pollutant.selectedIndex == '7')
		{
			document.form1.Cautionary.value="Active children and adults, and people with respiratory disease, such as asthma, should avoid heavy outdoor exertion; everyone else, especially children, should limit heavy outdoor exertion.";
		}	
	}
	else if (document.form1.pollutant.selectedIndex == '8')
	{
		document.form1.TextSensitive.value="Las personas con asma u otras enfermedades respiratorias, los ancianos y los niños son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Greater likelihood of respiratory symptoms in active children, the elderly, and people with lung disease, such as asthma; possible respiratory effects in general population.";
		document.form1.Cautionary.value="Active children, the elderly, and people with lung disease, such as asthma, should avoid prolonged or heavy outdoor exertion; everyone else, expecially children, should reduce prolonged or heavy outdoor exertion.";
	}
}
else if (document.form1.outputbox2.value == 'Muy insalubre')
{
	document.form1.outputbox2.style.backgroundColor="#8F3F97";
	document.form1.outputbox2.style.color="#ffffff";
	if (document.form1.pollutant.selectedIndex == '1')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Significant aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; significant increase in respiratory effects in general population.";
		document.form1.Cautionary.value="People with respiratory or heart disease, the elderly and children should avoid any outdoor activity; everyone else should avoid prolonged exertion.";
	}
	else if (document.form1.pollutant.selectedIndex == '2')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades respiratorias son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Significant increase in respiratory symptoms and aggravation of lung disease, such as asthma; increasing likelihood of respiratory effects in general population.";
		document.form1.Cautionary.value="People with respiratory disease, such as asthma, should avoid any outdoor activity; everyone else, especially the elderly and children, should limit outdoor exertion.";
	}
	else if (document.form1.pollutant.selectedIndex == '3')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades cardíacas son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Agravamiento significativo de los síntomas cardiovasculares, como el dolor de pecho, en personas con enfermedad cardiovascular.";
		document.form1.Cautionary.value="Las personas con enfermedades cardiovasculares, como la angina de pecho, deben evitar el esfuerzo y las fuentes de CO, como el tráfico pesado.";
	}
	else if (document.form1.pollutant.selectedIndex == '4' || form1.pollutant.selectedIndex == '5')
	{
		document.form1.TextSensitive.value="Las personas con asma son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Significant increase in respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; aggravation of heart or lung disease.";
		document.form1.Cautionary.value="Children, asthmatics, and people with heart or lung disease should avoid outdoor exertion; everyone else should limit outdoor exertion.";
	}
	else if (document.form1.pollutant.selectedIndex == '6' || document.form1.pollutant.selectedIndex == '7')
	{
		document.form1.TextSensitive.value="Los niños y las personas con asma son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Increasingly severe symptoms and impaired breathing likely in active children and adults and people with respiratory disease, such as asthma; increasing likelihood of respiratory effects in general population.";	
		document.form1.Cautionary.value="Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.";
	}
	else if (document.form1.pollutant.selectedIndex == '8')
	{
		document.form1.TextSensitive.value="Las personas con asma u otras enfermedades respiratorias, los ancianos y los niños son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Increasingly severe symptoms and impaired breathing likely in active children, the elderly, and people with lung disease, such as asthma; increasing likelihood of respiratory effects in general population.";
		document.form1.Cautionary.value="Active children, the elderly, and people with lung disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should avoid prolonged or heavy outdoor exertion.";
	}
}
else if (document.form1.outputbox2.value == 'Hazardous')
{
	document.form1.outputbox2.style.backgroundColor="#7E0023";
	document.form1.outputbox2.style.color="#ffffff";
	if (document.form1.pollutant.selectedIndex == '1')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Serious aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; serious risk of respiratory effects in general population.";
		document.form1.Cautionary.value="Everyone should avoid any outdoor exertion; people with respiratory or heart disease, the elderly and children should remain indoors.";
	}
	else if (document.form1.pollutant.selectedIndex == '2')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades respiratorias son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Serious risk of respiratory symptoms and aggravation of lung disease, such as asthma; respiratory effects likely in general population.";
		document.form1.Cautionary.value="Everyone should avoid any outdoor exertion; people with respiratory disease, such as asthma, should remain indoors.";
	}
	else if (document.form1.pollutant.selectedIndex == '3')
	{
		document.form1.TextSensitive.value="Las personas con enfermedades cardíacas son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Serious aggravation of cardiovascular symptoms, such as chest pain, in people with cardiovascular disease; impairment of strenuous activities in general population.";
		document.form1.Cautionary.value="People with cardiovascular disease, such as angina, should avoid exertion and sources of CO, such as heavy traffic; everyone else should limit heavy exertion.";
	}
	else if (document.form1.pollutant.selectedIndex == '4' || form1.pollutant.selectedIndex == '5')
	{
		document.form1.TextSensitive.value="Las personas con asma son el grupo de mayor riesgo.";
		document.form1.HealthEffects.value="Severe respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; increased aggravation of heart or lung disease; possible respiratory effects in general population.";
		document.form1.Cautionary.value="Children, asthmatics, and people with heart or lung disease should remain indoors; everyone else should avoid outdoor exertion.";
	}
	else if (document.form1.pollutant.selectedIndex == '6' || document.form1.pollutant.selectedIndex == '7')
	{
		document.form1.TextSensitive.value="Los niños y las personas con asma son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Severe respiratory effects and impaired breathing likely in active children and adults and people with respiratory disease, such as asthma; increasingly severe respiratory effects likely in general population.";	
		document.form1.Cautionary.value="Todos deben evitar cualquier esfuerzo al aire libre.";
	}
	else if (document.form1.pollutant.selectedIndex == '8')
	{
		document.form1.TextSensitive.value="Las personas con asma u otras enfermedades respiratorias, los ancianos y los niños son los grupos de mayor riesgo.";
		document.form1.HealthEffects.value="Severe respiratory effects and impaired breathing likely in active children, the elderly, and people with lung disease, such as asthma; increasingly severe respiratory effects likely in general population.";
		document.form1.Cautionary.value="Children, the elderly, and people with lung disease, such as asthma, should remain indoors; everyone else, especially children, should avoid outdoor exertion.";
	}
}
else
{
	document.form1.outputbox2.style.backgroundColor="#ffffff";
	document.form1.outputbox2.style.color="black";
	document.form1.TextSensitive.value="";
	document.form1.HealthEffects.value="";
	document.form1.Cautionary.value="";
}

return true;
}
