import React from 'react';
import { Card,Input, Select} from 'antd';
import PostList from './post-list';

const {Search} = Input;
const {Option} = Select;
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
    'notice': <PostList />,
    'most-popular': <p>最热门帖子</p>,
    'material-selection': <p>选材杂谈</p>,
    'outside-decoration': <p>外墙装修</p>,
    'inside-decoration': <p>内部装修</p>,
    'gossip': <p>家具闲聊</p>
};
class ForumLeft extends React.Component {
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
            <Card
                style={{ width: '100%' }}
                title={<b style={{ fontSize: '18px' }}>巴拉巴拉家装论坛<br /></b>}
                extra={<>
                    <Search
                        placeholder="请输入"
                        enterButton="搜索"
                        //suffix={suffix}
                        //onSearch={onSearch}
                    /></>}
                tabList={tabList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
            >
                {contentList[this.state.key]}
            </Card>

        )
    }
}
export default ForumLeft;