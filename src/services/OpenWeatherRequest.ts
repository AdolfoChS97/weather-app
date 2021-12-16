import { OpenWeatherAPI } from 'app/@types/OperWeatherAPI';
import Axios from "utils/Axios"

export default class OpenWeatherRequest {

    appId: string  = ""
    cityName: string = ""

    constructor(appId: string) {
        this.appId = appId
    }

    public getCityByCoords(latitude: number, longitude: number): Promise<OpenWeatherAPI.Response.Place> {
        return new Promise((resolve, reject) => {
            Axios.request({ url: `${process.env.REACT_APP_WEATHER_PROTOCOL}${process.env.REACT_APP_WEATHER_API_URL_WEATHER}?lat=${latitude}&lon=${longitude}&appid=${this.appId}`, 
              method: 'GET' }).then((response) => {
                  resolve(response.data)                  
              }, (reason) => {
                  reject(reason)
              })
        })
    }
    
    public getCityByName(cityName: string): Promise<OpenWeatherAPI.Response.Place> {
        return new Promise((resolve, reject) => {
            Axios.request({ url: `${process.env.REACT_APP_WEATHER_PROTOCOL}${process.env.REACT_APP_WEATHER_API_URL_WEATHER}?q=${cityName}&appid=${this.appId}`, method: 'GET' }).then((response) => {
                  resolve(response.data)                  
              }, (reason) => {
                  reject(reason)
              })
        })
    }

    public overwriteCity(cityName: string) {
        this.cityName = cityName
    }

    

}