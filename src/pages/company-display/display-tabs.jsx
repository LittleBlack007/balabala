import React from 'react';
import { Tabs, Card, Row, Col, Pagination, Avatar  } from 'antd';
import { Link } from 'react-router-dom';
// import {tickFormatter} from '../../utils/formatter.ts';
import {getCasesByCompanyId,getGoodStaffByCompanyId} from '../../api/index';


const kindMap = {
    1:'设计师',2:'木工',3:'混凝土工',4:'贴砖工',5:'油漆工',6:'泥瓦工',7:'防水工',8:'水电工'
}
const { TabPane } = Tabs;
const { Meta } = Card;
const anlidata = [
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
]
const shejishidata = [
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
]


class DisplayTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staffData:null,
            caseData:null,
            staffList:null
        };
    }

    onTabChange = (key) => {
        console.log(key);
    }

    onPageCaseChange = (pageNumber) => {
        console.log(pageNumber)
    }
    async componentDidMount(){
        const {companyId} = this.props;
        this.getCaseByCompanyIdData(1,companyId);
        this.getGoodStaffDataByCompanyId(1,companyId);
    }
    getCaseByCompanyIdData = async (pageNum,companyId) =>{
        const result = await getCasesByCompanyId(pageNum,companyId);
        this.setState({caseData:result.data.data})
    }
    getGoodStaffDataByCompanyId = async (pageNum,companyId) => {
        const result = await getGoodStaffByCompanyId(pageNum,companyId);
        this.setState({staffData:result.data.data})
    }

    render() {
        const {caseData,staffData} = this.state;
        const {companyId} = this.props;
        return (
            <Card>
                <Tabs defaultActiveKey="case" onChange={this.onTabChange} type='card'
                // tabBarExtraContent={<Button type='link'>查看更多</Button>}
                >
                    <TabPane tab="竣工案例" key="case">
                        <Row gutter={16}>
                            {caseData && caseData.list?
                                caseData.list.map((item) => (
                                    <Link to={`/balabala/company-display/case/${item.id}`}>
                                        <Col style={{ marginTop: 16 }}>
                                            <Card
                                                hoverable
                                                style={{ width: 290, }}
                                                cover={<img alt="example" style={{ height: 200 }} src={item.caseIndeximg} />}
                                            >
                                                <Meta
                                                    title={item.caseTitle}
                                                    description={
                                                        <div style={{ fontSize: 14, color: '#999' }}>
                                                            <span> 预算:{item.caseBudget} | {item.caseArea}m<sup>2</sup></span>
                                                        </div>
                                                    }
                                                />
                                            </Card>
                                        </Col>
                                    </Link>
                                )):null
                            }
                        
                        </Row>
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            {caseData?<Pagination  total={caseData.total} onChange={this.onPageCaseChange} />:null}
                            {/* hideOnSinglePage */}
                        </div>
                    </TabPane>
                    <TabPane tab="员共团队" key="design">
                        <Row gutter={16}>
                            {staffData && staffData.list.length>0?
                                staffData.list.map((item) => (
                                    <Link to={`/balabala/staff/     ${item.id}`}>
                                        <Col>
                                            <Card
                                                hoverable
                                                style={{ width: 300, marginTop: 16 }}
                                                actions={[
                                                    <><p style={{ color: '#F17722' }}>{kindMap[item.kind_id]}</p><p>职业</p></>,
                                                    <><p style={{ color: '#F17722' }}>{item.total}个</p><p>订单个数</p></>,
                                                ]}
                                            >
                                                <Meta
                                                    avatar={
                                                        <Avatar size={86} src={item.staff_img} />
                                                    }
                                                    title={<><span style={{ fontWeight: 500, fontSize: 20 }}>{item.staff_name}</span><span style={{  fontSize: 14 }}>{item.position}</span></>}
                                                    description={<div style={{height:'90px',overflow:'hidden'}}>个人简介：{item.staff_profile}</div>}
                                                />
                                            </Card>
                                        </Col>
                                    </Link>
                                )):null
                            }
                        </Row>
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            {staffData 
                                ?<Pagination  
                                    total={staffData.total} 
                                    onChange={value => this.getGoodStaffDataByCompanyId(value,companyId)} />
                                :null
                            }
                            {/* hideOnSinglePage */}
                        </div>
                    </TabPane>
                </Tabs>
            </Card>

        )
    }
}
export default DisplayTabs;