import React from 'react';
import { Card, Select, Button, Rate, Row, Col, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import HD1 from '../../assets/images/huodong1.jpg';
import HD2 from '../../assets/images/huodong2.jpg';
import HD3 from '../../assets/images/huodong3.jpg';


const contentStyle ={height:362,width:'100%'}
const { Option } = Select;
const { Meta } = Card;
const data = [
    { name: '巴拉巴拉官方装修公司', rate: 3.5, rateTotal: 99999 },
    { name: '巴拉巴拉官方装修公司', rate: 3.5, rateTotal: 99999 },
    { name: '巴拉巴拉官方装修公司', rate: 3.5, rateTotal: 99999 },
    { name: '巴拉巴拉官方装修公司', rate: 3.5, rateTotal: 99999 },
    { name: '巴拉巴拉官方装修公司', rate: 3.5, rateTotal: 99999 },
    { name: '巴拉巴拉官方装修公司', rate: 3.5, rateTotal: 99999 },
    { name: '巴拉巴拉官方装修公司', rate: 3.5, rateTotal: 99999 },
    { name: '巴拉巴拉官方装修公司', rate: 3.5, rateTotal: 99999 },
]



class Balabala extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Card bodyStyle={{padding:0}}>
                <Carousel autoplay>
                    <div><img style={contentStyle} src={HD1} alt='活动1' /></div>
                    <div><img style={contentStyle} src={HD2} alt='活动2' /></div>
                    <div><img style={contentStyle} src={HD3} alt='活动3' /></div>
                </Carousel>
                <Card
                    style={{ marginTop: '16px' }}
                    bordered={false}
                    title={<span style={{ fontWeight: 500, fontSize: '18px' }}>装修公司</span>}
                    extra={<>
                        <Select defaultValue='most-praise' bordered={false}>
                            <Option value='most-praise' >好评最多</Option>
                            <Option value='most-order' >订单最多</Option>
                        </Select>
                        <Button size='middle' type='link'>查看更多</Button>
                    </>}
                >
                    <Row gutter={16}>
                        {
                            data.map(item => (
                                <Link to='/balabala/company-display'>
                                    <Col sapn={6} style={{ marginTop: 16 }}>
                                        <Card
                                            hoverable
                                            style={{ width: 290, }}
                                            cover={<img alt="example" style={{ height: 200 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                        >
                                            <Meta
                                                title={item.name}
                                                description={
                                                    <div style={{ fontSize: 14, color: '#999' }}>
                                                        <Rate count={5} defaultValue={item.rate} disabled allowHalf />
                                                        <span> {item.rateTotal} 条评价</span>
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                </Link>
                            ))
                        }
                    </Row>
                </Card>
                <Card
                    style={{ marginTop: '16px' }}
                    bordered={false}
                    title={<span style={{ fontWeight: 500, fontSize: '18px' }}>施工人员</span>}
                    extra={<>
                        <Select defaultValue='most-praise' bordered={false}>
                            <Option value='most-praise' >好评最多</Option>
                            <Option value='most-order' >订单最多</Option>
                        </Select>
                        <Button size='middle' type='link'>查看更多</Button>
                    </>}
                >
                    <Row gutter={16}>
                        {
                            data.map(item => (
                                <Link to='/balabala/company-display'>
                                    <Col sapn={6} style={{ marginTop: 16 }}>
                                        <Card
                                            hoverable
                                            style={{ width: 290, }}
                                            cover={<img alt="example" style={{ height: 200 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                        >
                                            <Meta
                                                title={item.name}
                                                description={
                                                    <div style={{ fontSize: 14, color: '#999' }}>
                                                        <Rate count={5} defaultValue={item.rate} disabled allowHalf />
                                                        <span> {item.rateTotal} 条评价</span>
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                </Link>
                            ))
                        }
                    </Row>
                </Card>
            </Card>
        )
    }
}
export default Balabala;