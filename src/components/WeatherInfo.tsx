import { Row, Col } from 'antd';
export const WeatherInfo = () => {
    return (
        <> 
           <Row justify={'center'}>
                <Col>
                    City
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col>
                    Tempeture                    
                </Col>
            </Row> 
            <Row justify={'center'}>
                <Col>
                    Intuitive icon
                </Col>
            </Row> 
        </>
    )
}