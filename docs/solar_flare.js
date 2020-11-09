const H_fusion = 330000; //j / kg
const calor_especifico_hielo = 2090; // j / kg*K
const const_bolztman = 5.67 * Math.pow(10,-8); // W / m2*K4
const radio_sol = 6.96 * Math.pow(10,8);//m
const d_tierra_sol = 149597870700; //m
//ALTURA DEL SOL EN RADIANES
function luminosidad_solar(calor,tiempo){ //calor en joules y tiempo en segundos
    return calor/tiempo;
}
function calorimetria(masa,tiempo){//masa en kg y tiempo en segundos
    return ((masa * calor_especifico_hielo * tiempo) + masa * H_fusion);
}
function q_corregida(calor,altura_sol){//calor en joules y altura_sol en radianes
    return (calor/(0.6*Math.sin(altura_sol)));

}
function temperatura_superficial_sol(luminosidad_solar,area){
    resultado_parcial = (luminosidad_solar*d_tierra_sol)/(area*const_bolztman*radio_sol);
    return Math.pow(resultado_parcial,1/4);
}