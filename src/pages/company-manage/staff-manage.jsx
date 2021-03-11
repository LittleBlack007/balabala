import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import {Link} from 'react-router-dom';

const dataSource = [
    {
        staff_id: '112312312312',
        staff_avtar: 'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg',
        staff_name: '李四',
        staff_pet_name:'ppp',
        staff_phone:'1231231231',
        staff_kind:'设计师',

    },
    {
        staff_id: '112312312312',
        staff_avtar: 'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg',
        staff_name: '李四',
        staff_pet_name:'ppp',
        staff_phone:'1231231231',
        staff_kind:'设计师',
    },
    {
        staff_id: '112312312312',
        staff_avtar: 'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg',
        staff_name: '李四',
        staff_pet_name:'ppp',
        staff_phone:'1231231231',
        staff_kind:'设计师',
    },
    {
        staff_id: '112312312312',
        staff_avtar: 'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg',
        staff_name: '李四',
        staff_pet_name:'ppp',
        staff_phone:'1231231231',
        staff_kind:'设计师',
    }
];

const columns = [
    {
        title: '员工ID',
        dataIndex: 'staff_id',
        key: 'staff_id',
    },
    {
        title: '头像',
        dataIndex: 'staff_avtar',
        key: 'staff_avtar',
        render: show => (<img src={show} alt='展示图片' width={200} height={200} />)
    },
    {
        title: '名字',
        dataIndex: 'staff_name',
        key: 'staff_name',
    },
    {
        title: '用户名',
        dataIndex: 'staff_pet_name',
        key: 'staff_pet_name',
    },
    {
        title: '电话',
        dataIndex: 'staff_phone',
        key: 'staff_phone',
    },
    {
        title: '职位',
        dataIndex: 'staff_kind',
        key: 'staff_kind',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (<>
            <Link to='/balabala/company-display/case'>查看</Link>&nbsp;
            <Popconfirm 
                title="确定删除该员工吗？" 
                okText="确定" 
                cancelText="取消" 
                onConfirm={()=>console.log('ok')}
            >
                <Button type='link'>删除</Button>
            </Popconfirm>
        </>),
      },
];

class StaffManage extends React.Component {
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
                    pagination={{defaultPageSize:2,total:100}}
                />
            </div>
        )
    }
}
export default StaffManage;