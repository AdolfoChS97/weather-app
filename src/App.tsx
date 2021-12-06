import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { WeatherInfo } from './components/WeatherInfo'
import Axios from 'utils/Axios';
import { OpenWeatherAPI } from 'app/@types/OperWeatherAPI';

function App() {
  
  const [mainCityInformation, changeMainCityInformation] = useState<OpenWeatherAPI.Response.Place>()
  // const [listCityInformation, changeListCityInformation] = useState([])

  useEffect(() => {

      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              
              Axios.request({ url: `
                http://${process.env.REACT_APP_WEATHER_API_URL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_WEATHER_API_PK}`, 
              method: 'GET' })
              .then((response) => {
                  console.log(response.data)
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
    <div>
      <Row justify={'center'}>
        <Col span={24} >
          <Card style={{ backgroundColor: 'transparent' }} >
            { mainCityInformation && 
              (
                <>
                  < WeatherInfo  cityName={mainCityInformation.name} countryName={mainCityInformation.sys.country} weather={mainCityInformation.weather} main={mainCityInformation.main} wind={mainCityInformation.wind} timezone={mainCityInformation.timezone} dateTime={mainCityInformation.dt}  />
                </>
              )
             }
             {
               !mainCityInformation && (
                  <>
                    
                  </>
               )
             }
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
