import React from 'react';
import { Card, Select, Pagination, Rate, Row, Col, Carousel, Input } from 'antd';
import { Link } from 'react-router-dom';
import HD1 from '../../assets/images/huodong1.jpg';
import HD2 from '../../assets/images/huodong2.jpg';
import HD3 from '../../assets/images/huodong3.jpg';
import {getAdvertisements,getGoddCompany,getCompany,getGoodStaff,getKindNoPage} from '../../api/index';


const contentStyle ={height:362,width:'100%'}
const { Option } = Select;
const { Meta } = Card;
const data = [
    { name: '巧妙装修', rate: 5, rateTotal: 9999 },
    { name: '工匠大师', rate: 4.5, rateTotal: 8999 },
    { name: '极度设计', rate: 4.0, rateTotal: 7999 },
    { name: '精装装饰', rate: 3.5, rateTotal: 6999 },
    { name: '超级施工', rate: 3.5, rateTotal: 5999 },
    { name: '小马施工', rate: 3.5, rateTotal: 4999 },
    { name: '蚂蚁建房', rate: 3, rateTotal: 3999 },
    { name: '蜜蜂基建', rate: 2.5, rateTotal: 2999 },
]

const data1 = [
    { name: '张三', rate: 5, rateTotal: 99 },
    { name: '李师', rate: 4.5, rateTotal: 89 },
    { name: '王屋', rate: 4.0, rateTotal: 79 },
    { name: '陈建', rate: 3.5, rateTotal: 69 },
]

const data2 = [
    { name: '郑居', rate: 3.5, rateTotal: 59 },
    { name: '李超', rate: 3.5, rateTotal: 49 },
    { name: '孙峰', rate: 3, rateTotal: 39 },
    { name: '梁工', rate: 2.5, rateTotal: 29 },
]



class Balabala extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ad:[],
            companyType:'order',
            staffType:'order',
            companyListData:null,
            staffListData:null,
            companyName:'',
            staffCity:'',
            companySearchType:'',
            kindList:[],
            staffKind:null,
            staffSearchText:'',
            staffSearchType:'',
        };
    }

    async componentDidMount(){
        this.getAd();
        this.getGoodCompanyList();
        this.getGoodStaffList()
        this.getKind();
    }
    getKind= async() =>{
        const result = await getKindNoPage();
        if(result.data && result.data.data){
            this.setState({kindList:result.data.data})
        }
    }
    getAd = async () => {
        const result = await getAdvertisements();
        this.setState({ad:result.data.data.list})
    } 
    getGoodCompanyList = async ()=> {
        const result = await getGoddCompany();
        this.setState({companyListData:result.data.data})
    }
    getGoodStaffList = async ()=> {
        const result = await getGoodStaff();
        this.setState({staffListData:result.data.data})
    }
    getCompanyList = async ()=> {
        const result = await getCompany();
        this.setState({companyListData:result.data.data})
    }
    onCompanyChange =async value => {
        if(value === 'order'){
            const result = await getGoddCompany();
            this.setState({companyListData:result.data.data,companyType:'order'})
        }else{
            const result = await getGoddCompany(1,1);
            this.setState({companyListData:result.data.data,companyType:'rated'})
        }
    }
    onStaffChange =async value => {
        const {staffSearchText,staffSearchType,staffKind} = this.state;
        if(value === 'order'){
            const result = await getGoodStaff(1,null,staffSearchType==='staffCity'?staffSearchText:'',staffKind,staffSearchType==='staffName'?staffSearchText:'')
            this.setState({staffListData:result.data.data,staffType:'order'})
        }else{
            const result = await getGoodStaff(1,1,staffSearchType==='staffCity'?staffSearchText:'',staffKind,staffSearchType==='staffName'?staffSearchText:'')
            this.setState({staffListData:result.data.data,staffType:'rated'})
        }
    }
    onCompanySearch= async value => {
        const {companyType} = this.state;
        if(companyType=== 'order'){
            const result = await getGoddCompany(1,null,value);
            this.setState({companyListData:result.data.data,companyName:value})
        }else{
            const result = await getGoddCompany(1,1,value);
            this.setState({companyListData:result.data.data,companyName:value})
        }
    }
    onStaffSearch= async value => {
        const {staffType,staffSearchType,staffKind} = this.state;
        if(staffType=== 'order'){
            const result = await getGoodStaff(1,null,staffSearchType==='staffCity'?value:'',staffKind,staffSearchType==='staffName'?value:'')
            this.setState({staffListData:result.data.data,staffSearchText:value})
        }else{
            const result = await getGoodStaff(1,1,staffSearchType==='staffCity'?value:'',staffKind,staffSearchType==='staffName'?value:'')
            this.setState({staffListData:result.data.data,staffSearchText:value})
        }
    }
    onComPageChange = async value => {
        const {companyType,companyName,} = this.state;
        if(companyType=== 'order'){
            const result = await getGoddCompany(value,null,companyName);
            this.setState({companyListData:result.data.data})
        }else{
            const result = await getGoddCompany(value,1,companyName);
            this.setState({companyListData:result.data.data})
        }
    }
    onStaffPageChange = async value => {
        const {staffType,staffKind,staffSearchType,staffSearchText} = this.state;
        if(staffType=== 'order'){
            const result = await getGoodStaff(value,null,staffSearchType==='staffCity'?staffSearchText:'',staffKind,staffSearchType==='staffName'?staffSearchText:'')
            this.setState({staffListData:result.data.data})
        }else{
            const result = await getGoodStaff(value,1,staffSearchType==='staffCity'?staffSearchText:'',staffKind,staffSearchType==='staffName'?staffSearchText:'')
            this.setState({staffListData:result.data.data})
        }
    }
    onCompanySearchChange = value => {
        if(value==='companyName'){
            this.setState({companySearchType:'',companyName:value});
        }else{
            this.setState({companySearchType:value,companyName:''});
        }
        
    }

    render() {
        const {companyListData,companyType,staffType,staffListData,staffSearchText,staffSearchType} = this.state;
        return (
            <Card bodyStyle={{padding:0}}>
                <Carousel autoplay>
                    {this.state.ad.length>=1
                        ?this.state.ad.map(item => 
                            <a href={item.adUrl} target='blank'>
                                <img style={contentStyle} src={item.adPicture} alt={item.adTitle} />
                            </a>)
                        :<div><img style={contentStyle} src={HD1} alt='广告' /></div>
                    }
                </Carousel>
                <Card
                    style={{ marginTop: '16px' }}
                    bordered={false}
                    title={<span style={{ fontWeight: 500, fontSize: '18px' }}>装修公司</span>}
                    extra={<>
                        <Select defaultValue='order' bordered={false} onChange={this.onCompanyChange}>
                            <Option value='rated' >好评最多</Option>
                            <Option value='order' >订单最多</Option>
                        </Select>
                        
                        <Input.Search placeholder='按名字搜索' style={{width:'200px'}} onSearch={this.onCompanySearch}/>
                    </>}
                >
                    <Row gutter={16} style={{marginBottom:'20px'}}>
                        {companyListData && companyListData.list?
                           companyListData.list.map(item => (
                                <Link to={`/balabala/company-display/${item.id}`}>
                                    <Col sapn={6} style={{ marginTop: 16 }}>
                                        <Card
                                            hoverable
                                            style={{ width: 290, }}
                                            cover={<img alt="example" style={{ height: 200 }} src={item.company_img} />}
                                        >
                                            <Meta
                                                title={item.company_name}
                                                description={
                                                    <div style={{ fontSize: 14, color: '#999' }}>
                                                        {/* <Rate count={5} defaultValue={item.rate} disabled allowHalf /> */}
                                                        {companyType === 'order'
                                                            ?<span>共{item.total}个订单</span>
                                                            :<span>{item.total}个好评</span>
                                                        }
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                </Link>
                            )):null
                        }
                        
                    </Row>
                    {companyListData?<Pagination pageSize={companyListData.pageSize} onChange={this.onComPageChange} total={companyListData.total} />:null}
                </Card>
                <Card
                    style={{ marginTop: '16px' }}
                    bordered={false}
                    title={<span style={{ fontWeight: 500, fontSize: '18px' }}>平台员工</span>}
                    extra={<>
                        <Select defaultValue='order' bordered={false} onChange={this.onStaffChange}>
                            <Option value='rated' >好评最多</Option>
                            <Option value='order' >订单最多</Option>
                        </Select>
                        <Select  style={{width:'110px'}} placeholder="-全部职业-" bordered={false} 
                            onChange={async value =>{
                                const result = await getGoodStaff(1,staffType==='order'?null:1,staffSearchType==='staffCity'?staffSearchText:'',value,staffSearchType==='staffName'?staffSearchText:'')
                                this.setState({staffListData:result.data.data,staffKind:value})
                            }}
                        > 
                            <Option value={null}>全部</Option>
                            {this.state.kindList ? this.state.kindList.map(item => (<Option value={item.id}>{item.kindName}</Option>)) : null}
                        </Select>
                        <Select placeholder='搜索类型' bordered={false} onChange={value => this.setState({staffSearchType:value})}>
                            <Option value='staffName' >按名字</Option>
                            <Option value='staffCity' >按地区</Option>
                        </Select>
                        <Input.Search placeholder='搜索' style={{width:'160px'}} onSearch={this.onStaffSearch}/>
                    </>}
                >
                    <Row gutter={16} style={{marginBottom:'20px'}}>
                        {staffListData && staffListData.list ?
                            staffListData.list.map((item,index) => (
                                <Link to={`/balabala/staff/${item.id}`}>
                                    <Col sapn={6} style={{ marginTop: 16 }}>
                                        <Card
                                            hoverable
                                            style={{ width: 290, }}
                                            cover={<img alt="example" style={{ height: 200 }} src={item.staff_img} />}
                                        >
                                            <Meta
                                                title={item.staff_name}
                                                description={
                                                    <div style={{ fontSize: 14, color: '#999' }}>
                                                        {/* <Rate count={5} defaultValue={item.rate} disabled allowHalf /> */}
                                                        {staffType==='order'
                                                            ?<span> 共{item.total} 个订单</span>
                                                            :<span> {item.total} 个好评</span>   
                                                        }
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                </Link>
                            )):null
                        }
                    </Row>
                    {staffListData?<Pagination pageSize={staffListData.pageSize} onChange={this.onStaffPageChange} total={staffListData.total} />:null}
                </Card>
            </Card>
        )
    }
}
export default Balabala;