import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import { Tooltip, Descriptions, Row, Col, Rate, Button  } from 'antd';
import { PhoneTwoTone } from '@ant-design/icons';
import DisplayTabs from './display-tabs';
import './index.less'
import HD3 from '../../assets/images/huodong3.jpg';
import {getCompanyById,getOrderTotalNum,getOrderTotalGoodNum} from '../../api/index'

const companyData = '我们是上海市装饰协会信的过企业之一，长三角区域绿色环保装潢示范单位，全国500强家装企业之一，360度无醛装修工艺技术，让客户零等待可搬新家。齐家老字号，连续10年荣获优质口碑。公司讲诚信、重质量，您的满意是我们的宗旨。一次装修，终身朋友！'

class CompanyDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyDetail:{},
            totalNumData:'',
            goodRated:'',
            staffData:{},
        };
    }
    async componentDidMount(){
        const companyId = this.props.match.params.companyId;
        this.getCompanyDetail(companyId);
        this.getOrderTotalNumData(companyId);
    }
    getCompanyDetail = async id => {
        const result = await getCompanyById(id)
        this.setState({companyDetail:result.data.data})
    }
    getOrderTotalNumData = async id => {
        const result = await getOrderTotalNum(id);
        const rateResult = await getOrderTotalGoodNum(id,null,null,1);
        this.setState({totalNumData:result.data.data,goodRated:rateResult.data.data});
    }
    

    render() {
        const {companyDetail,totalNumData,goodRated} = this.state;
        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', paddingTop: 30 }}>
                    <div style={{ width: '1160px', height: 290, margin: '0px auto' }}>
                        <Row>
                            <Col span={4}>
                                <img src={companyDetail.companyImg} alt="公司标志" style={{ width: 170, height: 170 }} />
                            </Col>
                            <Col span={10}>
                                <Descriptions title={companyDetail.companyName} column={1}  >
                                    <Descriptions.Item label="地址">
                                        {companyDetail.companyProvince}{companyDetail.companyCity}{companyDetail.companyAddress}
                                        {/* 黄浦、徐汇、长宁、静安、普陀、虹口、杨浦、闵行、宝山、嘉定、浦东、松江、青浦、奉贤 */}
                                </Descriptions.Item>
                                    {/* <Descriptions.Item label="擅长类型">
                                        三房、四房、复式、别墅、大平层
                                </Descriptions.Item> */}
                                    <Descriptions.Item label="公司简介">
                                        <Tooltip title={companyDetail.companyProfile}>
                                            <span>
                                                {companyDetail.companyProfile}
                                        </span>
                                        </Tooltip>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col span={10} className="gutter-row">
                                <div style={{ width: '100%', height: 96, marginTop: 20 ,paddingTop:'10px'}}>
                                    <Rate count={5} value={(goodRated*5/totalNumData).toFixed(1)} disabled allowHalf />
                                    <span>{(goodRated/totalNumData*100).toFixed(2)}% 好评率</span>
                                    <p></p>
                                    <p>订单数：{totalNumData}</p>
                                </div>
                                <div style={{ marginTop: 20, fontSize: 18 }}>
                                    <PhoneTwoTone twoToneColor='#1DA57A' />电话咨询：{companyDetail.companyPhone}
                            </div>

                            </Col>
                        </Row>
                    </div>
                </div>
                <DisplayTabs companyId={this.props.match.params.companyId} />
            </div>
        )
    }
}
export default CompanyDisplay;