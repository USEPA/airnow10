/* Updated for AIR-680 cw 2024-01-11 */
function Linear(AQIhigh, AQIlow, Conchigh, Conclow, Concentration)

{

var linear;

var Conc=parseFloat(Concentration);

var a;

a=((Conc-Conclow)/(Conchigh-Conclow))*(AQIhigh-AQIlow)+AQIlow;

linear=Math.round(a);

return linear;

}


// AIR-704 PM25 AQI Breakpoint Revisions cw 2024-07-09
function AQIPM25(Concentration)
{
var Conc=parseFloat(Concentration);
var c;
var AQI;
c=(Math.floor(10*Conc))/10;
if (c>=0.0 && c<=9.0)
{
    AQI=Linear(50,0,9.0,0.0,c);
}
else if (c>=9.1 && c<=35.4)
{
    AQI=Linear(100,51,35.4,9.1,c);
}
else if (c>=35.5 && c<=55.4)
{
    AQI=Linear(150,101,55.4,35.5,c);
}
else if (c>=55.5 && c<=125.4)
{
    AQI=Linear(200,151,125.4,55.5,c);
}
else if (c>=125.5 && c<=225.4)
{
    AQI=Linear(300,201,225.4,125.5,c);
}
else if (c>=225.5)
{
    AQI=Linear(500,301,325.4,225.5,c);
    // Values above 500 should continue using the same SLOPE as the Hazardous category cw 2024-09-07
    // From the TAD page 14: The AQI value of 500 are as follows: ... PM2.5 24-hour—325.4 μg/m3 ... cw 2024-07-15
}
else
{
    AQI="Fuera de alcance";
}
return AQI;
}


function AQIPM10(Concentration)

{

var Conc=parseFloat(Concentration);

var c;

var AQI;

c=Math.floor(Conc);

if (c>=0 && c<55)

{

    AQI=Linear(50,0,54,0,c);

}

else if (c>=55 && c<155)

{

    AQI=Linear(100,51,154,55,c);

}

else if (c>=155 && c<255)

{

    AQI=Linear(150,101,254,155,c);

}

else if (c>=255 && c<355)

{

    AQI=Linear(200,151,354,255,c);

}

else if (c>=355 && c<425)

{

    AQI=Linear(300,201,424,355,c);

}

else if (c>=425 && c<=604)

{

    // Values above 500 should continue using the same SLOPE as the Hazardous category cw 2024-07-09
    // From the TAD page 14: The AQI value of 500 are as follows: ... PM10 24-hour=604 μg/m3 ... cw 2024-07-15

    AQI=Linear(500,301,604,425,c);

}

else

{

    AQI="Fuera de alcance";

}

return AQI;

}

//line104

function AQICO(Concentration)

{

var Conc=parseFloat(Concentration);

var c;

var AQI;

c=(Math.floor(10*Conc))/10;

if (c>=0 && c<4.5)

{

    AQI=Linear(50,0,4.4,0,c);

}

else if (c>=4.5 && c<9.5)

{

    AQI=Linear(100,51,9.4,4.5,c);

}

else if (c>=9.5 && c<12.5)

{

    AQI=Linear(150,101,12.4,9.5,c);

}

else if (c>=12.5 && c<15.5)

{

    AQI=Linear(200,151,15.4,12.5,c);

}

else if (c>=15.5 && c<30.5)

{

    AQI=Linear(300,201,30.4,15.5,c);

}

else if (c>=30.5)

{
	// Values above 500 should continue using the same SLOPE as the Hazardous category cw 2024-07-09
    AQI=Linear(500,301,50.4,30.5,c);
}	

else

{

    AQI="Fuera de alcance";

}

return AQI;

}

//line145

function AQISO21hr(Concentration)

{

var Conc=parseFloat(Concentration);

var c;

var AQI;

c=Math.floor(Conc);

if (c>=0 && c<36)

{

    AQI=Linear(50,0,35,0,c);

}

else if (c>=36 && c<76)

{

    AQI=Linear(100,51,75,36,c);

}

else if (c>=76 && c<186)

{

    AQI=Linear(150,101,185,76,c);

}

else if (c>=186 && c<=304)

{

    AQI=Linear(200,151,304,186,c);

}

else if (c>=304 && c<=604)

{

    AQI="SO21hrmessage";

}

else

{

    AQI="Fuera de alcance";

}

return AQI;

}

function AQISO224hr(Concentration)

{

var Conc=parseFloat(Concentration);

var c;

var AQI;

c=Math.floor(Conc);

if (c>=0 && c<=304)

{

    AQI="SO224hrmessage";

}

 

else if (c>=304 && c<605)

{

    AQI=Linear(300,201,604,305,c);

}

else if (c>=605 && c<805)

{

    AQI=Linear(400,301,804,605,c);

}

else if (c>=805 && c<=1004)

{  

    AQI=Linear(500,401,1004,805,c);

}

else

{

    AQI="Fuera de alcance";

}

return AQI;

}

//line186

function AQIOzone8hr(Concentration)
{
var Conc=parseFloat(Concentration);
var c;
var AQI;
c=(Math.floor(Conc))/1000;

if (c>=0 && c<.055)
{
	AQI=Linear(50,0,0.054,0,c);
}
else if (c>=.055 && c<.071)
{
	AQI=Linear(100,51,.070,.055,c);
}
else if (c>=.071 && c<.086)
{
	AQI=Linear(150,101,.085,.071,c);
}
else if (c>=.086 && c<.106)
{
AQI=Linear(200,151,.105,.086,c);
}
else if (c>=.106 && c<.201)
{
	AQI=Linear(300,201,.200,.106,c);
}
else if (c>=.201 && c<.605)
{
	AQI="O3message";
}
else
{
	AQI="Fuera de alcance";
}
return AQI;
}
//line219
 

function AQIOzone1hr(Concentration)

{

var Conc=parseFloat(Concentration);

var c;

var AQI;

c=(Math.floor(Conc))/1000;

    if (c>=0 && c<=.124)

{

    AQI="O31hrmessage";

}

 
else if (c>=.125 && c<.165)

{

    AQI=Linear(150,101,.164,.125,c);

}

else if (c>=.165 && c<.205)

{

    AQI=Linear(200,151,.204,.165,c);

}

else if (c>=.205 && c<.405)

{

    AQI=Linear(300,201,.404,.205,c);

}

else if (c>=.405)

{

    // Values above 500 should continue using the same SLOPE as the Hazardous category cw 2024-07-09
    AQI=Linear(500,301,.604,.405,c);

}

else

{

    AQI="Fuera de alcance";

}

return AQI;

}

 

function AQINO2(Concentration)

{

var Conc=parseFloat(Concentration);

var c;

var AQI;

c=(Math.floor(Conc))/1000;

if (c>=0 && c<.054)

{

    AQI=Linear(50,0,.053,0,c);

}

else if (c>=.054 && c<.101)

{

    AQI=Linear(100,51,.100,.054,c);

}

else if (c>=.101 && c<.361)

{

    AQI=Linear(150,101,.360,.101,c);

}

else if (c>=.361 && c<.650)

{

    AQI=Linear(200,151,.649,.361,c);

}

else if (c>=.650 && c<1.250)

{

    AQI=Linear(300,201,1.249,.650,c);

}

else if (c>=1.250)

{

    // Values above 500 should continue using the same SLOPE as the Hazardous category cw 2024-07-09
    AQI=Linear(500,301,2.049,1.250,c);

}

else

{

    AQI="Fuera de alcance";

}

return AQI;

}

 

function AQICategory(AQIndex)

{

var AQI=parseFloat(AQIndex)

var AQICategory;

if (AQI<51)

{

    AQICategory="Good";

}

else if (AQI>=51 && AQI<101)

{

    AQICategory="Moderate";

}

else if (AQI>=101 && AQI<151)

{

    AQICategory="Unhealthy for Sensitive Groups";

}

else if (AQI>=151 && AQI<201)

{

    AQICategory="Unhealthy";

}

else if (AQI>=201 && AQI<301)

{

    AQICategory="Very Unhealthy";

}

else if (AQI>=301 && AQI<401)

{

    AQICategory="Hazardous";

}

else if (AQI>=401 && AQI<501)

{

    AQICategory="Hazardous";

}
else if (AQI=501 + Infinity) // added AQI value to infinity for Hazardous jb 08/01/2025
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

 

function ClearColorC()

{

 

    document.form2.outputbox3.style.backgroundColor="white";

   

}

 

function UnitDetermin(form2)

{

//var form2

 

document.form2.txtunit.style.textAlign="center";

document.form2.outputbox3.style.backgroundColor="white";

 

document.form2.inputbox.value="";

document.form2.outputbox1.value="";

document.form2.outputbox3.value="";

document.form2.TextSensitive.value="";

document.form2.HealthEffects.value="";

document.form2.Cautionary.value="";

 

if (document.form2.pollutant.selectedIndex == '1' || document.form2.pollutant.selectedIndex == '2')

{

    document.form2.txtunit.value="ug/m3";  

}

else if (document.form2.pollutant.selectedIndex == '3')

{

    document.form2.txtunit.value="ppm";

}

else if (document.form2.pollutant.selectedIndex == '4' || document.form2.pollutant.selectedIndex == '5' || document.form2.pollutant.selectedIndex == '6' || form2.pollutant.selectedIndex == '7' || form2.pollutant.selectedIndex == '8')

{

    document.form2.txtunit.value="ppb";

}

return true;

}

 

function CalcAQI(form2)

{

var b;

 

document.form2.inputbox.style.textAlign="center";

document.form2.inputbox.style.backgroundColor="white";

 

var f;

f=document.form2.inputbox.value

f=f.replace(/\,/,'');

 

if (document.form2.pollutant.selectedIndex == '0')

{

    alert("No seleccionó un contaminante.");    

}

if (document.form2.pollutant.selectedIndex == '1')

{

    b=AQIPM25(f);  

}

else if (document.form2.pollutant.selectedIndex == '2')

{

    b=AQIPM10(f);  

}

else if (document.form2.pollutant.selectedIndex == '3')

{

    b=AQICO(f);

}

else if (document.form2.pollutant.selectedIndex == '4')

{

    b=AQISO21hr(f);

}

else if (document.form2.pollutant.selectedIndex == '5')

{

    b=AQISO224hr(f);    

}

else if (document.form2.pollutant.selectedIndex == '6')

{

    b=AQIOzone8hr(f);  

}

else if (document.form2.pollutant.selectedIndex == '7')

{

    b=AQIOzone1hr(f);  

}

else if (document.form2.pollutant.selectedIndex == '8')

{

    b=AQINO2(f);    

}

if (b == "Fuera de alcance")

{

   
    document.form2.inputbox.value=" ";

    document.form2.outputbox3.value=" ";

    document.form2.TextSensitive.value="";

    document.form2.HealthEffects.value="";

    document.form2.Cautionary.value="";

}

 

else if (b == "SO21hrmessage")

{
     

    document.form2.inputbox.value=" ";

    document.form2.outputbox1.value="AQI values of 201 or greater are calculated with 24-hour SO2 concentrations.";

    document.form2.outputbox3.value=" ";

    document.form2.TextSensitive.value="";

    document.form2.HealthEffects.value="";

    document.form2.Cautionary.value="";

}
else if (b == "SO224hrmessage")

{


    document.form2.inputbox.value="";

    document.form2.outputbox1.value="AQI values less than 201 are calculated with 1-hour SO2 concentrations.";

    document.form2.outputbox3.value="";

    document.form2.TextSensitive.value="";

    document.form2.HealthEffects.value="";

    document.form2.Cautionary.value="";

}

else if (b == "O3message")

{
 

    document.form2.inputbox.value=" ";

    document.form2.outputbox1.value="AQI values of 301 or greater are calculated with 1-hour ozone concentrations.";

    document.form2.outputbox3.value=" ";

    document.form2.TextSensitive.value="";

    document.form2.HealthEffects.value="";

    document.form2.Cautionary.value="";

}



else if (b == "O31hrmessage")
{
	  
		document.form2.inputbox.value="";
		document.form2.outputbox1.value="AQI values of 100 or lower are calculated with 8-hour ozone concentrations.";
		document.form2.outputbox3.value="";
		document.form2.TextSensitive.value="";
		document.form2.HealthEffects.value="";
		document.form2.Cautionary.value="";
}


else

{

    document.form2.outputbox1.value=b;

    document.form2.outputbox3.value=AQICategory(b);

}

document.form2.outputbox1.style.textAlign="center";

document.form2.outputbox3.style.textAlign="center";

document.form2.TextSensitive.style.textAlign="center";

document.form2.HealthEffects.style.textAlign="center";

document.form2.Cautionary.style.textAlign="center";

 

if (document.form2.outputbox3.value == 'Good')

{

    document.form2.outputbox3.style.backgroundColor="#00e000";

    document.form2.outputbox3.style.color="black";

    document.form2.HealthEffects.value="None";

    document.form2.Cautionary.value="None";

    if (document.form2.pollutant.selectedIndex == '1')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";

    }

    else if (document.form2.pollutant.selectedIndex == '2')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades respiratorias son el grupo de mayor riesgo.";

    }

    else if (document.form2.pollutant.selectedIndex == '3')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades cardíacas son el grupo de mayor riesgo.";

    }

    else if (document.form2.pollutant.selectedIndex == '4' || form2.pollutant.selectedIndex == '5')

    {

        document.form2.TextSensitive.value="Las personas con asma son el grupo de mayor riesgo.";

    }

    else if (document.form2.pollutant.selectedIndex == '6' || form2.pollutant.selectedIndex == '7')

    {

        document.form2.TextSensitive.value="Los niños y las personas con asma son los grupos de mayor riesgo.";

    }

    else if (document.form2.pollutant.selectedIndex == '8')

    {

        document.form2.TextSensitive.value="Las personas con asma u otras enfermedades respiratorias, los ancianos y los niños son los grupos de mayor riesgo.";

    }

}

else if (document.form2.outputbox3.value == 'Moderate')

{

    document.form2.outputbox3.style.backgroundColor="#ffff00";

    document.form2.outputbox3.style.color="black";

    if (document.form2.pollutant.selectedIndex == '1')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Las personas inusualmente sensibles deben considerar reducir el esfuerzo prolongado o intenso.";

        document.form2.Cautionary.value="Las personas inusualmente sensibles deben considerar reducir el esfuerzo prolongado o intenso.";

    }

    else if (document.form2.pollutant.selectedIndex == '2')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades respiratorias son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Las personas inusualmente sensibles deben considerar reducir el esfuerzo prolongado o intenso.";

        document.form2.Cautionary.value="Las personas inusualmente sensibles deben considerar reducir el esfuerzo prolongado o intenso.";

    }

    else if (document.form2.pollutant.selectedIndex == '3')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades cardíacas son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="None";

        document.form2.Cautionary.value="None";

    }

    else if (document.form2.pollutant.selectedIndex == '4' || form2.pollutant.selectedIndex == '5')

    {

        document.form2.TextSensitive.value="Las personas con asma son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="None";

        document.form2.Cautionary.value="None";

    }

    else if (document.form2.pollutant.selectedIndex == '6' || form2.pollutant.selectedIndex == '7')

    {

        document.form2.TextSensitive.value="Los niños y las personas con asma son los grupos de mayor riesgo.";

        if (document.form2.pollutant.selectedIndex == '6')

        {

            document.form2.HealthEffects.value="Las personas inusualmente sensibles pueden experimentar síntomas respiratorios.";

            document.form2.Cautionary.value="Las personas inusualmente sensibles deben considerar limitar el esfuerzo prolongado al aire libre.";

        }

    }

    else if (document.form2.pollutant.selectedIndex == '8')

    {

        document.form2.TextSensitive.value="Las personas con asma u otras enfermedades respiratorias, los ancianos y los niños son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Las personas inusualmente sensibles pueden experimentar síntomas respiratorios.";

        document.form2.Cautionary.value="Las personas inusualmente sensibles deben considerar reducir el esfuerzo prolongado o intenso al aire libre.";

    }

}

else if (document.form2.outputbox3.value == 'Insalubre para grupos sensibles')

{

    document.form2.outputbox3.style.backgroundColor="#ff7600";

    document.form2.outputbox3.style.color="black";

    if (document.form2.pollutant.selectedIndex == '1')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Aumento de la probabilidad de síntomas respiratorios en personas sensibles, agravamiento de enfermedades cardíacas o pulmonares y mortalidad prematura en personas con enfermedades cardiopulmonares y ancianos.";

        document.form2.Cautionary.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños deben limitar el esfuerzo prolongado.";

    }

    else if (document.form2.pollutant.selectedIndex == '2')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades respiratorias son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Aumento de la probabilidad de síntomas respiratorios y agravamiento de enfermedades pulmonares, como el asma";

        document.form2.Cautionary.value="Las personas con enfermedades respiratorias, como el asma, deben limitar el esfuerzo al aire libre.";

    }

    else if (document.form2.pollutant.selectedIndex == '3')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades cardíacas son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Aumento de la probabilidad de reducir la tolerancia al ejercicio debido al aumento de los síntomas cardiovasculares, como el dolor de pecho, en personas con enfermedades cardiovasculares.";

        document.form2.Cautionary.value="Las personas con enfermedades cardiovasculares, como la angina de pecho, deben limitar el esfuerzo intenso y evitar las fuentes de CO, como el tráfico intenso.";

    }

    else if (document.form2.pollutant.selectedIndex == '4' || form2.pollutant.selectedIndex == '5')

    {

        document.form2.TextSensitive.value="Las personas con asma son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Aumento de la probabilidad de presentar síntomas respiratorios, como opresión en el pecho y molestias respiratorias, en personas con asma.";

        document.form2.Cautionary.value="Las personas con asma deben considerar limitar el esfuerzo al aire libre.";

    }

    else if (document.form2.pollutant.selectedIndex == '6' || form2.pollutant.selectedIndex == '7')

    {

        document.form2.HealthEffects.value="Aumento de la probabilidad de síntomas respiratorios y molestias respiratorias en niños y adultos activos y personas con enfermedades respiratorias, como el asma.";

        document.form2.TextSensitive.value="Los niños y las personas con asma son los grupos de mayor riesgo.";

        if (document.form2.pollutant.selectedIndex == '6')

        {

            document.form2.Cautionary.value="Los niños y adultos activos, y las personas con enfermedades respiratorias, como el asma, deben limitar el esfuerzo prolongado al aire libre.";

        }

        else if (document.form2.pollutant.selectedIndex == '7')

        {

            document.form2.Cautionary.value="Los niños y adultos activos, y las personas con enfermedades respiratorias, como el asma, deben limitar el esfuerzo intenso al aire libre.";

        }

    }

    else if (document.form2.pollutant.selectedIndex == '8')

    {

        document.form2.TextSensitive.value="Las personas con asma u otras enfermedades respiratorias, los ancianos y los niños son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Aumento de la probabilidad de presentar síntomas respiratorios y molestias respiratorias en niños activos, ancianos y personas con enfermedades pulmonares, como el asma.";

        document.form2.Cautionary.value="Los niños activos, los ancianos y las personas con enfermedades pulmonares, como el asma, deben reducir el esfuerzo prolongado o intenso al aire libre.";

    }

}

else if (document.form2.outputbox3.value == 'Unhealthy')

{

    document.form2.outputbox3.style.backgroundColor="#ff0000";

    document.form2.outputbox3.style.color="black";

    if (document.form2.pollutant.selectedIndex == '1')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Increased aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; increased respiratory effects in general population.";

        document.form2.Cautionary.value="People with respiratory or heart disease, the elderly and children should avoid prolonged exertion; everyone else should limit prolonged exertion.";

    }

    else if (document.form2.pollutant.selectedIndex == '2')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades respiratorias son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Increased respiratory symptoms and aggravation of lung disease, such as asthma; possible respiratory effects in general population.";

        document.form2.Cautionary.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Increased aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; increased respiratory effects in general population.";

        document.form2.Cautionary.value="People with respiratory or heart disease, the elderly and children should avoid prolonged exertion; everyone else should limit prolonged exertion.";

    }

    else if (document.form2.pollutant.selectedIndex == '3')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades cardíacas son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Reducción de la tolerancia al ejercicio debido al aumento de los síntomas cardiovasculares, como el dolor de pecho, en personas con enfermedades cardiovasculares.";

        document.form2.Cautionary.value="Las personas con enfermedades cardiovasculares, como la angina de pecho, deben limitar el esfuerzo moderado y evitar las fuentes de CO, como el tráfico pesado.";

    }

    else if (document.form2.pollutant.selectedIndex == '4' || form2.pollutant.selectedIndex == '5')

    {

        document.form2.TextSensitive.value="Las personas con asma son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Increased respiratory symptoms, such as chest tightness and wheezing in people with asthma; possible aggravation of heart or lung disease.";

        document.form2.Cautionary.value="Los niños, los asmáticos y las personas con enfermedades cardíacas o pulmonares deben limitar el esfuerzo al aire libre.";

    }

    else if (document.form2.pollutant.selectedIndex == '6' || form2.pollutant.selectedIndex == '7')

    {

        document.form2.TextSensitive.value="Los niños y las personas con asma son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Greater likelihood of respiratory symptoms and breathing difficulty in active children and adults and people with respiratory disease, such as asthma; possible respiratory effects in general population.";

        if (document.form2.pollutant.selectedIndex == '6')

        {      

            document.form2.Cautionary.value="Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion.";

        }

        else if (document.form2.pollutant.selectedIndex == '7')

        {

            document.form2.Cautionary.value="Active children and adults, and people with respiratory disease, such as asthma, should avoid heavy outdoor exertion; everyone else, especially children, should limit heavy outdoor exertion.";

        }  

    }

    else if (document.form2.pollutant.selectedIndex == '8')

    {

        document.form2.TextSensitive.value="Las personas con asma u otras enfermedades respiratorias, los ancianos y los niños son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Greater likelihood of respiratory symptoms in active children, the elderly, and people with lung disease, such as asthma; possible respiratory effects in general population.";

        document.form2.Cautionary.value="Active children, the elderly, and people with lung disease, such as asthma, should avoid prolonged or heavy outdoor exertion; everyone else, expecially children, should reduce prolonged or heavy outdoor exertion.";

    }

}

else if (document.form2.outputbox3.value == 'Muy insalubre')

{

    document.form2.outputbox3.style.backgroundColor="#8F3F97";

    document.form2.outputbox3.style.color="#ffffff";

    if (document.form2.pollutant.selectedIndex == '1')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Significant aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; significant increase in respiratory effects in general population.";

        document.form2.Cautionary.value="People with respiratory or heart disease, the elderly and children should avoid any outdoor activity; everyone else should avoid prolonged exertion.";

    }

    else if (document.form2.pollutant.selectedIndex == '2')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades respiratorias son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Significant increase in respiratory symptoms and aggravation of lung disease, such as asthma; increasing likelihood of respiratory effects in general population.";

        document.form2.Cautionary.value="People with respiratory disease, such as asthma, should avoid any outdoor activity; everyone else, especially the elderly and children, should limit outdoor exertion.";

    }

    else if (document.form2.pollutant.selectedIndex == '3')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades cardíacas son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Agravamiento significativo de los síntomas cardiovasculares, como el dolor de pecho, en personas con enfermedad cardiovascular.";

        document.form2.Cautionary.value="Las personas con enfermedades cardiovasculares, como la angina de pecho, deben evitar el esfuerzo y las fuentes de CO, como el tráfico pesado.";

    }

    else if (document.form2.pollutant.selectedIndex == '4' || form2.pollutant.selectedIndex == '5')

    {

        document.form2.TextSensitive.value="Las personas con asma son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Significant increase in respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; aggravation of heart or lung disease.";

        document.form2.Cautionary.value="Children, asthmatics, and people with heart or lung disease should avoid outdoor exertion; everyone else should limit outdoor exertion.";

    }

    else if (document.form2.pollutant.selectedIndex == '6' || document.form2.pollutant.selectedIndex == '7')

    {

        document.form2.TextSensitive.value="Los niños y las personas con asma son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Increasingly severe symptoms and impaired breathing likely in active children and adults and people with respiratory disease, such as asthma; increasing likelihood of respiratory effects in general population.";

        document.form2.Cautionary.value="Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.";

    }

    else if (document.form2.pollutant.selectedIndex == '8')

    {

        document.form2.TextSensitive.value="Las personas con asma u otras enfermedades respiratorias, los ancianos y los niños son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Increasingly severe symptoms and impaired breathing likely in active children, the elderly, and people with lung disease, such as asthma; increasing likelihood of respiratory effects in general population.";

        document.form2.Cautionary.value="Active children, the elderly, and people with lung disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should avoid prolonged or heavy outdoor exertion.";

    }

}

else if (document.form2.outputbox3.value == 'Hazardous')

{

    document.form2.outputbox3.style.backgroundColor="#7E0023";

    document.form2.outputbox3.style.color="#ffffff";

    if (document.form2.pollutant.selectedIndex == '1')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades respiratorias o cardíacas, los ancianos y los niños son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Serious aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; serious risk of respiratory effects in general population.";

        document.form2.Cautionary.value="Everyone should avoid any outdoor exertion; people with respiratory or heart disease, the elderly and children should remain indoors.";

    }

    else if (document.form2.pollutant.selectedIndex == '2')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades respiratorias son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Serious risk of respiratory symptoms and aggravation of lung disease, such as asthma; respiratory effects likely in general population.";

        document.form2.Cautionary.value="Everyone should avoid any outdoor exertion; people with respiratory disease, such as asthma, should remain indoors.";

    }

    else if (document.form2.pollutant.selectedIndex == '3')

    {

        document.form2.TextSensitive.value="Las personas con enfermedades cardíacas son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Serious aggravation of cardiovascular symptoms, such as chest pain, in people with cardiovascular disease; impairment of strenuous activities in general population.";

        document.form2.Cautionary.value="People with cardiovascular disease, such as angina, should avoid exertion and sources of CO, such as heavy traffic; everyone else should limit heavy exertion.";

    }

    else if (document.form2.pollutant.selectedIndex == '4' || form2.pollutant.selectedIndex == '5')

    {

        document.form2.TextSensitive.value="Las personas con asma son el grupo de mayor riesgo.";

        document.form2.HealthEffects.value="Severe respiratory symptoms, such as wheezing and shortness of breath, in people with asthma; increased aggravation of heart or lung disease; possible respiratory effects in general population.";

        document.form2.Cautionary.value="Children, asthmatics, and people with heart or lung disease should remain indoors; everyone else should avoid outdoor exertion.";

    }

    else if (document.form2.pollutant.selectedIndex == '6' || document.form2.pollutant.selectedIndex == '7')

    {

        document.form2.TextSensitive.value="Los niños y las personas con asma son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Severe respiratory effects and impaired breathing likely in active children and adults and people with respiratory disease, such as asthma; increasingly severe respiratory effects likely in general population.";

        document.form2.Cautionary.value="Todos deben evitar cualquier esfuerzo al aire libre.";

    }

    else if (document.form2.pollutant.selectedIndex == '8')

    {

        document.form2.TextSensitive.value="Las personas con asma u otras enfermedades respiratorias, los ancianos y los niños son los grupos de mayor riesgo.";

        document.form2.HealthEffects.value="Severe respiratory effects and impaired breathing likely in active children, the elderly, and people with lung disease, such as asthma; increasingly severe respiratory effects likely in general population.";

        document.form2.Cautionary.value="Children, the elderly, and people with lung disease, such as asthma, should remain indoors; everyone else, especially children, should avoid outdoor exertion.";

    }

}

else

{

    document.form2.outputbox3.style.backgroundColor="#ffffff";

    document.form2.outputbox3.style.color="black";

    document.form2.TextSensitive.value="";

    document.form2.HealthEffects.value="";

    document.form2.Cautionary.value="";

}

 

return true;

}