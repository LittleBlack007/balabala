import React from 'react';
import { Card, Col, Row, Tag, Avatar, Button, Collapse, List, Comment, Pagination, Tooltip, Rate} from 'antd';
import H3 from '../../assets/images/huodong3.jpg';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {getStaffById,getTotalOrderGoodNumForStaff,getRateUser,getCaseByStaffId} from '../../api/index'; 

const { Panel } = Collapse;
const { Meta } = Card;
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
const data = [
    {
        actions: [<span key="comment-list-reply-to-0">好评</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <><p>
                设计师服务态度很好，工作认真负责，价钱合理，好评
            </p>
            <img src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' style={{width:'100px',height:'100px'}}  alt='图片'/>&nbsp;
            </>
        ),
        datetime: (
            <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
    {
        actions: [<span key="comment-list-reply-to-0">好评</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                设计师服务态度很好，工作认真负责，价钱合理，好评
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
];
const kindMap = {
    1:'设计师',2:'木工',3:'混凝土工',4:'贴砖工',5:'油漆工',6:'泥瓦工',7:'防水工',8:'水电工'
}
class StaffDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staffDetail:{},
            orderTotal:'',
            orderGoodTotal:'',
            rateData:null,
            caseData:null
        };
    }

    async componentDidMount(){
        const staffId = this.props.match.params.staffId;
        this.getStaffDetail(staffId);
        this.getTotalOrderGoodNumForStaffData(staffId);   
        this.getRateUserData(staffId);
        this.getCaseData(1,staffId);
     }
     getCaseData = async (pageNum,staffId) => {
         const result = await getCaseByStaffId(pageNum,staffId);
         this.setState({caseData:result.data.data})
     }
     toListData = list => {
        let data =[];
        list.forEach(item => {
            let rateItem = {}
            rateItem.action = [<span key="comment-list-reply-to-0">{item.rate_grade===1?'好评':(item.rate_grade===2?'中评':'差评')}</span>]
            rateItem.author = item.user_name;
            rateItem.avatar = item.user_img;
            rateItem.content = (<>
                <p>{item.rate_content}</p>
                {item.rate_imgs.split(",").map(item =>
                   item===""?null:<img src={item} style={{width:'100px',height:'100px'}}  alt='图片'/>
                )}
                
            </>)
            rateItem.dateTime = (
                <Tooltip>
                    <span>{item.rate_time}</span>
                </Tooltip>
            )
            data.push(rateItem);
        })
        return data
    }

    getStaffDetail = async id => {
        const result = await getStaffById(id);
        this.setState({staffDetail:result.data.data})
    }
    getTotalOrderGoodNumForStaffData = async (staffId) => {
        const a = await getTotalOrderGoodNumForStaff(staffId,null)
        const b = await getTotalOrderGoodNumForStaff(staffId,1)
        this.setState({orderTotal:a.data.data,orderGoodTotal:b.data.data})
    }
    getRateUserData = async (staffId,rateGrade) => {
        const result = await getRateUser(1,staffId);
        this.setState({rateData:result.data.data})
    }

    render() {
        const {staffDetail,orderGoodTotal,orderTotal,rateData,caseData} = this.state;
        const staffId = this.props.match.params.staffId;
        return (
            <Card>
                <Row gutter={16}>
                    <Col {...colPhone} xl={18} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#f0f0f0', padding: 5 }}>
                        <Collapse defaultActiveKey={['1']} style={{ margin: '20px 20px' }}>
                            <Panel header="业主评价" key="1">
                                {rateData && rateData.list
                                ?<List
                                    className="comment-list"
                                    header={`${rateData.total} 条评价`}
                                    itemLayout="horizontal"
                                    dataSource={this.toListData(rateData.list)}
                                    renderItem={item => (
                                        <li>
                                            <Comment
                                                actions={item.actions}
                                                author={item.author}
                                                avatar={item.avatar}
                                                content={item.content}
                                                datetime={item.datetime}
                                            />

                                        </li>
                                    )}
                                    pagination={{
                                        pageNum:rateData.pageNum,
                                        pageSize:rateData.pageSize,
                                        total:rateData.total,
                                        onChange:async value => {
                                            const result = await getRateUser(value,staffId);
                                            this.setState({rateData:result.data.data})
                                        }
                                    }}
                                />:null}
                            </Panel>
                            <Panel header="个人案例" key="2">
                                <Row gutter={16}>
                                    {caseData && caseData.list.length>0?
                                        caseData.list.map(item => (
                                            <Link to={`/balabala/company-display/case/${item.id}`}>
                                                <Col style={{ marginTop: 16 }}>
                                                    <Card
                                                        hoverable
                                                        style={{ width: 280, }}
                                                        cover={<img alt="example" style={{ height: 160 }} src={item.caseIndeximg} />}
                                                    >
                                                        <Meta
                                                            title={item.caseTitle}
                                                            description={
                                                                <div style={{ fontSize: 14, color: '#999' }}>
                                                                    <span> 预算{item.caseBudget} | {item.caseArea}m<sup>2</sup></span>
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
                                    {caseData?<Pagination  
                                        pageSize={caseData.pageSize}
                                        pageNum={caseData.pageNum}
                                        total={caseData.total} 
                                        onChange={async value => {
                                            const result = await this.getCaseData(value,staffId)
                                            this.setState({caseData:result.data.data});
                                        }} 
                                    />:null}
                                </div>
                            </Panel>
                        </Collapse>
                    </Col>
                    <Col {...colPhone} xl={6}>
                        <Card title='Ta的信息' bodyStyle={{ color: '#f0f0ff0' }}>
                            <Row>
                                <Col {...colPhone} xl={12}>
                                    <Avatar size={86} src={staffDetail.staffImg} />
                                </Col>
                                <Col {...colPhone} xl={12} style={{ marginTop: '20px' }}>
                                    <div style={{ fontWeight: 'bold', color: '#666666' }}>{staffDetail.staffName}</div>
                                    <div style={{marginTop:'10px'}}>
                                        职业：<Tag color='green'>{kindMap[staffDetail.kindId]}</Tag>
                                    </div>
                                </Col>
                            </Row>
                            <div style={{ padding: '10px' }}>&nbsp;&nbsp;个人简介:{staffDetail.staffProfile}</div>
                            <div style={{ padding: '10px' }}>
                                &nbsp;&nbsp;现住地址:&nbsp;
                                <Tag color='pink'>{staffDetail.staffProvince}</Tag>
                                <Tag color='pink'>{staffDetail.staffCity}</Tag>
                                <Tag color='pink'>{staffDetail.staffAddress}</Tag>
                            </div>
                            
                        </Card>
                        <Card style={{marginBottom:'20px'}}>
                            <div style={{ width: '100%', height: 96, marginTop: 20, textAlign:'center' }}>
                                <Rate count={5} value={(orderGoodTotal*5/orderTotal).toFixed(2)} disabled allowHalf />&nbsp;&nbsp;
                                <span>{(orderGoodTotal/orderTotal*100).toFixed(2)}% 好评率</span>
                                <p>订单数：{orderTotal}</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Button type='primary' style={{ width: '200px' }}>电话号码：{staffDetail.staffPhone}</Button>
                            </div>
                            <div style={{ textAlign: 'center', marginTop:'20px' }}>
                                <Button type='primary' style={{ width: '200px' }}>
                                    <Link to={`/balabala/add-order/${staffDetail.id}/${staffDetail.companyId}`}>创建订单</Link>
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Card>
        )
    }
}
export default StaffDisplay;