import { Button } from 'antd';
import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import './index.less';

class HeadFirst extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <div className='head-first'>
                    <div className='head-first-left'>
                        湛江[切换]
                    </div>
                    <div className='head-first-right'>
                        <Button type='link'><Link to='/forum'>论坛交流</Link></Button>
                    </div>
            </div>
        )
    }
}

export default withRouter(HeadFirst);