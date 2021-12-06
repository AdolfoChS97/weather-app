import { Row, Col, Card } from 'antd';
import { WeatherInfo } from './components/WeatherInfo'
// import { WeatherCard } from './components/WeatherCard'
import { useEffect, useState } from 'react';
import Axios from 'utils/Axios';
import { OpenWeatherAPI } from 'app/@types/OperWeatherAPI';

function App() {
  
  const [mainCityInformation, changeMainCityInformation] = useState<OpenWeatherAPI.Response.Place>()
  // const [listCityInformation, changeListCityInformation] = useState([])

  useEffect(() => {

      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              
              Axios.request({ url: `http://${process.env.REACT_APP_WEATHER_API_URL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_WEATHER_API_PK}`, method: 'GET' })
              .then((response) => {

                  changeMainCityInformation({ ...response.data })

              }).catch((reason) => {
                console.log(reason);
              })
          
          }, (error) => {
            console.log(error);
          })
      }

  }, [])

  return (
    <>
      <Row justify={'center'}>
        <Col span={12} >
          <Card title={'Weather in your city'} >
            { mainCityInformation && 
              (
                <>
                  < WeatherInfo  cityName={mainCityInformation.name} weather={mainCityInformation.weather} main={mainCityInformation.main} wind={mainCityInformation.wind} timezone={mainCityInformation.timezone} dateTime={mainCityInformation.dt}  />
                </>
              )
             }
          </Card>
        </Col>
      </Row>
      {/* <Row justify={'center'} gutter={[16,0]}>
        <Col>
          <WeatherCard />
        </Col>
        <Col>
          <WeatherCard />
        </Col>        
        <Col>
          <WeatherCard />
        </Col>        
        <Col>
          <WeatherCard />
        </Col>
      </Row>
       */}
    </>
  );
}

export default App;
