import React from 'react';
import { Table, Switch } from 'antd';
import {Link} from 'react-router-dom';

const dataSource = [
    {
        case_id: '112312312312',
        show: 'https://tgi13.jia.com/125/007/25007599.jpg',
        case_title: '已完成',
        staff_name:10000,
        case_type:'普通住宅',
        top:1,
        cost:2
    },
    {
        case_id: '112312312312',
        show: 'https://tgi1.jia.com/124/997/24997310.jpg',
        case_title: '已完成',
        staff_name:10000,
        case_type:'普通住宅',
        top:0,
        cost:2
    },
    {
        case_id: '112312312312',
        show: 'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg',
        case_title: '已完成',
        staff_name:10000,
        case_type:'普通住宅',
        top:1,
        cost:2
    },
    {
        case_id: '112312312312',
        show: 'http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg',
        case_title: '已完成',
        staff_name:10000,
        case_type:'普通住宅',
        top:0,
        cost:2
    }
];

const columns = [
    {
        title: '案例ID',
        dataIndex: 'case_id',
        key: 'case_id',
    },
    {
        title: '展示',
        dataIndex: 'show',
        key: 'show',
        render: show => (<img src={show} alt='展示图片' style={{width:'200px' ,height:'120px'}} />)
    },
    {
        title: '案例标题',
        dataIndex: 'case_title',
        key: 'case_title',
    },
    {
        title: '房型',
        dataIndex: 'case_type',
        key: 'case_type',
    },
    {
        title: '所有者',
        dataIndex: 'staff_name',
        key: 'staff_name',
    },
    {
        title: '是否置顶',
        dataIndex: 'top',
        key: 'top',
        render: top => (<Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={top} />)
    },
    {
        title: '造价/工价(￥)',
        dataIndex: 'cost',
        key: 'cost',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Link to='/balabala/company-display/case'>查看</Link>
        ),
      },
];

class CaseList extends React.Component {
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
export default CaseList;