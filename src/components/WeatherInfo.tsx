import { Row, Col } from 'antd'
import { OpenWeatherAPI } from 'app/@types/OperWeatherAPI';
import Converter from "utils/Converter";

// MOVE TO OWN @TYPES 
interface WeatheInfoProps { 
    cityName?: string
    weather: Array<OpenWeatherAPI.WeatherDetail>
    main?: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number 
        pressure: number
        humidity: number 
    }
    wind?: {
        speed: number
        deg: number
        gust: number
    }
    timezone?: number
    dateTime?: number
}


export const WeatherInfo = (props: WeatheInfoProps) => {

    const { cityName, weather, main, wind, timezone, dateTime } = props

    return (
        <> 
            <Row justify={'center'}>
                <Col>
                    {cityName}
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col>
                    {   weather.length > 0 && 
                        (weather.map((detail) => (<img src={`http://openweathermap.org/img/w/${detail.icon}.png`} alt={`${detail.description}`}/>)))
                    }
                </Col>
                <Col>
                    { main?.temp && 
                        
                        (
                            <>
                                <span>{Math.ceil(Converter.kelvinToCelsius(main.temp))}°</span>
                            </>
                        )
                        
                    }
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col>{Math.ceil(Converter.kelvinToCelsius(main?.temp_min))}/{Math.ceil(Converter.kelvinToCelsius(main?.temp_max))} Feels like {Math.ceil(Converter.kelvinToCelsius(main?.feels_like))}</Col>
            </Row>
        </>
        
    )
}