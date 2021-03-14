import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import { Tooltip, Descriptions, Row, Col, Rate, Button  } from 'antd';
import { PhoneTwoTone } from '@ant-design/icons';
import DisplayTabs from './display-tabs';
import './index.less'
import HD3 from '../../assets/images/huodong3.jpg';

const companyData = '我们是上海市装饰协会信的过企业之一，长三角区域绿色环保装潢示范单位，全国500强家装企业之一，360度无醛装修工艺技术，让客户零等待可搬新家。齐家老字号，连续10年荣获优质口碑。公司讲诚信、重质量，您的满意是我们的宗旨。一次装修，终身朋友！'

class CompanyDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', paddingTop: 30 }}>
                    <div style={{ width: '1160px', height: 290, margin: '0px auto' }}>
                        <Row>
                            <Col span={4}>
                                <img src={HD3} alt="公司标志" style={{ width: 170, height: 170 }} />
                            </Col>
                            <Col span={10}>
                                <Descriptions title="T6空间设计" column={1}  >
                                    <Descriptions.Item label="服务区域">
                                        黄浦、徐汇、长宁、静安、普陀、虹口、杨浦、闵行、宝山、嘉定、浦东、松江、青浦、奉贤
                                </Descriptions.Item>
                                    <Descriptions.Item label="擅长类型">
                                        三房、四房、复式、别墅、大平层
                                </Descriptions.Item>
                                    <Descriptions.Item label="公司简介">
                                        <Tooltip title={companyData}>
                                            <span>
                                                我们是上海市装饰协会信的过企业之一，长三角区域绿色环保装潢示范单位，全国500强家装企业之一，360...
                                        </span>
                                        </Tooltip>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col span={10} className="gutter-row">
                                <div style={{ width: '100%', height: 96, marginTop: 20 }}>
                                    <Rate count={5} defaultValue={4.5} disabled allowHalf />
                                    <span>92.23% 好评率</span>
                                    <p>订单数：88888</p>
                                </div>
                                <div style={{ marginTop: 20, fontSize: 18 }}>
                                    <PhoneTwoTone twoToneColor='#1DA57A' />电话咨询：18888888888
                            </div>

                            </Col>
                        </Row>
                    </div>
                </div>
                <DisplayTabs />
            </div>
        )
    }
}
export default CompanyDisplay;