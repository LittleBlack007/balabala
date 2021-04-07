import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Avatar, Row, Col, Card, Statistic, Tooltip, Table, 
    Switch, Pagination, Collapse, Comment, List, Modal,message } from 'antd';
import moment from 'momnet';
import {EyeTwoTone} from '@ant-design/icons'
import AddCaseForm from './add-case-form';
import EditorStaff from './editor-staff';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {updateOrder,getOrderUserStaffByUSTS,deleteOrder,getStaffRevenue,getStaffTotalOrderNum,
    getCaseByStaffId} from '../../api/index';
import NewRated from '../user/new-rated';

const { Panel } = Collapse;
const {Column} = Table
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
const colPhone = {
    xl: 24,
    ls: 24,
    sm: 24,
    lg: 24
}
const { Meta } = Card;

const dataSource = {
    doing: [
        {
            order_id: '11231231231a2',
            customer_phone:'13232672652',
            customer_name: '李四',
            work_address: '广东省吴川市巴拉巴拉村',
            status: '进行中',
            commission: 10000,
        },
        {
            order_id: '11231231231d2',
            customer_phone:'13232672652',
            customer_name: '李四',
            work_address: '广东省吴川市巴拉巴拉村',
            status: '准备中',
            commission: 10000,
        },
        {
            order_id: '112312312f312',
            customer_phone:'13232672652',
            customer_name: '李四',
            work_address: '广东省吴川市巴拉巴拉村',
            status: '准备中',
            commission: 10000,
        },
        {
            order_id: '11231231h2312',
            customer_phone:'13232672652',
            customer_name: '李四',
            work_address: '广东省吴川市巴拉巴拉村',
            status: '准备中',
            commission: 10000,
        }
    ],
    finish: [
        {
            order_id: '1123123j12312',
            customer_phone:'13232672652',
            customer_name: '李四',
            status: '已完成',
            commission: 10000,
            end_date: '2021-03-10',
            rated: 2
        },
        {
            order_id: '11231231k2312',
            customer_phone:'13232672652',
            customer_name: '李四',
            status: '已完成',
            commission: 10000,
            end_date: '2021-03-10',
            rated: 2
        },
        {
            order_id: '1123123l12312',
            customer_phone:'13232672652',
            customer_name: '李四',
            status: '已完成',
            commission: 10000,
            end_date: '2021-03-10',
            rated: 4
        },
        {
            order_id: '1123123p12312',
            customer_phone:'13232672652',
            customer_name: '李四',
            status: '已完成',
            commission: 10000,
            end_date: '2021-03-10',
            rated: 3
        }
    ]
}
const tabList = [
    {
        key: 'incomplete',
        tab: '未完成',
    },
    {
        key: 'complete',
        tab: '已完成',
    },
];
const columns = {
    doing: [
        {
            title: '订单ID',
            dataIndex: 'order_id',
            key: 'dorder_id',
        },
        {
            title: '业主名字',
            dataIndex: 'customer_name',
            key: 'dcustomer_name',
        },
        {
            title: '业主电话',
            dataIndex: 'customer_phone',
            key: 'customer_phone',
        },
        {
            title: '工作地点',
            dataIndex: 'work_address',
            key: 'dwork_address',
        },
        {
            title: '当前状态',
            dataIndex: 'status',
            key: 'dstatus',
            render: text => (<Switch checkedChildren="进行中" unCheckedChildren="准备中" defaultChecked={text === '进行中' ? true : false} onChange={checked => console.log(checked)} />)
        },
        {
            title: '佣金(￥)',
            dataIndex: 'commission',
            key: 'dcommission',
        },
        {
            title: '操作',
            key: 'daction',
            render: (text, record) => (<Button type='link' onClick={() => console.log(record.dorder_id)}>删除订单</Button>)
        }
    ],
    finish: [
        {
            title: '订单ID',
            dataIndex: 'order_id',
            key: 'order_id',
        },
        {
            title: '业主名字',
            dataIndex: 'customer_name',
            key: 'customer_name',
        },
        {
            title: '业主电话',
            dataIndex: 'customer_phone',
            key: 'customer_phone',
        },
        {
            title: '当前状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '佣金(￥)',
            dataIndex: 'commission',
            key: 'commission',
        },
        {
            title: '完成时间',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        {
            title: '评价',
            dataIndex: 'rated',
            key: 'rated',
            render: rated => {
                let text = '无';
                if (rated === 2) { text = '好评'; }
                else if (rated === 3) { text = '中评'; }
                else if (rated === 4) { text = '差评'; }
                else { text = '未评价'; }
                return <span>{text}</span>
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (<AddCaseForm buttonName='提交案例' />)

        }
    ]
}

const data = [
    {
        actions: [<span key="comment-list-reply-to-0">差评</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <><p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
                
            </p>
            <img src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' style={{width:'100px',height:'100px'}}  alt='图片'/>&nbsp;
            <img src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' style={{width:'100px',height:'100px'}}  alt='图片'/>
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
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
];

class StaffCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caseData:{},
            orderData:{},
            revenue:'',
            orderNum:'',
            activeTabKey: 'incomplete'
        };
    }
    async componentDidMount(){
        const staffId = parseInt(memoryUtils.staff.id)
        //获取该用户未完成的订单
        this.getOrderData(1,staffId,1);
        this.getStaffRO(staffId);
        this.getCaseData(1,staffId);
    }
    getCaseData = async (pageNum,staffId) => {
        const result = await getCaseByStaffId(pageNum,staffId);
        if(result.data && result.data.data){
            this.setState({caseData:result.data.data})
        }
    } 
    getStaffRO = async (staffId) => {
        const r = await getStaffRevenue(staffId);
        const n = await getStaffTotalOrderNum(staffId);
        if(r.data && n.data && r.data.data && n.data.data){
            this.setState({revenue:r.data.data,orderNum:n.data.data})
        }
    }
    getOrderData = async (pageNum,staffId,orderStatus) => {
        const result = await getOrderUserStaffByUSTS(pageNum,null,staffId,null,orderStatus);
        if(result.data && result.data.data){
            this.setState({orderData:result.data.data});
        }
    }

    onTabChange = (key, type) => {
        const staffId = parseInt(memoryUtils.staff.id)
        if(key === 'incomplete'){
            this.getOrderData(1,staffId,1)
        }else{
            this.getOrderData(1,staffId,2)
        }
        this.setState({ [type]: key });
    };

    logout = () => {
        Modal.confirm({
            content: '确定退出？',
            okText:'确定',
            cancelText:'取消',
            onOk: () => {
                storageUtils.removeStaff();
                memoryUtils.staff = {};
                this.props.history.replace('/');
            },
            onCancel: () => {}
        })
    }



    render() {
        const staff = memoryUtils.staff;
        if(!staff.staffStatus){
            return <Redirect to={"/login/staff"} />
        }
        const staffId= parseInt(staff.id)
        const {activeTabKey,revenue,orderNum} = this.state
        return (
            <div>
                <div style={{ display: 'flex', marginBottom: '20px', height: '60px', backgroundColor: '#1DA57A', color: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>&nbsp;&nbsp;员工中心</span>
                    </div>
                    <div>
                        <Link to='/' style={{ color: 'white' }}>平台首页</Link>
                        <Button type='link' onClick={this.logout} style={{ color: 'white' }}>
                            退出
                        </Button>
                    </div>
                </div>
                <Row gutter={24}>
                    <Col {...colPhone} xl={6}>
                        <Card
                            actions={[
                                <AddCaseForm buttonName='创建案例' history={this.props.history} />,
                                <EditorStaff />, //编辑员工信息
                            ]}
                        >
                            <Meta
                                avatar={<Avatar size={64} src={staff.staffImg} />}
                                title={staff.staffName}
                                description={staff.staffProfile}
                            />
                        </Card>
                        <Card style={{ marginTop: '20px',backgroundColor:'#FFA58B' }}>
                            <Statistic title="订单总收入(￥)" value={revenue} precision={2} />
                        </Card>
                        <Card style={{ marginTop: '20px',backgroundColor:'#A1B2A8' }}>
                            <Statistic title="订单数" value={orderNum} precision={0} />
                        </Card>
                    </Col>
                    <Col {...colPhone} xl={18}>
                        <Card
                            style={{ width: '100%' }}
                            title="我的订单"
                            // extra={<a href="#">More</a>}
                            tabList={tabList}
                            activeTabKey={this.state.activeTabKey}
                            onTabChange={key => {
                                this.onTabChange(key, 'activeTabKey');
                            }}
                        >
                            <Table
                                style ={{width:'100%'}}
                                rowKey={(record) => {
                                    return (record.id || record.id + Date.now()) //在这里加上一个时间戳就可以了
                                }}
                                dataSource={this.state.orderData.list}
                                //columns={columns[this.state.activeTabKey]}
                                pagination={{ 
                                    total:this.state.orderData.total,
                                    pageNum:this.state.orderData.pageNum,
                                    pageSize:this.state.orderData.pageSize,
                                    onChange: value => {
                                        this.getOrderData(value,parseInt(staff.id),this.state.activeTabKey==='complete'?2:1)
                                    }
                                }}
                                >
                                    <Column title='订单ID' dataIndex='id' key='order_id' />
                                    <Column title='用户id' dataIndex='user_id' key='user_id' className='no-show'/>
                                    <Column title='员工id' dataIndex='staff_id' key='staff_id' className='no-show'/>
                                    <Column title='用户名' dataIndex='user_name' key='staff_name' />
                                    <Column title='联系电话' dataIndex='user_phone' key='user_phone'/>
                                    <Column
                                        title='佣金(￥)'
                                        dataIndex='order_commission'
                                        key='commission'
                                        render = {text => `${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                    <Column
                                        title='创建时间'
                                        dataIndex='order_create_time'
                                        key='start_date'
                                        //ellipsis={true}
                                        render={text => moment(text).format('YYYY-MM-DD HH:mm:ss')}
                                    />
                                    {this.state.activeTabKey === 'incomplete'?
                                    <Column
                                        title='更新时间'
                                        dataIndex='order_update_time'
                                        key='order_date'
                                        //ellipsis={true}
                                        render={text => moment(text).format('YYYY-MM-DD HH:mm:ss')}
                                    />:null}
                                    {this.state.activeTabKey === 'complete'
                                    ?<Column
                                        title='完成时间'
                                        dataIndex='order_end_time'
                                        key='order_end_date'
                                        //ellipsis={true}
                                        render={text => moment(text).format('YYYY-MM-DD HH:mm:ss')}
                                    />:null}
                                    <Column
                                        //width={100}
                                        title='工作内容'
                                        dataIndex='order_content'
                                        key='dwork_content'
                                        render={text => {
                                            return (<Tooltip title={text}><EyeTwoTone /></Tooltip>)
                                        }}
                                    />
                                    <Column
                                        //width={100}
                                        title='工作地点'
                                        dataIndex='order_address'
                                        key='dwork_address'
                                        render={text => {
                                            return (<Tooltip title={text}><EyeTwoTone /></Tooltip>)
                                        }}
                                    />
                                    {this.state.activeTabKey === 'incomplete'? 
                                    <Column
                                        width={100}
                                        title='订单状态'
                                        dataIndex='order_status'
                                        key='dwork_status'
                                        render={(text,row) => (
                                            <Switch 
                                                checkedChildren="交付中" 
                                                unCheckedChildren="准备中" 
                                                defaultChecked={text === 1 } 
                                                onChange={async checked => {
                                                    if(checked){
                                                        const result = await updateOrder({id:row.id,orderStatus:1,orderUpdateTime:moment().format("YYYY-MM-DD HH:mm:ss")});
                                                        if(result.data && result.data.data ===1){
                                                            message.success('成功')
                                                            this.getOrderData(1,staffId,activeTabKey==='complete'?2:1)
                                                        }else{
                                                            message.error('失败')
                                                        }
                                                    }else{
                                                        const result = await updateOrder({id:row.id,orderStatus:0,orderUpdateTime:moment().format("YYYY-MM-DD HH:mm:ss")});
                                                        if(result.data && result.data.data ===1){
                                                            message.success('成功')
                                                            this.getOrderData(1,staffId,activeTabKey==='complete'?2:1)
                                                        }else{
                                                            message.error('失败')
                                                        }
                                                    }
                                                }} 
                                            />
                                        )}
                                    />:null}
                                    {this.state.activeTabKey === 'complete'?
                                    <Column title='评价' dataIndex='rate_grade' key='rated'
                                        render = {(rated) => {
                                            let text = '无';
                                            if (rated === 1) {text = '好评'; }
                                            else if (rated === 2) {text = '中评'; }
                                            else if (rated === 3) {text = '差评'; }
                                            else {text = '未评价'; }
                                            return <span>{text}</span>
                                        }}
                                    />:null}
                                    <Column
                                        title='操作'
                                        key='daction'
                                        render={(text, record) => (<>
                                            {this.state.activeTabKey === 'complete'
                                                ?<NewRated rateId={record.rateId} type='staff'  />
                                                :<>
                                                    <Button 
                                                        type='link' 
                                                        onClick={() => {
                                                            Modal.confirm({
                                                                content: '确定取消？',
                                                                okText:'确定',
                                                                cancelText:'取消',
                                                                onOk: async () => {
                                                                    const result = await deleteOrder(record.id)
                                                                    if(result.data && result.data.data ===1){
                                                                        message.success('成功取消')
                                                                        this.getOrderData(1,staffId,activeTabKey==='complete'?2:1)
                                                                    }else{
                                                                        message.success('取消失败')
                                                                    }
                                                                },
                                                                onCancel: () => {}
                                                            })
                                                        }} 
                                                        disabled={record.order_status === 1}>
                                                            取消订单
                                                    </Button>
                                                </>
                                            }
                                        </>)}
                                    />
                                </Table>
                        </Card>
                    </Col>
                </Row>
                <Collapse defaultActiveKey={['2']}  style={{margin:'20px 20px'}}>
                    {/* <Panel header="业主评价" key="1">
                    <List
                    className="comment-list"
                    header={`${data.length} 条评价`}
                    itemLayout="horizontal"
                    dataSource={data}
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
                />
                    </Panel> */}
                    <Panel header="个人案例" key="2">
                        <Row gutter={16}>
                            {this.state.caseData.list && this.state.caseData.list.length > 0?
                                this.state.caseData.list.map(item => (
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
                                                            <span> 预算{item.caseBudget} | 面积 {item.caseArea}m<sup>2</sup></span>
                                                        </div>
                                                    }
                                                />
                                            </Card>
                                        </Col>
                                    </Link>
                                )):'暂无案例'
                            }
                        </Row>
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <Pagination 
                                hideOnSinglePage 
                                total={this.state.caseData.total}
                                //pageSize={this.state.caseData.pageSize} 
                                pageNum={this.state.caseData.pageNum}
                                onChange={value => {
                                    this.getCaseData(value,staffId)
                                }} 
                            />
                        </div>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}
export default StaffCenter;