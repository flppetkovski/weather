const request = require("request");

const forecast = (long, lat, callback) => {
  const url = `https://api.darksky.net/forecast/12a0d059a1dfd46a00b424f743698781/${long},${lat}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather Service!", undefined);
    } else if (body.error) {
      callback("Cannot find location!", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees. There is ${body.currently.precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
