import React from 'react';
import {Card,Avatar, Button} from 'antd';
import {Link } from 'react-router-dom';
import './index.less'

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
            <Card 
                headStyle={{backgroundColor:'#1DA57A',color:'white', fontSize:'20px',fontWeight:'bold'}}
                title={<>
                        <span>商家中心</span>&nbsp;&nbsp;&nbsp;
                        <Avatar src='http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg' />
                        <span></span>
                    </>} 
                extra={<>
                    <Link to='/' style={{color:'white'}}>平台首页</Link>
                    <Button type='link' onClick={this.logOut}>
                        <Link to='/' style={{color:'white'}}>退出</Link>
                    </Button></>}
            >

            </Card>
        )
    }
}
export default CompanyManage;