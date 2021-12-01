import { Row, Col, Card } from 'antd';
import { WeatherInfo } from './components/WeatherInfo'
import { WeatherCard } from './components/WeatherCard'

function App() {
  return (
    <>
      <Row justify={'center'}>
        <Col span={12} >
          <Card title={'Weather in your city'} >
            < WeatherInfo />
          </Card>
        </Col>
      </Row>
      <Row justify={'center'} gutter={[16,0]}>
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
      
    </>
  );
}

export default App;
