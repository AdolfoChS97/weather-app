import { WeatherApp } from 'app/@types/weatherApp';
import Converter from "utils/Converter";
import { Grid, Tooltip, Typography } from '@mui/material';
import { PlaceOutlined, AirOutlined, WaterOutlined, SpeedOutlined } from '@mui/icons-material/';
import moment from 'moment';

export const WeatherInfo = (props: WeatherApp.Info) => {

    const { cityName, countryName, weather, main, wind, timezone } = props
    console.log(cityName, countryName, weather, main, wind, timezone);
    const dateTime = moment().format('MMMM Do YYYY, h:mm:ss a')

    // font color style
    const color = { color: '#ffffff' }
    const iconsMargin = { margin: '0px 0px -4px 0px' }

    return (
        <>
            <Grid container direction="column" alignItems="center" justifyContent="center" style={{ margin: '3% 0% 3% 0%', ...color}}>
                <Grid item xs={12} md={5} lg={3} >
                    <Typography variant={'h4'}>
                        <PlaceOutlined style={{ margin: '10px 3px -5px 0px', fontSize: '2.125rem' }}/> <b>{cityName},{' '}{countryName}</b>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={5} lg={3}>
                    <Typography variant={'caption'}>{dateTime}</Typography>
                </Grid>
            </Grid> 
            <Grid container direction="row" alignItems="center" justifyContent="center" style={color}>
                <Grid>
                    {   weather.length > 0 && 
                            (
                                weather.map((detail) => (
                                <Grid item xs md lg>
                                    <Tooltip title={detail.description}>
                                        <img 
                                            style={{ fontSize: '6rem' }} 
                                            src={`http://openweathermap.org/img/w/${detail.icon}.png`} 
                                            alt={`${detail.description}`}
                                        />
                                    </Tooltip>
                                </Grid>)
                                )
                            )
                    }
                </Grid>
                <Grid>
                    { main?.temp && 
                            (
                                <>
                                    <Grid item xs md lg>
                                        <Typography variant={'h1'}>
                                            <b>{Math.ceil(Converter.kelvinToCelsius(main.temp))}°</b>
                                        </Typography>
                                    </Grid>
                                </>
                            )
                            
                    }
                </Grid>
            </Grid>
            <Grid container direction="column" alignItems="center" justifyContent="center" style={color}>
                <Grid item xs md lg>
                    <Typography variant={'h4'}>
                        <Tooltip title={'Minimum temperature / Maximum temperature'}>
                            <b>
                                {Math.ceil(Converter.kelvinToCelsius(main?.temp_min))}°/{Math.ceil(Converter.kelvinToCelsius(main?.temp_max))}°
                            </b>
                        </Tooltip>
                        {' '}Feels like{' '}
                        <Tooltip title={'Thermal sensation'}>
                            <b>
                                {Math.ceil(Converter.kelvinToCelsius(main?.feels_like))}°
                            </b>
                        </Tooltip>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container  direction="column" alignItems="center" justifyContent="center" style={{ margin: '6% 0% 0% 0%' ,...color}}>
                <Grid>
                    <Grid container direction="row" alignItems={'center'} justifyContent={'center'} columnSpacing={8}>
                        <Grid item>
                            <Typography variant={'h5'}>
                                <Grid container direction="column" alignItems={'center'} justifyContent={'center'}>
                                    <Grid>
                                        <WaterOutlined style={iconsMargin} /> <b>Humidity</b>
                                    </Grid>
                                    <Grid>
                                        <b>{main?.humidity}%</b>
                                    </Grid>
                                </Grid>      
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'h5'}>
                                <Grid container direction="column" alignItems={'center'} justifyContent={'center'}>
                                    <Grid>
                                        <SpeedOutlined style={iconsMargin} /> <b>Pressure</b>
                                    </Grid>
                                    <Grid>
                                        <b>{main?.pressure}</b>
                                    </Grid>
                                </Grid>    
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'h5'}>
                                <Grid container direction="column" alignItems={'center'} justifyContent={'center'}>
                                    <Grid>
                                        <AirOutlined style={iconsMargin} /> <b>Wind</b>
                                    </Grid>
                                    <Grid>
                                        <b>{wind?.speed}{' '}m/s</b>
                                    </Grid>
                                </Grid>    
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
        
    )
}