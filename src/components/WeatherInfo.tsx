import { Row, Col } from 'antd'
import {
    EnvironmentOutlined
  } from '@ant-design/icons';
import { WeatherApp } from 'app/@types/weatherApp';
import Converter from "utils/Converter";

export const WeatherInfo = (props: WeatherApp.Info) => {

    const { cityName, countryName, weather, main, wind, timezone } = props
    const dateTime = new Date().toLocaleDateString()
    const fontSizeExtras = { fontSize: 20 }

    return (
        <> 
            <Row justify={'center'}>
                <Col>
                    <EnvironmentOutlined style={{ fontSize: 25, fontWeight: 'bolder' }} />
                    {'  '}
                    <span style={{ fontSize: 25 }}>
                        <b>{cityName}</b>, <b>{countryName}</b>
                    </span>
                </Col>
            </Row>
            <Row justify={'center'}>
                <span style={{ fontSize: 19 }}>{dateTime}</span>
            </Row>
            <Row justify={'center'}>
                <Col>
                    {   weather.length > 0 && 
                        (weather.map((detail) => (<img style={{ width: 75, margin: '27px -15px 0px 0px' }} src={`http://openweathermap.org/img/w/${detail.icon}.png`} alt={`${detail.description}`}/>)))
                    }
                </Col>
                <Col style={{margin: 15, fontSize:60}}>
                    { main?.temp && 
                        
                        (
                            <>
                                <span><b>{Math.ceil(Converter.kelvinToCelsius(main.temp))}°</b></span>
                            </>
                        )
                        
                    }
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col>
                    <div style={{ fontSize: 26 }}>
                        <span>
                            <b>
                                {Math.ceil(Converter.kelvinToCelsius(main?.temp_min))}°/{Math.ceil(Converter.kelvinToCelsius(main?.temp_max))}°
                            </b>
                        </span>
                        {' '}Feels like{' '}
                        <span>
                            <b>
                                {Math.ceil(Converter.kelvinToCelsius(main?.feels_like))}°
                            </b>
                        </span>
                    </div>
                </Col>
            </Row>
            <Row justify={'center'} gutter={[24,0]} style={{ marginTop: 15 }}>
                <Col>
                    <div style={fontSizeExtras}>Humidity</div>{' '}
                    <span><b>{main?.humidity}%</b></span>
                </Col>
                <Col>
                    <div style={fontSizeExtras}>Pressure</div>{' '}
                    <span><b>{main?.pressure}</b></span>
                </Col>
                <Col>
                    <div style={fontSizeExtras}>Wind</div>{' '}
                    <span><b>{wind?.speed}{' '}m/s</b></span>
                </Col>
            </Row>
        </>
        
    )
}