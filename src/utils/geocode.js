const request = require('request');
const appConfig = require('../config');

const geocode = (address, callback) => {
   
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=${appConfig.mapBoxToken}&limit=1`;

    request({ url, json: true }, (error, {body}) => {

        if (error) {

            callback(error);

         } else if (!body.features) {

            callback(`no data found for ${address}`);

        } else if (!body.features[0]) {

            callback(`no data found for ${address}`);

        } else {

            const geocodeData = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            }

            callback(error, geocodeData);
        }

    });

};


module.exports = geocode;