namespace OpenWeatherAPI {
    
    export namespace Response {
        
        export interface Place {
            coord: {
                lon: number
                lat: number        
            }
            weather: Array<WeatherDetail>
            base: string
            main: {
                temp: number,
                feels_like: number,
                temp_min: number,
                temp_max: number,
                pressure: number,
                humidity: number
            } 
            visibility: number
            wind: {
                speed: number
                deg: number
                gust: number
            },
            clouds: {
                all: number
            },
            dt: number
            sys: {
                type: number
                id: number 
                country: string
                sunrise: number
                sunset: number
            },
            timezone: number,
            id: number,
            name: string,
            cod: number
        }
    }

    export interface WeatherDetail {
        id: number
        main: string
        description: string
        icon: string

    }

}
export { OpenWeatherAPI }  

