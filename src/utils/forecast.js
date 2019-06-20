const request = require('request');
const appConfig = require('../config');

const forecast = (long,lat,callback)=>{

    const url  = `https://api.darksky.net/forecast/${appConfig.darkSkyToken}/${long},${lat}`;

    request({url,json:true},(error,{body})=>{

       if(error){
      
        callback('unable to process request');

       }else if(!body.currently){

        callback(body);

       }else{

        callback(error,body.currently.summary);
       }

    });}

    module.exports = forecast;