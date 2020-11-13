const H_fusion = 330000; //j / kg
const calor_especifico_hielo = 2090; // j / kg*K
const const_bolztman = 5.67 * Math.pow(10,-8); // W / m2*K4
const radio_sol = 6.96 * Math.pow(10,8);//m
const d_tierra_sol = 149597870700; //m
const temperatura_wikipedia = 5778;
const luminosidad_wikipedia =  3.827 * Math.pow(10,26); 
//ALTURA DEL SOL EN RADIANES
function q_partido_t(calor,tiempo){ //calor en joules y tiempo en segundos
    return calor/tiempo;
}
function calor(masa,delta_T){//masa en kg y delta_T en kelvin
    return ((masa * calor_especifico_hielo * delta_T) + masa * H_fusion);
}
function q_corregida(calor,altura_sol){//calor en joules y altura_sol en radianes
    return (calor/(0.6*Math.sin(altura_sol)));

}
function temperatura_superficial_sol(luminosidad_solar,area){
    resultado_parcial = (luminosidad_solar*Math.pow(d_tierra_sol,2))/(area*const_bolztman*Math.pow(radio_sol,2));
    return Math.pow(resultado_parcial,1/4);
}
function luminosidad_solar(temperatura){
    return Math.pow(temperatura,4)*Math.PI*4*const_bolztman*Math.pow(radio_sol,2);
}
function ecuacion(masa,tiempo,area,altura,delta_T){
    heat = q_corregida(calor(masa,delta_T),altura);
    cociente = q_partido_t(heat,tiempo);
    temperatura = temperatura_superficial_sol(cociente,area);
    luminosidad = luminosidad_solar(temperatura);
    return {'luminosidad':luminosidad,'temperatura':temperatura};
}




const masa_field = document.getElementById("masa"); //en g
const tiempo_field = document.getElementById("tiempo"); //en s
const area_field = document.getElementById("area"); //en cm^2
const delta_T_field = document.getElementById("delta_T"); //en K
const altura_field = document.getElementById("altura"); //en grados
const resultados_temperatura = document.getElementById("resultados_temperatura");
const resultados_luminosidad = document.getElementById("resultados_luminosidad");
const porcentaje_temperatura = document.getElementById("porcentaje_temperatura");
const porcentaje_luminosidad = document.getElementById("porcentaje_luminosidad");
function recalcular(){
    let masa = masa_field.value / 1000;
    let tiempo = tiempo_field.value;
    let area = area_field.value / Math.pow(100,2);
    let delta_T = Math.abs(delta_T_field.value);
    let altura = altura_field.value * (Math.PI/180);
    let resultados = ecuacion(masa,tiempo,area,altura,delta_T);
    console.log(resultados);
    console.log([masa,area,altura,delta_T,tiempo])
    resultados_temperatura.innerText = "Temperatura del sol: " + String(resultados['temperatura'].toFixed(2)) + " K";
    resultados_luminosidad.innerText = "Luminosidad del sol: " + String(resultados['luminosidad'].toExponential(2)) + " W";
    porcentaje_temperatura.innerText = "Porcentaje de error en temperatura: " + String(Math.abs((resultados['temperatura'] * (100/temperatura_wikipedia))-100).toFixed(2))+ "%";
    porcentaje_luminosidad.innerText = "Porcentaje de error en luminosidad: " + String(Math.abs((resultados['luminosidad'] * (100/luminosidad_wikipedia))-100).toFixed(2))+ "%";


}
recalcular()
console.log(ecuacion(0.025,2569,0.004657,1.2784537,19));
///2569s, 0.025kg, 0.004657 m^2,  1.2784537 rad