const request = require("request");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZmxwcGV0a292c2tpIiwiYSI6ImNrNjlzemViODBhaXYzbW1na2w4bWsyZ3cifQ.stE0bAgQO6xKfmiOG4_SDg&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather Service");
    } else if (body.features.length === 0) {
      callback("Cannot access location", undefined);
    } else {
      const longitude = body.features[0].center[0];
      const latitude = body.features[0].center[1];
      callback(undefined, {
        latitude,
        longitude,
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
