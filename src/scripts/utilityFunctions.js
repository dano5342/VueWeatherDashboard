// Title Case For Titles

function convertToTitleCase(str) {
  str = str.toLowerCase().split(' ');
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}
// Formats possible weather for the day
function formatPossibility(str) {
  str = str.toLowerCase().split(' ');
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}
// Makes time readable
function unixToHuman(timezone, timestamp) {
  let moment = require('moment-timezone');
  let decipher = new Date(timestamp * 1000);
  let human = moment(decipher).tz(timezone).format('llll');
  let timeArray = human.split(' ');
  let timeNumeral = timeArray[4];
  let timeSuffix = timeArray[5];
  let justTime = timeNumeral + ' ' + timeSuffix;
  let monthDateArray = human.split(',');
  let monthDate = monthDateArray[1].trim();
  return {
    fullTime: human,
    onlyTime: justTime,
    onlyMonthDate: monthDate
  };
}
// Converts F to C
function fahrenheitToCelcius(tempInFahrenheit) {
  let tempInCelcius = Math.round((5 / 9) * (tempInFahrenheit - 32));
  return tempInCelcius;
}
function celciusToFarenheit(celcius) {
    let fahrenheit = celcius * 9/5 + 32;
    return fahrenheit;
}

// API sets temps in K
function kelvinToCelcius(tempInK) {
    let celcius = tempInK - 273.15;
    return celcius;
}


// API sets temps in K

function kelvinToFar(tempInK) {
    let fahrenheit = ((tempInK - 273.15) * 1.8) + 32;
    return fahrenheit;
}

// Converts Air Pressure
function milibarToKPascal(pressureInMilibar) {
  let pressureInKPA = pressureInMilibar * 0.1;
  return Math.round(pressureInKPA);
}

function mileToKilometer(miles) {
  let kilometer = miles * 1.60934;
  return Math.round(kilometer);
}

function deriveWindDirection(windDir) {
  let wind_directions_array = [{
      minVal: 0,
      maxVal: 30,
      direction: 'N'
    },
    {
      minVal: 31,
      maxVal: 45,
      direction: 'NNE'
    },
    {
      minVal: 46,
      maxVal: 75,
      direction: 'NE'
    },
    {
      minVal: 76,
      maxVal: 90,
      direction: 'ENE'
    },
    {
      minVal: 91,
      maxVal: 120,
      direction: 'E'
    },
    {
      minVal: 121,
      maxVal: 135,
      direction: 'ESE'
    },
    {
      minVal: 136,
      maxVal: 165,
      direction: 'SE'
    },
    {
      minVal: 166,
      maxVal: 180,
      direction: 'SSE'
    },
    {
      minVal: 181,
      maxVal: 210,
      direction: 'S'
    },
    {
      minVal: 211,
      maxVal: 225,
      direction: 'SSW'
    },
    {
      minVal: 226,
      maxVal: 255,
      direction: 'SW'
    },
    {
      minVal: 256,
      maxVal: 270,
      direction: 'WSW'
    },
    {
      minVal: 271,
      maxVal: 300,
      direction: 'W'
    },
    {
      minVal: 301,
      maxVal: 315,
      direction: 'WNW'
    },
    {
      minVal: 316,
      maxVal: 345,
      direction: 'NW'
    },
    {
      minVal: 346,
      maxVal: 360,
      direction: 'NNW'
    }
  ];
  let wind_direction = '';
  for (let i = 0; i < wind_directions_array.length; i++) {
    if (
      windDir >= wind_directions_array[i].minVal &&
      windDir <= wind_directions_array[i].maxVal
    ) {
      wind_direction = wind_directions_array[i].direction;
    }
  }
  return wind_direction;
}
