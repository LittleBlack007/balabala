import React from 'react';
import { Table, Button, Popconfirm, Input, Card, message } from 'antd';
import {Link} from 'react-router-dom';
import {getStaffByCompanyIdStaffName,deleteStaff,getKindNoPage} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils';
import moment from 'moment';
import Avatar from 'antd/lib/avatar/avatar';

const dataSource = [
    {
        staff_id: '112312312312',
        staff_avtar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3427525504,764883345&fm=26&gp=0.jpg',
        staff_name: '梁工',
        staff_pet_name:'ppp',
        staff_phone:'1231231231',
        staff_kind:'防水工',

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



class StaffManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staffData:{},
            staffName:'',
            kindList:[],
        };
    }
    columns = [
        {
            title: '员工ID',
            dataIndex: 'id',
            key: 'staff_id',
        },
        {
            title: '头像',
            dataIndex: 'staffImg',
            key: 'staff_avtar',
            render: show => (<Avatar src={show} alt='图片' />)
        },
        {
            title: '名字',
            dataIndex: 'staffName',
            key: 'staff_name',
        },
        {
            title: '用户名',
            dataIndex: 'staffPetName',
            key: 'staff_pet_name',
        },
        {
            title: '电话',
            dataIndex: 'staffPhone',
            key: 'staff_phone',
        },
        {
            title: '职位',
            dataIndex: 'kindId',
            key: 'staff_kind',
            render: text =>{
                const show = this.state.kindList.find(item => {return item.id === text})
                if(show){
                    return show.kindName
                }
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (<>
                <Link to={`/balabala/staff/${record.id}`}>查看</Link>&nbsp;
                <Popconfirm 
                    title="确定删除该员工吗？" 
                    okText="确定" 
                    cancelText="取消" 
                    onConfirm={async()=>{
                        const result = await deleteStaff(record.id)
                        if(result.data && result.data.data ===1){
                            message.success("成功")
                            this.getStaffData(1,parseInt(memoryUtils.company.id),this.state.staffName)
                        }else{
                            message.error("失败")
                        }
                    }}
                >
                    <Button type='link'>删除</Button>
                </Popconfirm>
            </>),
          },
    ];

    async componentDidMount(){
        const companyId = parseInt(memoryUtils.company.id)
        this.getStaffData(1,companyId,this.state.staffName)
        this.getKind();
    }
    getKind = async() =>{
        const result = await getKindNoPage();
        if(result.data && result.data.data){
            this.setState({kindList:result.data.data});
        }
    }
    getStaffData = async (pageNum,companyId,staffName) => {
        const result = await getStaffByCompanyIdStaffName(pageNum,companyId,staffName);
        if(result.data && result.data.data){
            this.setState({staffData:result.data.data});
        }
    }

    render() {
        const companyId = parseInt(memoryUtils.company.id);
        const {staffName,staffData} = this.state;
        return (
            
            <div>
                <Input.Search enterButton style={{width:'160px',marginBottom:'20px'}} placeholder="输入员工名字"
                    onSearch={value => {
                        this.getStaffData(1,companyId,value);
                        this.setState({staffName:value})
                    }}
                />
                <Table
                    dataSource={staffData.list}
                    columns={this.columns}
                    pagination={{
                        total:staffData.total,
                        pageNum:staffData.pageNum,
                        pageSize:staffData.pageSize,
                        onChange:value => {
                            this.getStaffData(value,companyId,staffName);
                        }
                    }}
                />
            </div>
        )
    }
}
export default StaffManage;