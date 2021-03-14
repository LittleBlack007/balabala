import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Avatar, Row, Col, Card, Tooltip, Select, Table, Switch, Popconfirm, Radio } from 'antd';
import EditorUser from './editor-user';
import { EyeInvisibleTwoTone } from '@ant-design/icons';
import Column from 'antd/lib/table/Column';
import NewRated from './new-rated';

const { Option } = Select;
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
            work_address: '广东省吴川市巴拉巴拉村',
            status: '进行中',
            order_date:'2021-01-12',
            start_date:'2021-01-09',
            commission: 10000,
            rated:0
        },
        {
            work_content:'设计一个好看的设计稿',
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
            work_content:'设计一个好看的设计稿',
            order_id: '1123123j12312',
            staff_name: '李四',
            status: '已完成',
            commission: 10000,
            order_date:'2021-01-12',
            start_date:'2021-01-09',
            rated: 2
        },
        {
            work_content:'设计一个好看的设计稿',
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
        key: 'design',
        tab: '设计类订单',
    },
    {
        key: 'work',
        tab: '施工类订单',
    },
];

class StaffCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabKey: 'design',
            rated: null
        };
    }

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };



    render() {
        return (
            <div>
                <div style={{ display: 'flex', marginBottom: '20px', height: '60px', backgroundColor: '#1DA57A', color: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>&nbsp;&nbsp;个人中心</span>
                    </div>
                    <div>
                        <Link to='/' style={{ color: 'white' }}>平台首页</Link>
                        <Button type='link' onClick={this.logOut}>
                            <Link to='/' style={{ color: 'white' }}>退出</Link>
                        </Button>
                    </div>
                </div>
                <Row gutter={24}>
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
                            {this.state.activeTabKey === 'design' ?
                                <Table
                                    rowKey={(record) => {
                                        return (record.order_id || record.dorder_id + Date.now()) //在这里加上一个时间戳就可以了
                                    }}
                                    dataSource={dataSource[this.state.activeTabKey]}
                                //columns={columns[this.state.activeTabKey]}
                                // pagination={{ defaultPageSize: 2, total: 100 }}
                                >
                                    <Column title='订单ID' dataIndex='order_id' key='order_id' />
                                    <Column title='设计者名字' dataIndex='staff_name' key='staff_name' />
                                    <Column title='当前状态' dataIndex='status' key='status'/>
                                    <Column
                                        title='佣金(￥)'
                                        dataIndex='commission'
                                        key='commission'
                                    />
                                    <Column
                                        title='创建时间'
                                        dataIndex='start_date'
                                        key='start_date'
                                    />
                                    <Column
                                        title='更新时间'
                                        dataIndex='order_date'
                                        key='order_date'
                                    />
                                    <Column
                                        title='工作内容'
                                        dataIndex='work_content'
                                        key='dwork_content'
                                        render={text => {
                                            return (<Tooltip title={text}><EyeInvisibleTwoTone /></Tooltip>)
                                        }}
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
                                        title='操作'
                                        key='daction'
                                        render={(text, record) => ([
                                            <Button type='link' onClick={(record) => console.log(record)} disabled={record.status === '进行中' ? true : false}>取消订单</Button>,
                                            <Button type='link' onClick={() => console.log(record.dorder_id)} >查看设计</Button>,
                                            <Button type='link' onClick={() => console.log(record)} >确定完成</Button>,
                                            <NewRated order_id={record.order_id} disabled={record.rated===0?false:true} />
                                        ])}
                                    />
                                </Table>
                                :
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
                                            return (<Tooltip title={text}><EyeInvisibleTwoTone /></Tooltip>)
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
                            }
                        </Card>
                    </Col>
                    <Col {...colPhone} xl={6}>
                        <Card
                            actions={[
                                <EditorUser />,
                            ]}
                        >
                            <Meta
                                avatar={<Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title="王巴拉"
                                description={<div><p>用户名：wangbala</p>电话：123123123123</div>}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default StaffCenter;