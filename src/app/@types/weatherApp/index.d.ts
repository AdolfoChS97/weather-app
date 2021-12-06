import { OpenWeatherAPI }  from "app/@types/OperWeatherAPI/index";

namespace WeatherApp {

    export interface Info {
        cityName?: string
        countryName?: string
        weather: Array<OpenWeatherAPI.WeatherDetail>
        main?: MainDetails
        wind?: WindDetail
        timezone?: number
        dateTime?: number
    }

    export interface MainDetail {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number 
        pressure: number
        humidity: number
    }

    export interface WindDetail {
        speed: number
        deg: number
        gust: number
    }

} 

export { WeatherApp }