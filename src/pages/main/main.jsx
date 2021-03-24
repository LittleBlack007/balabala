import React from 'react';
import {Layout, Input, Button, Select} from 'antd';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import HeadNav from '../../components/head-nav';
import HeadFirst from '../../components/head-first';
import Forum from '../forum';
import balaIndex from '../../assets/images/bala-index.jpg';
import Balabala from '../balabala';
import CompanyDisplay from '../company-display';
import CaseDisplay from '../company-display/case-display';
import StaffDisplay from '../company-display/staff-display';
import AddOrder from '../balabala/add-order';
import './index.less';

const { Header, Footer, Content } = Layout;
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div style={{minHeight:'100%'}}>
                <HeadFirst />
                <Layout>
                    <Header className='header'>
                        <Link to='/balabala'><img style={{height:66}} src={balaIndex} alt='主页' /></Link>
                        <Input 
                            style={{width:300}}
                            addonBefore={
                                <Select defaultValue='company' className='select-before'>
                                    <Select.Option value='company'>装修公司</Select.Option>
                                    <Select.Option value='worker'>施工工人</Select.Option>
                                </Select>} 
                            addonAfter={<Button type='link' size='small' className='select-after'>搜索</Button>} 
                            placeholder="输入公司/个人名" 
                        />
                    </Header>
                    <Content>
                        <Switch>
                            <Route path='/balabala/add-order/:staffId' component={AddOrder} />
                            <Route path='/balabala/staff' component={StaffDisplay} />
                            <Route path='/balabala/company-display/case' component={CaseDisplay} />
                            <Route path='/balabala/company-display' component={CompanyDisplay} />
                            <Route path='/balabala' component={Balabala}/>
                            <Route path='/forum' component={Forum} />
                            <Redirect to='/balabala' />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center'}}>@巴拉巴拉家装平台</Footer>
                </Layout>
            </div>
        )
    }
}

export default Main;