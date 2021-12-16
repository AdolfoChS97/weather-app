import { useEffect, useState } from 'react'
import { WeatherInfo } from 'components/WeatherInfo'
import OpenWeatherRequest from 'utils/OpenWeatherRequest'
import { OpenWeatherAPI } from 'app/@types/OperWeatherAPI'
import { TextField, Grid, CircularProgress } from '@mui/material'

function App() {
  
  const requester = new OpenWeatherRequest(process.env.REACT_APP_WEATHER_API_PK as string)  
  const geo = navigator.geolocation
  const [mainCityInformation, changeMainCityInformation] = useState<OpenWeatherAPI.Response.Place>()
  
  useEffect(() => {
      if(geo) {
        geo.getCurrentPosition((position) => {
          requester.getCityByCoords(position.coords.latitude, position.coords.longitude)
            .then((response) => {
              changeMainCityInformation({ ...response })
            })
            .catch((reason) => changeMainCityInformation(undefined))  

        })
      }

  }, [])


  const searchCity = (city: string) => {
    requester.getCityByName(city)
      .then((response) => changeMainCityInformation({ ...response }))
      .catch((reason) => changeMainCityInformation(undefined))
    if(mainCityInformation) requester.overwriteCity(mainCityInformation.name)
  }

  return (
    <div>
      { geo && 
        (
          <>
            <Grid container direction="column" alignItems="center" justifyContent="center" style={{ margin: '1.5% 0% 3% 0%' }}>
              <Grid item xs md lg>
                <TextField label="Search your city ..." variant={'standard'} focused={true} onChange={(event) => searchCity(event.target.value)}/>
              </Grid>
            </Grid>
          </>
        ) 
      }
      { mainCityInformation && 
        (
          <>
            < WeatherInfo  cityName={mainCityInformation.name} countryName={mainCityInformation.sys.country} weather={mainCityInformation.weather} main={mainCityInformation.main} wind={mainCityInformation.wind} timezone={mainCityInformation.timezone} dateTime={mainCityInformation.dt}  />
          </>
        )
      }
      { !mainCityInformation && 
        (
          <>
            <Grid container direction="column" alignItems="center" justifyContent="center" style={{ margin: '11.5% 0% 3% 0%' }}>
              <Grid item xs md lg>
                <CircularProgress sx={{ color: '#fff' }} />
              </Grid>
            </Grid>
          </>
        )
      }
    </div>
  );
}

export default App;
