import React from 'react';
import { Card, Col, Row, Tag, Avatar, Button } from 'antd';
import H3 from '../../assets/images/huodong3.jpg';
import {Link} from 'react-router-dom';
import {getCaseById,getStaffById} from '../../api/index';

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
const postDetailData = '<p>123</p><p>321</p><ul><li><span style="font-size: 24px;">2222</span></li></ul><ol><li><span style="font-size: 24px;">21321</span></li></ol>'
const styleMap = {
    1:'欧式',2:'中式',3:'简约',4:'混搭',5:'其他'
}
const layoutMap = {
    0:'一居室',1:'二居室',2:'三居室',3:'四居室',4:'其他'
}
const kindMap = {
    1:'设计师',2:'木工',3:'混凝土工',4:'贴砖工',5:'油漆工',6:'泥瓦工',7:'防水工',8:'水电工'
}
const typeMap = {
    0:'普通住宅',1:'复式别墅',2:'局部装修'
}

class CaseDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caseData:{},
            staffData:{}
        };
    }
    
    async componentDidMount(){
        const {caseId} = this.props.match.params;
        const caseData = await getCaseById(caseId);
        if(caseData && caseData.data && caseData.data.data){
            const staffData = await getStaffById(caseData.data.data.staffId);
            this.setState({staffData:staffData.data.data})
        }
        
        this.setState({caseData:caseData.data.data})
    }

    render() {
        const {caseData,staffData} =this.state;
        return (
            <Card>
                <Row gutter={16}>
                    <Col {...colPhone} xl={18} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#f0f0f0', padding: 5 }}>
                        <Row
                            gutter={16}
                            //title=
                            bordered={false}
                        >
                            <Col span={14}><img src={caseData.caseIndeximg} style={{ width: 480, height: 300 }} alt='封面图片' /></Col>
                            <Col span={10}>
                                <p style={{ fontSize: 18, fontWeight: 'bold' }}>{caseData.caseTitle}</p>
                                <p>面积：<Tag color='green'>{caseData.caseArea}m<sup>2</sup></Tag></p>
                                <p>造价：<span style={{ fontSize: 26, color: '#dd4848' }}>{(caseData.caseBudget+'').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span></p>
                                <p>特点：
                                    <Tag color='pink'>{typeMap[caseData.caseType]}</Tag>
                                    <Tag color='pink'>{layoutMap[caseData.layoutId]}</Tag>
                                    <Tag color='pink'>{styleMap[caseData.styleId]}</Tag>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col {...colPhone} xl={6}>
                        <Card title='设计者信息' bodyStyle={{ color: '#f0f0ff0' }}>
                            <Row>
                                <Col {...colPhone} xl={12}>
                                    <Avatar size={86} src={staffData.staffImg} />
                                </Col>
                                <Col {...colPhone} xl={12} style={{marginTop:'20px'}}>
                                    <div style={{ fontWeight: 'bold', color: '#666666' }}>{staffData.staffName}</div>
                                    {/* <div>工作年限：{personData.time}</div> */}
                                </Col>
                            </Row>
                            <div style={{padding:'10px'}}>&nbsp;&nbsp;个人简介:{staffData.staffProfile}</div>
                            <div style={{textAlign:'center'}}>
                                <Button type='primary' style={{width:'200px'}}><Link to={`/balabala/staff/${staffData.id}`}>Ta的主页</Link></Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Card style={{marginTop:'20px'}} title='案例详情'>
                    <div dangerouslySetInnerHTML={{__html:caseData.caseContent}}></div>
                </Card>
            </Card>
        )
    }
}
export default CaseDisplay;