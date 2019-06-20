const request = require('request');
const appConfig = require('../config');

const forecast = (long,lat,callback)=>{

    const url  = `https://api.darksky.net/forecast/${appConfig.darkSkyToken}/${lat},${long}`;

    request({url,json:true},(error,{body})=>{

       if(error){
      
        callback('unable to process request');

       }else if(!body.currently){

        callback(body);

       }else{
        
        const forecast = body.currently.summary;
        const temperature = fahrenheitToCelcius(body.currently.temperature);
        callback(error,{forecast,temperature});
       }

    });}

    const fahrenheitToCelcius = (f)=>Math.round((f-32)*(5/9));

    module.exports = forecast;