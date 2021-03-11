import React from 'react';
import { Table } from 'antd';

const dataSource = [
    {
        order_id: '112312312312',
        staff_name: '张三',
        customer_name: '李四',
        status: '已完成',
        commission:10000,
        end_date:'2021-03-10',
        rated:2
    },
    {
        order_id: '112312312312',
        staff_name: '张三',
        customer_name: '李四',
        status: '未完成',
        commission:10000,
        end_date:'2021-03-10',
        rated:2
    },
    {
        order_id: '112312312312',
        staff_name: '张三',
        customer_name: '李四',
        status: '已完成',
        commission:10000,
        end_date:'2021-03-10',
        rated:4
    },
    {
        order_id: '112312312312',
        staff_name: '张三',
        customer_name: '李四',
        status: '已完成',
        commission:10000,
        end_date:'2021-03-10',
        rated:3
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
        render:rated => {
            let text = '无';
            if(rated === 2){text = '好评';}
            else if(rated === 3){text = '中评';}
            else if(rated === 4){text = '差评';}
            else{text = '未评价';}
            return <span>{text}</span>
        }
    },
];

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        )
    }
}


export default CommentList;