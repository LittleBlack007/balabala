import React from 'react';
import {Layout} from 'antd';
import {Switch, Route} from 'react-router-dom';
import UserInfo from '../forum/userInfo'
import HeadNav from '../../components/head-nav';
import HeadFirst from '../../components/head-first';
import Forum from '../forum';

const { Header, Footer, Content } = Layout;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <HeadFirst />
                <Layout>
                    {/* <Header style={{padding:'0 0'}}>header</Header> */}
                    <Content>
                        <div style={{borderStyle:'solid',borderBottomWidth:3,borderBottomColor:'#1DA57A'}}></div>
                        <Switch>
                            <Route path='/forum' component={Forum} />
                            <Route path='/forum/user-info' component={UserInfo} />
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </div>
        )
    }
}

export default Main;