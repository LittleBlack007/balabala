import React from 'react';
import { Card, Tabs, Button } from 'antd';
import { withRouter } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'

const { TabPane } = Tabs;

const tabList = [
    {
        key: 'theme',
        tab: '发布主题',
    },
    {
        key: 'comment',
        tab: '评论',
    },
    {
        key: 'collection',
        tab: '收藏',
    },
    {
        key: 'follow',
        tab: '关注',
    }
];
class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    goBack = () =>{
        window.history.back();
    }

    render() {
        return (
            <div>
                <Card
                    title={
                        <Button type='link' onClick={this.goBack}><ArrowLeftOutlined /></Button>
                    }
                >
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="主题" key="1">
                            Content of Tab Pane 1
                    </TabPane>
                        <TabPane tab="评论" key="2">
                            Content of Tab Pane 2
                    </TabPane>
                        <TabPane tab="收藏" key="3">
                            Content of Tab Pane 3
                    </TabPane>
                    </Tabs>
                </Card>
            </div>
        )
    }
}
export default withRouter(UserInfo);