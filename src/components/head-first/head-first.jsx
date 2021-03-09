import { Button, Badge } from 'antd';
import React from 'react';
import {MessageOutlined} from '@ant-design/icons'
import { Link, withRouter } from 'react-router-dom';
import './index.less';

const navList = [
    { path: '/', text: '我的订单' },
    { path: '/company-manage', text: '商家中心' },
    { path: '/', text: '工人中心' },
    { path: '/forum', text: '我的论坛' }
]
const HeadFirstNav = (props) => {
    const { navList } = props;
    return navList.map(item => (
        <>
            <div style={{ float: 'left', width: '1px', backgroundColor: '#999', height: '12px', margin: '12px 8px' }}></div>
            <Link to={item.path} style={{ float: 'left', color: '#999' }} >{item.text}</Link>
        </>
    ))
}




class HeadFirst extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className='head-first'>
                <div className='head-first-left'>
                    湛江[切换]
                    </div>
                <div className='head-first-right'>
                    <div style={{ float: 'left' }}>
                        <Link>登录 </Link>
                        <Link>&nbsp;&nbsp;注册&nbsp;&nbsp;</Link>
                    </div>
                    <div style={{ float: 'left' ,margin:'0px 4 px'}}>
                        <Badge count={5} size="small" offset={[18, 7]} >
                            <Link><MessageOutlined /></Link>
                        </Badge>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>

                    <HeadFirstNav navList={navList} />
                    <div></div>
                </div>
            </div>
        )
    }
}

export default withRouter(HeadFirst);