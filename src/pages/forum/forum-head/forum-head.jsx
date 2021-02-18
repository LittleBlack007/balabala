import React from 'react';
import { Row, Col, Card, Avatar, Button } from 'antd';
import {Link} from 'react-router-dom';

const colPhone = {
    xl: 24,
    ls: 24,
    sm: 24,
    lg: 24
};

const tabList = [
    {
        key: 'notice',
        tab: '社区公告',
    },
    {
        key: 'most-popular',
        tab: '最热们帖子',
    },
    {
        key: 'material-selection',
        tab: '选材杂谈',
    },
    {
        key: 'outside-decoration',
        tab: '外墙装修',
    },
    {
        key: 'inside-decoration',
        tab: '内部装修',
    },
    {
        key: 'gossip',
        tab: '家居闲聊',
    },
]

const contentList = {
    'notice': <p>社区公告</p>,
    'most-popular': <p>最热门帖子</p>,
    'material-selection': <p>选材杂谈</p>,
    'outside-decoration': <p>外墙装修</p>,
    'inside-decoration': <p>内部装修</p>,
    'gossip': <p>家具闲聊</p>
};
class ForumHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'notice',
        };
    }

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };

    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col {...colPhone} xl={17}>
                        <Card
                            style={{ width: '100%' }}
                            title={<b style={{ fontSize: '18px' }}>巴拉巴拉家装论坛<br /></b>}
                            // extra={<a href="#">More</a>}
                            tabList={tabList}
                            activeTabKey={this.state.key}
                            onTabChange={key => {
                                this.onTabChange(key, 'key');
                            }}
                        >
                            {contentList[this.state.key]}
                        </Card>
                    </Col>
                    <Col {...colPhone} xl={7}>
                        <Card style={{ textAlign: 'center',padding:'10px 50px' }}>
                            <Avatar
                                style={{ width: 50, height: 50 }}
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                            <br /><br />
                            <p><Link to='/forum/user-info'>用户名</Link></p>
                            <Button type='primary' block>发布帖子</Button>
                        </Card>
                        <Card style={{height:200, marginTop:20}} bodyStyle={{textAlign:'center'}}>广告位招租</Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default ForumHead;