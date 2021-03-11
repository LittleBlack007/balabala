import React from 'react';
import {Card,Avatar, Button, Row, Col, Statistic} from 'antd';
import {Link } from 'react-router-dom';
import './index.less';
import BarChart from '../../components/echarts/BarChart';
import DrawerContain from './drawer-contain';
import AddStaff from './add-staff';

const category = ['家庭存款','日常的银行服务','退休','文化程度','储蓄','管理债务','投资额','汽车贷款'];
const value =[5,5,10,4,3,4,5,2];

const colPhone = {
    xl:24,
    ls:24,
    sm:24,
    lg:24
}

class CompanyManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    logOut= () => {
        window.history.go('')
    }

    render() {
        return (
            <div>
                <div style={{display:'flex',marginBottom:'20px',height:'60px',backgroundColor:'#1DA57A',color:'white',alignItems:'center',justifyContent:'space-between'}}>
                    <div>
                        <span style={{fontSize:'20px',fontWeight:'bold'}}>&nbsp;&nbsp;商家中心</span>
                    </div>
                    <div>
                        <Link  style={{color:'white'}} to='/company-manage'>
                            <Avatar src='http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg' />&nbsp;
                            平行空间家装
                        </Link>&nbsp;&nbsp;&nbsp;
                        <Link to='/' style={{color:'white'}}>平台首页</Link>
                        <AddStaff />
                        <Button type='link' onClick={this.logOut}>
                            <Link to='/' style={{color:'white'}}>退出</Link>
                        </Button>
                    </div>
                </div>
                <Row gutter={24} justify='center' style={{margin:'20px 0px'}} >
                    <Col span={6}>
                        <Card style={{backgroundColor:'#91CC75',borderRadius:'8px'}}>
                            <Statistic title="订单总收入(￥)" value={112893} precision={2} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{backgroundColor:'#73C0DE',borderRadius:'8px'}}>
                            <Statistic title="客户数(个)" value={1893}  />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={48} style={{fontSize:'18px',fontWeight:'bold',color:'white'}} justify="center">
                    <Col {...colPhone} xl={6} style={{textAlign:'center',height:'150px'}}>
                        <img src='https://tuchat.to8to.com/static/img/case.a39c455.png' style={{height:'150px'}} alt='案例置顶'/>
                        <div style={{marginTop:'-100px'}}>
                            <DrawerContain name='案例置顶'/>
                        </div>
                    </Col>
                    <Col {...colPhone} xl={6} style={{textAlign:'center',height:'150px'}}>
                        <img src='https://tuchat.to8to.com/static/img/evaluate.b6fdd46.png' style={{height:'150px'}} alt="员工原理"/>
                        <div style={{marginTop:'-100px'}}>
                            <DrawerContain name='员工管理'/>
                        </div>
                    </Col>
                    <Col {...colPhone} xl={6} style={{textAlign:'center',height:'150px'}}> 
                        <img  alt='评价查看'  style={{height:'150px'}} src='data:image/png;base64,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' />
                        <div style={{marginTop:'-100px'}}>
                            <DrawerContain name='订单信息'/>
                        </div>
                    </Col>
                    <Col {...colPhone} xl={6} style={{textAlign:'center',height:'150px'}}>
                        <img  style={{height:'150px'}} alt = '公司信息' src='data:image/png;base64,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' />
                        <div style={{marginTop:'-100px'}}>
                            <DrawerContain name='公司信息'/>
                        </div>
                    </Col>
                </Row>
                <Row gutter={24} style={{marginTop:'20px'}}>
                    <Col {...colPhone} xl={12}>
                        <Card title="优秀设计师前十榜单">
                            <BarChart data={{category,value,label:'完成订单总数'}}/>
                        </Card>
                    </Col>
                    <Col {...colPhone} xl={12}>
                        <Card title="优秀工人前十榜单">
                            <BarChart data={{category,value,label:'完成工地总数'}}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default CompanyManage;