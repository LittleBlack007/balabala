import React from 'react';
import { Table, Button, Popconfirm, message, Tooltip, Card, Switch, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { getOrderUserStaffByUSTS, updateOrder } from '../../api/index';
import { EyeTwoTone } from '@ant-design/icons'
import memoryUtils from '../../utils/memoryUtils';
import moment from 'momnet';
import NewRated from '../user/new-rated';

const { confirm } = Modal
const { Column } = Table
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
const dataSource = [
    {
        order_id: '112312312312',
        staff_name: '张三',
        customer_name: '李四',
        status: '已完成',
        commission: 10000,
        end_date: '2021-03-10',
        rated: 2
    },
    {
        order_id: '112312312312',
        staff_name: '张三',
        customer_name: '李四',
        status: '未完成',
        commission: 10000,
        end_date: '2021-03-10',
        rated: 2
    },
    {
        order_id: '112312312312',
        staff_name: '张三',
        customer_name: '李四',
        status: '已完成',
        commission: 10000,
        end_date: '2021-03-10',
        rated: 4
    },
    {
        order_id: '112312312312',
        staff_name: '张三',
        customer_name: '李四',
        status: '已完成',
        commission: 10000,
        end_date: '2021-03-10',
        rated: 3
    }
];

const columns = [
    {
        title: '订单ID',
        dataIndex: 'order_id',
        key: 'order_id',
    },
    {
        title: '员工名字',
        dataIndex: 'staff_name',
        key: 'staff_name',
    },
    {
        title: '业主名字',
        dataIndex: 'customer_name',
        key: 'customer_name',
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
];

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabKey: 'incomplete',
            orderData: {},
        };
    }

    async componentDidMount() {
        const companyId = parseInt(memoryUtils.company.id)
        this.getOrderData(1, companyId, 1)
    }
    getOrderData = async (pageNum, companyId, orderStatus) => {
        const result = await getOrderUserStaffByUSTS(pageNum, null, null, null, orderStatus, null, companyId);
        if (result.data && result.data.data) {
            this.setState({ orderData: result.data.data });
        }
    }
    onTabChange = (key, type) => {
        const companyId = parseInt(memoryUtils.company.id)
        if (key === 'incomplete') {
            this.getOrderData(1, companyId, 1)
        } else {
            this.getOrderData(1, companyId, 2)
        }
        this.setState({ [type]: key });
    };

    render() {
        const { activeTabKey } = this.state;
        const companyId = parseInt(memoryUtils.company.id)
        return (
            <Card
                style={{ width: '100%' }}
                // extra={<a href="#">More</a>}
                tabList={tabList}
                activeTabKey={this.state.activeTabKey}
                onTabChange={key => {
                    this.onTabChange(key, 'activeTabKey');
                }}
            >
                <Table
                    style={{ width: '100%' }}
                    rowKey={(record) => {
                        return (record.id || record.id + Date.now()) //在这里加上一个时间戳就可以了
                    }}
                    dataSource={this.state.orderData.list}
                    //columns={columns[this.state.activeTabKey]}
                    pagination={{
                        total: this.state.orderData.total,
                        pageNum: this.state.orderData.pageNum,
                        pageSize: this.state.orderData.pageSize,
                        onChange: value => {
                            this.getOrderData(value, companyId, this.state.activeTabKey === 'complete' ? 2 : 1)
                        }
                    }}
                >
                    <Column title='订单ID' dataIndex='id' key='order_id' />
                    <Column title='用户id' dataIndex='user_id' key='user_id' className='no-show' />
                    <Column title='员工id' dataIndex='staff_id' key='staff_id' className='no-show' />
                    <Column title='用户名' dataIndex='user_name' key='user_name' />
                    <Column title='员工名' dataIndex='staff_name' key='staff_name' />
                    <Column title='用户电话' dataIndex='user_phone' key='user_phone' />
                    <Column
                        title='佣金(￥)'
                        dataIndex='order_commission'
                        key='commission'
                        render={text => `${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                    <Column
                        title='创建时间'
                        dataIndex='order_create_time'
                        key='start_date'
                        //ellipsis={true}
                        render={text => moment(text).format('YYYY-MM-DD HH:mm:ss')}
                    />
                    {this.state.activeTabKey === 'incomplete' ?
                        <Column
                            title='更新时间'
                            dataIndex='order_update_time'
                            key='order_date'
                            //ellipsis={true}
                            render={text => moment(text).format('YYYY-MM-DD HH:mm:ss')}
                        /> : null}
                    {this.state.activeTabKey === 'complete'
                        ? <Column
                            title='完成时间'
                            dataIndex='order_end_time'
                            key='order_end_date'
                            //ellipsis={true}
                            render={text => moment(text).format('YYYY-MM-DD HH:mm:ss')}
                        /> : null}
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
                    {this.state.activeTabKey === 'complete' ?
                        <Column title='评价' dataIndex='rate_grade' key='rated'
                            render={(rated) => {
                                let text = '无';
                                if (rated === 1) { text = '好评'; }
                                else if (rated === 2) { text = '中评'; }
                                else if (rated === 3) { text = '差评'; }
                                else { text = '未评价'; }
                                return <span>{text}</span>
                            }}
                        /> : null}
                    {this.state.activeTabKey === 'complete' ?
                    <Column
                        title='操作'
                        key='daction'
                        render={(text, record) => (<>
                            {this.state.activeTabKey === 'complete'
                                ? <NewRated rateId={record.rateId} type='staff' />
                                :null}
                        </>)}
                    />:null}

                </Table>
            </Card>
        )
    }
}


export default CommentList;
