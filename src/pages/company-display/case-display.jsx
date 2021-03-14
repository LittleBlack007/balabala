import React from 'react';
import { Card, Col, Row, Tag, Avatar, Button } from 'antd';
import H3 from '../../assets/images/huodong3.jpg';

const colPhone = {
    xl: 24,
    ls: 24,
    sm: 24,
    lg: 24
}
const personData = {
    name: '王巴拉',
    position: '设计师总监',
    goodAt: '现代、简约、北欧、美式 作品分布： 航武家园 、南郊一品、鹤沙航城航武嘉园',
    time: '8年',
    praiseRate: 4.5
}

class CaseDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Card>
                <Row gutter={16}>
                    <Col {...colPhone} xl={18} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#f0f0f0', padding: 5 }}>
                        <Row
                            gutter={16}
                            title='世纪花园'
                            bordered={false}
                        >
                            <Col span={14}><img src={H3} style={{ width: 480, height: 300 }} alt='封面图片' /></Col>
                            <Col span={10}>
                                <p style={{ fontSize: 18, fontWeight: 'bold' }}>世纪花园</p>
                                <p><Tag color='green'>188m<sup>2</sup></Tag></p>
                                <p>造价：<span style={{ fontSize: 26, color: '#dd4848' }}>35万</span></p>
                                <p>特点：两房一厅，长走廊</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col {...colPhone} xl={6}>
                        <Card title='设计师信息' bodyStyle={{ color: '#f0f0ff0' }}>
                            <Row>
                                <Col {...colPhone} xl={12}>
                                    <Avatar size={86} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </Col>
                                <Col {...colPhone} xl={12} style={{marginTop:'20px'}}>
                                    <div style={{ fontWeight: 'bold', color: '#666666' }}>{personData.name}</div>
                                    <div>工作年限：{personData.time}</div>
                                </Col>
                            </Row>
                            <div style={{padding:'10px'}}>&nbsp;&nbsp;个人简介:{personData.goodAt}</div>
                            <div style={{textAlign:'center'}}>
                                <Button type='primary' style={{width:'200px'}}>在线联系</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Card>
        )
    }
}
export default CaseDisplay;