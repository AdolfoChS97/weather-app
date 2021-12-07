import { useEffect, useState } from 'react';
import { Row, Col, Card, Input } from 'antd';
import { WeatherInfo } from 'components/WeatherInfo'
import { GithubProfile } from 'components/Github'
import Axios from 'utils/Axios';
import { OpenWeatherAPI } from 'app/@types/OperWeatherAPI';

const { Search } = Input

function App() {
  
  const [mainCityInformation, changeMainCityInformation] = useState<OpenWeatherAPI.Response.Place>()
  const [loadingSeachInput, changeLoadingSearchInput] = useState(false)
  useEffect(() => {

      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              
              Axios.request({ url: `
                ${process.env.REACT_APP_WEATHER_PROTOCOL}${process.env.REACT_APP_WEATHER_API_URL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_WEATHER_API_PK}`, 
              method: 'GET' })
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

  const searchCity = (city: string) => {
    changeLoadingSearchInput(true)
    Axios.request({ url: `${process.env.REACT_APP_WEATHER_PROTOCOL}${process.env.REACT_APP_WEATHER_API_URL}?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_PK}`, method: 'GET' })
      .then((response) => {
        changeMainCityInformation({ ...response.data })
      })
      .catch((reason) => {
        console.log(reason);
      })
      .finally(() => {
        changeLoadingSearchInput(false)
      })
  }

  return (
    <div>
      <Row justify={'center'} style={{ marginTop: 100 }} >
        <Col span={8}>
          <Search placeholder={'Search your city ...'} onSearch={searchCity} loading={loadingSeachInput} >
          </Search>
        </Col>
      </Row>
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
      {/* <Row justify={'start'}>
          <GithubProfile />
      </Row> */}
    </div>
  );
}

export default App;
