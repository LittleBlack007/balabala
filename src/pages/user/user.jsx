import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Avatar, Row, Col, Card, Tooltip, Table, Modal, message } from 'antd';
import EditorUser from './editor-user';
import { EyeTwoTone } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';
import NewRated from './new-rated';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {getOrderUserStaffByUSTS,updateOrder,deleteOrder} from '../../api/index'
import moment from 'momnet';
import './index.less';

const colPhone = {
    xl: 24,
    ls: 24,
    sm: 24,
    lg: 24
}
const { Meta } = Card;

const dataSource = {
    design: [
        {
            work_content:'设计一个好看的设计稿',
            order_id: '11231231231a2',
            staff_name: '李四',
            staff_phone:'13232672652',
            work_address: '广东省吴川市巴拉巴拉村',
            status: '进行中',
            order_date:'2021-01-12',
            start_date:'2021-01-09',
            commission: 10000,
            rated:0
        },
        {
            work_content:'设计一个好看的设计稿',
            staff_phone:'13232672652',
            order_id: '11231231231d2',
            staff_name: '李四',
            work_address: '广东省吴川市巴拉巴拉村',
            status: '准备中',
            order_date:'2021-01-12',
            start_date:'2021-01-09',
            commission: 10000,
            rated:2
        },
        {
            work_content:'设计一个好看的设计稿',
            staff_phone:'13232672652',
            order_id: '112312312f312',
            staff_name: '李四',
            work_address: '广东省吴川市巴拉巴拉村',
            order_date:'2021-01-12',
            status: '准备中',
            commission: 10000,
            rated:0
        },
        {
            work_content:'设计一个好看的设计稿',
            staff_phone:'13232672652',
            order_id: '11231231h2312',
            staff_name: '李四',
            work_address: '广东省吴川市巴拉巴拉村',
            order_date:'2021-01-12',
            start_date:'2021-01-09',
            status: '准备中',
            commission: 10000,
            rated:0
        }
    ],
    work: [
        {
            work_content:'完成100平米的地板防水',
            order_id: '1123123j12311',
            staff_phone:'13232672652',
            staff_name: '梁工',
            status: '准备中',
            commission: 6666,
            //order_date:'2021-03-27',
            start_date:'2021-03-27',
            rated: 0
        },
        {
            work_content:'设计一个好看的设计稿',
            order_id: '1123123j12312',
            staff_phone:'13232672652',
            staff_name: '李四',
            status: '已完成',
            commission: 10000,
            order_date:'2021-01-12',
            start_date:'2021-01-09',
            rated: 2
        },
        {
            work_content:'设计一个好看的设计稿',
            staff_phone:'13232672652',
            order_id: '11231231k2312',
            staff_name: '李四',
            status: '已完成',
            start_date:'2021-01-09',
            commission: 10000,
            order_date:'2021-01-12',
            rated: 2
        },
        {
            work_content:'设计一个好看的设计稿',
            staff_phone:'13232672652',
            order_id: '1123123l12312',
            staff_name: '李四',
            status: '已完成',
            commission: 10000,
            order_date:'2021-01-12',
            start_date:'2021-01-09',
            rated: 4
        },
        {
            work_content:'设计一个好看的设计稿',
            staff_phone:'13232672652',
            order_id: '1123123p12312',
            staff_name: '李四',
            status: '已完成',
            commission: 10000,
            order_date:'2021-01-12',
            start_date:'2021-01-09',
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

class StaffCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabKey: 'incomplete',
            rated: null,
            orderData:{},
        };
    }

    logout = () => {
        Modal.confirm({
            content: '确定退出？',
            okText:'确定',
            cancelText:'取消',
            onOk: () => {
                storageUtils.removeUser();
                memoryUtils.user = {};
                this.props.history.replace('/');
            },
            onCancel: () => {}
        })
    }

    async componentDidMount(){
        const userId = parseInt(memoryUtils.user.id)
        //获取该用户未完成的订单
        this.getOrderData(1,userId,1);

    }
    getOrderData = async (pageNum,userId,orderStatus) => {
        const result = await getOrderUserStaffByUSTS(pageNum,userId,null,null,orderStatus);
        if(result.data && result.data.data){
            this.setState({orderData:result.data.data});
        }
    }
    onTabChange = (key, type) => {
        const userId = parseInt(memoryUtils.user.id)
        if(key === 'incomplete'){
            this.getOrderData(1,userId,1)
        }else{
            this.getOrderData(1,userId,2)
        }
        
        this.setState({ [type]: key });
        
    };



    render() {
        const user = memoryUtils.user;
        const userId = parseInt(user.id)
        const {activeTabKey} = this.state;
        if(!user.userStatus){
            return <Redirect to='/login/user'/>
        }
        return (
            <div>
                <div style={{ display: 'flex', marginBottom: '20px', height: '60px', backgroundColor: '#1DA57A', color: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>&nbsp;&nbsp;个人中心</span>
                    </div>
                    <div>
                        <Avatar size={48} src={memoryUtils.user.userImg} />&nbsp;&nbsp;&nbsp;
                        <span style={{fontSize:'18px'}}>{memoryUtils.user.userName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to='/' style={{ color: 'white' }}>平台首页</Link>
                        <EditorUser user={memoryUtils.user}/>
                        <Button type='link' onClick={this.logout} style={{color:'white'}}>
                            退出
                        </Button>
                    </div>
                </div>
                <Row gutter={24}>
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
                            {/* {this.state.activeTabKey === 'design' ? */}
                                <Table
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
                                            this.getOrderData(value,parseInt(user.id),this.state.activeTabKey==='complete'?2:1)
                                        }
                                    }}
                                >
                                    <Column title='订单ID' dataIndex='id' key='order_id' />
                                    <Column title='用户id' dataIndex='user_id' key='user_id' className='no-show'/>
                                    <Column title='员工id' dataIndex='staff_id' key='staff_id' className='no-show'/>
                                    <Column title='员工名字' dataIndex='staff_name' key='staff_name' />
                                    <Column title='联系电话' dataIndex='staff_phone' key='staff_phone' />
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
                                        ellipsis={true}
                                        render={text => moment(text).format('YYYY-MM-DD HH:mm:ss')}
                                    />
                                    {this.state.activeTabKey === 'incomplete'?
                                    <Column
                                        title='更新时间'
                                        dataIndex='order_update_time'
                                        key='order_date'
                                        ellipsis={true}
                                        render={text => moment(text).format('YYYY-MM-DD HH:mm:ss')}
                                    />:null}
                                    {this.state.activeTabKey === 'complete'
                                    ?<Column
                                        title='完成时间'
                                        dataIndex='order_end_time'
                                        key='order_end_date'
                                        ellipsis={true}
                                        render={text => moment(text).format('YYYY-MM-DD HH:mm:ss')}
                                    />:null}
                                    <Column
                                        width={100}
                                        title='工作内容'
                                        dataIndex='order_content'
                                        key='dwork_content'
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
                                        render={text => text ===1?'交付中':'准备中'}
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
                                                ?<NewRated 
                                                    staffId={record.staff_id} orderId={record.id} rateId={record.rateId}
                                                    getOrderData = {this.getOrderData} 
                                                />
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
                                                                        this.getOrderData(1,userId,activeTabKey==='complete'?2:1)
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
                                                    <Button 
                                                        type='link' 
                                                        onClick={()=>{
                                                                Modal.confirm({
                                                                    content: '确定完成？',
                                                                    okText:'确定',
                                                                    cancelText:'取消',
                                                                    onOk: async () => {
                                                                        const result = await updateOrder({id:record.id,orderStatus:2,orderEndTime:moment().format("YYYY-MM-DD HH:mm:ss")})
                                                                        if(result.data && result.data.data ===1){
                                                                            message.success('成功')
                                                                            this.getOrderData(1,userId,activeTabKey==='complete'?2:1)
                                                                        }else{
                                                                            message.success('失败')
                                                                        }
                                                                    },
                                                                    onCancel: () => {}
                                                                })
                                                        }} 
                                                    >
                                                        确定完成
                                                    </Button>
                                                </>
                                            }
                                        </>)}
                                    />
                                </Table>
                                {/*:
                                <Table
                                    rowKey={(record) => {
                                        return (record.order_id || record.dorder_id + Date.now()) //在这里加上一个时间戳就可以了
                                    }}
                                    dataSource={dataSource[this.state.activeTabKey]}
                                //columns={columns[this.state.activeTabKey]}
                                // pagination={{ defaultPageSize: 2, total: 100 }}
                                >
                                    <Column title='订单ID' dataIndex='order_id' key='dorder_id' />
                                    <Column title='设计者名字' dataIndex='staff_name' key='dstaff_name' />
                                    <Column title='设计者电话' dataIndex='staff_phone' key='staff_phone' />
                                    <Column title='当前状态' dataIndex='status' key='dstatus'/>
                                    <Column
                                        title='佣金(￥)'
                                        dataIndex='commission'
                                        key='dcommission'
                                    />
                                    <Column
                                        title='开始时间'
                                        dataIndex='start_date'
                                        key='start_date'
                                    />
                                    <Column
                                        title='更新时间'
                                        dataIndex='order_date'
                                        key='dorder_date'
                                    />
                                    <Column title='评价' dataIndex='rated' key='rated'
                                        render = {(rated) => {
                                            let text = '无';
                                            if (rated === 2) {text = '好评'; }
                                            else if (rated === 3) {text = '中评'; }
                                            else if (rated === 4) {text = '差评'; }
                                            else {text = '未评价'; }
                                            return <span>{text}</span>
                                        }}
                                    />
                                    <Column
                                        title='工作内容'
                                        dataIndex='work_content'
                                        key='work_content'
                                        render={text => {
                                            return (<Tooltip title={text}><EyeTwoTone /></Tooltip>)
                                        }
                                        }
                                    />
                                    <Column
                                        title='操作'
                                        key='action'
                                        render={(text, record) => ([
                                            <Button type='link' onClick={() => console.log(record.dorder_id)} disabled={record.status === '进行中' ? true : false}>取消订单</Button>,
                                            <Button type='link' onClick={() => console.log(record.dorder_id)} >确定完成</Button>,
                                            <NewRated order_id={record.order_id} disabled={record.rated===0?false:true} />
                                        ])}
                                    />
                                </Table>
                            }*/}
                        </Card>
                </Row>
            </div>
        )
    }
}
export default StaffCenter;