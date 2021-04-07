import React from 'react';
import { Table, Switch, Image,Tag, Select,Input } from 'antd';
import {Link} from 'react-router-dom';
import {getCaseStaffByCST} from '../../api/index';
import memoryUtils from '../../utils/memoryUtils';

const {Option} = Select;
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
const styleMap = {
    1:'欧式',2:'中式',3:'简约',4:'混搭',5:'其他'
}
const layoutMap = {
    0:'一居室',1:'二居室',2:'三居室',3:'四居室',4:'其他'
}
const typeMap = {
    0:'普通住宅',1:'复式别墅',2:'局部装修'
}


class CaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caseData:{},
            searchText:'',
            type:''
        };
    }

    columns = [
        {
            title: '案例ID',
            dataIndex: 'id',
            key: 'case_id',
        },
        {
            title: '展示',
            dataIndex: 'case_indexImg',
            key: 'show',
            render: show => (<Image src={show} alt='展示图片' style={{width:'90px' ,height:'50px'}} />)
        },
        {
            title: '案例标题',
            dataIndex: 'case_title',
            key: 'case_title',
        },
        {
            title: '特点',
            dataIndex: 'case_type',
            key: 'case_type',
            render: (text,row) => {
                return <>
                <Tag color='green'>{typeMap[row.case_type]}</Tag>
                <Tag color='pink'>{layoutMap[row.layout_id]}</Tag>
                <Tag color='blue'>{styleMap[row.style_id]}</Tag>
                </>
            }
        },
        {
            title: '发布者',
            dataIndex: 'staff_name',
            key: 'staff_name',
        },
        {
            title: '造价(￥)',
            dataIndex: 'case_budget',
            key: 'cost',
            render: text => (text+'').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        {
            title: '是否置顶',
            dataIndex: 'top',
            key: 'top',
            render: top => (<Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={top} />)
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <Link to={`/balabala/company-display/case/${record.id}`}>查看</Link>
            ),
          },
    ];
    
    async componentDidMount(){
        const companyId = parseInt(memoryUtils.company.id);
        this.getCaseData(1,companyId,'','');
    }
    getCaseData = async (pageNum,companyId,staffName,caseTitle) => {
        const result = await getCaseStaffByCST(pageNum,companyId,staffName,caseTitle);
        if(result.data && result.data.data){
            this.setState({caseData:result.data.data})
        }
    }
    onSearch = value => {
        const companyId = parseInt(memoryUtils.company.id);
        const {type} = this.state;
        if(type==='staffName'){
            this.getCaseData(1,companyId,value,'');
        }else{
            this.getCaseData(1,companyId,'',value);  
        }
        this.setState({searchText:value});
    }

    render() {
        const companyId = parseInt(memoryUtils.company.id);
        const {type,searchText,caseData} = this.state;
        return (
            <div>
                <Select 
                    placeholder="搜索类型" 
                    onChange={value => {this.setState({type:value})}}
                >
                    <Option value='staffName'>按客户名</Option>
                    <Option value='caseTitle'>按标题</Option>
                </Select>
                <Input.Search enterButton style={{width:'160px'}} placeholder="-请输入-" onSearch={this.onSearch}/>
                <Table
                    dataSource={caseData.list}
                    columns={this.columns}
                    pagination={{
                        total: caseData.total,
                        pageNum: caseData.pageNum,
                        pageSize: caseData.pageSize,
                        onChange: value => {
                            this.getCaseData(value,companyId,type==='staffName'?searchText:'',type==='caseTitle'?searchText:'')
                        }
                    }}
                />
            </div>
        )
    }
}
export default CaseList;