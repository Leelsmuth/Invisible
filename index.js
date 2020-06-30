const request = require("request");
const dotenv = require("dotenv").config();

const address = process.argv[2];

const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=${process.env.API_KEY}`;

const getTimeFromTimezoneOffset = (offset) => {

  // create Date object for current location
  const localDate = new Date();
  const localTime = localDate.getTime();

  const localOffset = localDate.getTimezoneOffset() * 60000;

  const utcTime = localTime + localOffset;

  const adjustedTime = utcTime + offset * 1000;
  return new Date(adjustedTime).toLocaleTimeString("en-US");
};


if (!address) {
  return console.log("Please enter the name of the city");
}

request(url, (error, response, body) => {
  try {
    const data = JSON.parse(body);
    const time = getTimeFromTimezoneOffset(data.timezone);
    const temp = data.main.temp;
    console.log(`It's currently ${temp}°C in ${data.name} and the time is ${time}`);
  }
  catch (error) {
    console.log(error);
  }
});