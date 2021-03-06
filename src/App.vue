<template>
<div id="app">
    <div id="search">
        <input id="location-input" type="text" ref="input" placeholder="Location?" @keyup.enter="organizeAllDetails">
        <button id="search-btn" @click="organizeAllDetails">
            <img src="./assets/Search.svg" width="24" height="24">
        </button>
    </div>
    <div id="info">
        <div class="wrapper-left">
            <div id="current-weather">
                {{ currentWeather.temp }}
                <span>°C</span>
            </div>
            <div id="weather-desc">{{ currentWeather.summary }}</div>
            <div class="temp-max-min">
                <div class="max-desc">
                    <div id="max-detail">
                        <i>▲</i>
                        {{ currentWeather.todayHighLow.todayTempHigh }}
                        <span>°C</span>
                    </div>
                    <div id="max-summary">at {{ currentWeather.todayHighLow.todayTempHighTime }}</div>
                </div>
                <div class="min-desc">
                    <div id="min-detail">
                        <i>▼</i>
                        {{ currentWeather.todayHighLow.todayTempLow }}
                        <span>°C</span>
                    </div>
                    <div id="min-summary">at {{ currentWeather.todayHighLow.todayTempLowTime }}</div>
                </div>
            </div>
        </div>
        <div class="wrapper-right">
            <div class="date-time-info">
                <div id="date-desc">
                    <img src="./assets/calendar.svg" width="20" height="20">
                    {{ currentWeather.time }}
                </div>
            </div>
            <div class="location-info">
                <div id="location-desc">
                    <img src="./assets/location.svg" width="10.83" height="15.83" style="opacity: 0.9;">
                    {{ currentWeather.full_location }}
                    <div id="location-detail" class="mt-1">
                        Lat: {{ currentWeather.formatted_lat }}
                        <br>
                        Long: {{ currentWeather.formatted_long }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <dashboard-content :tempVar="tempVar" :highlights="highlights">
    </dashboard-content>
</div>
</template>

<script>
import Content from './components/Content.vue';
import './scripts/utilityFunctions.js';
import {
    WeatherAPI
} from './scripts/_owapi.js';

export default {
    components: {
        'dashboard-content': Content,
    },
    data() {
        return {
            weatherDetails: false,
            location: '', // raw location from input
            lat: '', // raw latitude from google maps api response
            long: '', // raw longitude from google maps api response
            completeWeatherApi: '', // weather api string with lat and long
            rawWeatherData: '', // raw response from weather api
            currentWeather: {
                full_location: '', // for full address
                formatted_lat: '', // for N/S
                formatted_long: '', // for E/W
                time: '',
                temp: '',
                todayHighLow: {
                    todayTempHigh: '',
                    todayTempHighTime: '',
                    todayTempLow: '',
                    todayTempLowTime: ''
                },
                summary: '',
                possibility: ''
            },
            tempVar: {
                tempToday: [
                    // gets added dynamically by this.getSetHourlyTempInfoToday()
                ],
            },
            highlights: {
                uvIndex: '',
                visibility: '',
                windStatus: {
                    windSpeed: '',
                    windDirection: '',
                    derivedWindDirection: ''
                },
            }
        };
    },
    methods: {
        organizeAllDetails() {
            alert('Testing Woah!')
        },
        // Data Acquisition: 
        getCoords() {
            this.locationEntered();
            let loc = this.location;
            let coords;
            let geocoder = new google.maps.Geocoder();

            return new Promise((resolve, reject) => {
                geocoder.geocode({
                    address: loc
                }, (results, status) => {
                    if (status == google.maps.GeocoderStatus.OK) {
                        this.lat = results[0].geometry.location.lat();
                        this.long = results[0].geometry.location.lng();
                        this.full_location = results[0].formatted_address;

                        coords = {
                            lat: this.lat,
                            long: this.long,
                            full_location: this.full_location
                        };
                        resolve(coords);
                    } else {
                        alert(`Oops! Couldn't get data for the entered location`);
                    }
                });
            });
        },
        async setFormatCoords() {
            let coords = await this.getCoords();
            this.lat = coordinates.lat;
            this.long = coordinates.long;
            this.currentWeather.full_location = coordinates.full_location;

            if (coordinates.lat > 0) {
                this.currentWeather.formatted_lat =
                    (Math.round(coordinates.lat * 10000) / 10000).toString() + '°N';
            } else if (coordinates.lat < 0) {
                this.currentWeather.formatted_lat =
                    (-1 * (Math.round(coordinates.lat * 10000) / 10000)).toString() + '°S'
            } else {
                this.currentWeather.formatted_lat = (
                        Math.round(coordinates.lat * 10000) / 10000)
                    .toString();
            }
            if (coordinates.long > 0) {
                this.currentWeather.formatted_long =
                    (Math.round(coordinates.long * 10000) / 10000).toString() + '°E';
            } else if (coordinates.long < 0) {
                this.currentWeather.formatted_long =
                    (-1 * (Math.round(coordinates.long * 10000) / 10000)).toString() + '°W';
            } else {
                this.currentWeather.formatted_long = (
                    Math.round(coordinates.long * 10000) / 10000
                ).toString();
            }
        },
        async setWeatherLocation() {
            await this.setFormatCoords();
            let lat = this.lat;
            let long = this.long;
            let key = WeatherAPI;
            let currentWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`
            this.completeWeatherApi = currentWeatherApi;
        },
        async fetchWeatherData() {
            await this.setWeatherLocation();
            let axios = require('axios');
            let weatherApiResponse = await axios.get(this.completeWeatherApi);
            if (weatherApiResponse.status === 200) {
                this.rawWeatherData = weatherApiResponse.data;
            } else {
                alert('Hmm.... You may need to look out the window!')
            }
        },
        getTimezone() {
            if (this.rawWeatherData.timezone != undefined) {
                return this.rawWeatherData.timezone
            } else {
                alert('Timezone not found');
            };
        },
        getCurrentTime() {
            let currentTime = this.rawWeatherData.current.dt;
            let timezone = this.getTimezone();
            this.currentWeather.time = unixToHuman(
                timezone,
                currentTime,
            ).fullTime;
        },
        getSetSummary() {
            let currentSummary = convertToTitleCase(
                this.rawWeatherData.daily[0].weather.description
            );
            this.currentWeather.summary = currentSummary;
        },
        getSetPossibility() {
            let possible = formatPossibility(
                this.rawWeatherData.hourly[1].weather.description
            );
            this.currentWeather.possibility = possible;
        },
        getSetCurrentTemp() {
            let currentTemp = this.rawWeatherData.current.temp;
            this.currentWeather.temp = kelvinToCelcius(currentTemp);
        },
        getTodayDetails() {
            return this.rawWeatherData.daily[0]
        },
        getSetTodayTempHighLowTime() {
            let timezone = this.getTimezone();
            let todayDetails = this.getTodayDetails();
            let hourlyClone = this.rawWeatherData.hourly.slice(0);
            hourlyClone.sort((a, b) => {
                return parseInt(a.temp) - parseInt(b.temp);
            });
            let min = hourlyClone[0];
            let max = hourlyClone[hourlyClone.length - 1];
            this.currentWeather.todayHighLow.todayTempHigh = kelvinToCelcius(
                todayDetails.temp.max
            );
            // Time for Hottest
            this.currentWeather.todayHighLow.todayTempHighTime = unixToHuman(
                this.timezone,
                max.dt
            ).onlyTime
            this.currentWeather.todayHighLow.todayTempLow = kelvinToCelcius(
                todayDetails.temp.min
            );
            // Time for Lowest
            this.currentWeather.todayHighLow.todayTempLowTime = unixToHuman(
                this.timezone,
                min.dt
            ).onlyTime
        },
        getHourlyInfoToday() {
            return this.rawWeatherData.hourly;
        },
        getSetHourlyTempInfoToday() {
            let unixTime = this.rawWeatherData.current.dt;
            let timezone = this.getTimezone();
            let todayMonthDate = unixToHuman(timezone, unixTime).onlyMonthDate;
            let hourlyData = this.getHourlyInfoToday();
            for (let i = 0; i < hourlyData.length; i++) {
                let hourlyTimeAllTypes = unixToHuman(timezone, hourlyData[i].dt);
                let hourlyOnlyTime = hourlyTimeAllTypes.onlyTime;
                let hourlyMonthDate = hourlyTimeAllTypes.onlyMonthDate;
                if (todayMonthDate === hourlyMonthDate) {
                    let hourlyObject = {
                        hour: '',
                        temp: ''
                    };
                    hourlyObject.hour = hourlyOnlyTime;
                    hourlyObject.temp = kelvinToCelcius(hourlyData[i].temp).toString();
                    this.tempVar.tempToday.push(hourlyObject);
                }
            }
            if (this.tempVar.tempToday.length <= 2) {
                var minTempObject = {
                    hour: this.currentWeather.todayHighLow.todayTempHighTime,
                    temp: this.currentWeather.todayHighLow.todayTempHigh
                };
                var maxTempObject = {
                    hour: this.currentWeather.todayHighLow.todayTempLowTime,
                    temp: this.currentWeather.todayHighLow.todayTempLow
                };
                this.tempVar.tempToday.unshift(maxTempObject, minTempObject);
            }
        },
        getSetUVIndex() {
            let uvIndex = this.rawWeatherData.current.uvi;
            this.highlights.uvIndex = uvIndex;

        },
        getSetVisibility() {
            let visibilityInMeters = this.rawWeatherData.current.visibility;
            this.highlights.visibility = kmShortener(visibilityInMeters);
        },

        getSetWindStatus() {
            let windSpeed = this.rawWeatherData.current.wind_speed;
            let absoluteWindDirection = this.rawWeatherData.current.wind_deg;
            this.highlights.windStatus.windDirection = absoluteWindDir;
            this.highlights.windStatus.derivedWindDirection = deriveWindDir(absoluteWindDirection);
        },
        // event methods:
        makeInputEmpty() {
            this.$refs.input.value = '';
        },
        makeTempVarTodayEmpty() {
            this.tempVar.tempToday = [];
        },
        detectEnterKeyPress() {
            let input = this.$refs.input;
            input.addEventListener('keyup', (evt) => {
                evt.preventDefault();
                let enterKeyCode = 13;
                if (evt.keyCode === enterKeyCode) {
                    this.setHitEnterKeyTrue();
                }
            });
        },
        locationEntered() {
            let input = this.$refs.input;
            if (input.value === '') {
                this.location = 'Berlin';
            } else {
                this.location = this.convertToTitleCase(input.value);
            }
            this.makeInputEmpty();
            this.makeTempVarTodayEmpty();
        },

    },
    computed: {

    },
}
</script>

<style>

</style>
