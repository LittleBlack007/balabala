import React from 'react';
import { Card, Input, Select,Pagination,Button} from 'antd';
import PostList from './post-list';
import { getPostByTitle, getPostType, updatePostViewed,getPostByTypeId,getPostUserByTypeId } from '../../../api/index'
import {EyeOutlined,LikeOutlined,MessageOutlined} from '@ant-design/icons';
import moment from 'momnet';
import {Link} from 'react-router-dom';

const { Search } = Input;
const {Option} = Select;
const Count =(props) => (
    <Button 
        type='link' 
        onClick={async () =>{
            await updatePostViewed(props.postId,props.count+1)
        }}
    >
        {props.title}
    </Button>
)
const tabList = [
    {
        key: 1,
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
    1: <PostList />,
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
            defaultCurrent:1,
            pageSize:0,
            total:0,
            pageNum:0,
            list:[],
            key: 0,
            tabList: [],
        };
    }

    // onTabChange = (key, type) => {
    //     this.setState({ [type]: key });
    // };
    //得到全部的帖子
    async getPostList(pageNum, title) {
        const result = await getPostByTitle(pageNum, title);
        this.setState({ postList: result })
        return result;
    }
    //生成全部帖子tab
    async getPostListTab() {
        //得到所有分类，生成tabList
        const typeList = await getPostType();
        const tabList = []
        const contentList = {}
        if (typeList.data && typeList.data.data && typeList.data.data.list) {
            typeList.data.data.list.forEach(item => {
                tabList.push({ key: item.id, tab: item.typeName })
            })
            this.setState({
                tabList: tabList
            }, () => {
                tabList.forEach(item => {//生成contentList
                    this.getPostListByTypeId(item.key, contentList, 1, item.key)
                })
                this.setState({ contentList: contentList });
            });
        }
    }
    //根据帖子typeid查询帖子,生成对应的contentList
    async getPostListByTypeId(key, contentList, pageNum, postTypeId) {
        const list = await getPostByTypeId(pageNum, postTypeId);
        contentList[key] = <PostList data={list.data} typeId={key} />
    }

    async componentDidMount() {
        this.getPostListTab()
        this.getList(1,0);
    }

    async getList(pageNum,key){
        let list = []
        const result = await getPostUserByTypeId(pageNum,key);
        if(result.data && result.data.data){
            result.data.data.list.forEach(item => {
                list.push(
                    {
                        actions: [
                            <span key="comment-list-reply-to-0">{item.post_viewed}&nbsp;<EyeOutlined/></span>,
                            <span key="comment-list-reply-to-1">{item.post_likes_num}&nbsp;<LikeOutlined /></span>,
                            <span key="comment-list-reply-to-2">{item.post_com_num}&nbsp;<MessageOutlined /></span>
                        ],
                        author:item.user_pet_name,
                        avatar: item.user_img,
                        content: (
                            <Link to={`/forum/post-detail/${item.id}`}>
                                <p style={{fontSize:16}}>
                                    <Count title={item.post_title} postId={item.id} count={item.post_viewed}/>
                                </p>
                            </Link>
                        ),
                        datetime: (<span>{moment(item.post_last_date).format("YYYY-MM-DD HH:mm:ss")}发布</span>),
                    }
                )
            })
        }
        const {pageSize,total,pageNum:pN} = result.data.data;
        this.setState({list:list,pageSize:pageSize,total:total,pageNum:pN})
    }

    onPageChange= (pageNum) => {
        this.getList(pageNum,this.state.key)
    }


    render() {
        return (<>
            <Card 
                style={{ width: '100%' }}
                title={<b style={{ fontSize: '18px' }}>巴拉巴拉家装论坛</b>}
                extra={
                    <Select 
                        placeholder="切换帖子类型" 
                        defaultValue={0} 
                        bordered={false} 
                        onChange={value => {
                            this.getList(1,value);
                            this.setState({key:value,defaultCurrent:0});
                        }}
                    >
                        {this.state.tabList.map(item => (<Option value={item.key}>{item.tab}</Option>))}
                    </Select>
                }
            >
                <PostList list={this.state.list} page={this.state.page} onPageChange={this.onPageChange}/>
                <Pagination 
                    defaultCurrent={1}
                    pageSize={this.state.pageSize}
                    pageNum={this.state.pageNum}
                    total={this.state.total}
                    onChange={value => this.onPageChange(value)}
                />
            </Card>
            {/* <Card
                style={{ width: '100%' }}
                title={<b style={{ fontSize: '18px' }}>巴拉巴拉家装论坛</b>}
                extra={
                    <Search
                        style={{overflow:'hidden'}}
                        placeholder="请输入"
                        enterButton="搜索"
                        //suffix={suffix}
                        //onSearch={onSearch}
                    />}
                tabList={this.state.tabList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
            >
                {this.state.contentList[this.state.key]}
            </Card > */}
        </>)
    }
}
export default ForumLeft;