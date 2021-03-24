import { Button, Badge, Select } from 'antd';
import React from 'react';
import {MessageOutlined} from '@ant-design/icons'
import { Link, withRouter } from 'react-router-dom';
import './index.less';
import memoryUtils from '../../utils/memoryUtils';

const {Option} = Select;
const navList = [
    { path: '/user-manage', text: '个人中心' },
    { path: '/company-manage', text: '公司中心' },
    { path: '/staff-manage', text: '工人中心' },
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
                    {memoryUtils.user && memoryUtils.user.userStatus
                        ?<Button type='link'><Link to="/user-manage">{memoryUtils.user.userPetName}</Link></Button>
                        :<Link to="/login/user">登录&nbsp;&nbsp;</Link>
                    }
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