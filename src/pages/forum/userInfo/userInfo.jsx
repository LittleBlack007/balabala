import React from 'react';
import { Card, Tabs, Button, List, Comment } from 'antd';
import { Redirect, withRouter } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import memoryUtils from '../../../utils/memoryUtils';
import {EyeOutlined,LikeOutlined,MessageOutlined} from '@ant-design/icons';
import { getPostByUserId,deletePost,getCommentByUserId,getCollectionByUserId,getPostUserByIds} from '../../../api/index'
import {Link} from 'react-router-dom';
import moment from 'moment';

const { TabPane } = Tabs;

const Delete = (props) => (
    <Button 
        type='link' 
        onClick={async () =>{
            await deletePost(props.postId)
            window.history.go('/forum/user-info')
        }}
    >
        删除
    </Button>
)
class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicPage:{pageSize:0,total:0,pageNum:0},
            commentPage:{pageSize:0,total:0,pageNum:0},
            collectionPage:{pageSize:0,total:0,pageNum:0},
            commentList:[],
            collectionList:[],
            list:[],
        };
    }

    goBack = () => {
        window.history.back();
    }

    async componentDidMount(){
        this.getList(1,memoryUtils.user.id);
        this.getCommentList(1,memoryUtils.user.id)
        this.getCollectionList();
    }

    getCollectionList= async () =>{
        let postArr = []
        const postList = await getCollectionByUserId(memoryUtils.user.id);
        postList.data.data.forEach(item => {
            postArr.push(item.postId)
        })
        let list = []
        const result = await getPostUserByIds(postArr);
        if(result.data && result.data.data){
            result.data.data.forEach(item => {
                list.push(
                    {
                        postId:item.id,
                        actions: [
                            <span key="comment-list-reply-to-0">{item.post_viewed}&nbsp;<EyeOutlined/></span>,
                            <span key="comment-list-reply-to-1">{item.post_likes_num}&nbsp;<LikeOutlined /></span>,
                            <span key="comment-list-reply-to-2">{item.post_com_num}&nbsp;<MessageOutlined /></span>,
                            <span key="comment-list-reply-to-3"><Delete postId={item.id}/></span>
                        ],
                        author:item.user_pet_name,
                        avatar: item.user_img,
                        content: (
                            <Link to={`/forum/post-detail/${item.id}`}><p style={{fontSize:16}}>
                                {item.post_title}
                            </p></Link>
                        ),
                        datetime: (<span>{moment(item.postLastDate).format("YYYY-MM-DD HH:mm:ss")}发布</span>),
                    }
                )
            })
        }
        const {pageSize:pS,total:tt,pageNum:pN} = result.data.data;
        this.setState({collectionList:list,collectionPage:{pageSize:pS,total:tt,pageNum:pN}})
    }

    deletePost =  e => {
        console.log(e)
    }

    async getList(pageNum,key){
        let list = []
        const result = await getPostByUserId(pageNum,key);
        if(result.data && result.data.data){
            result.data.data.list.forEach(item => {
                list.push(
                    {
                        postId:item.id,
                        actions: [
                            <span key="comment-list-reply-to-0">{item.postViewed}&nbsp;<EyeOutlined/></span>,
                            <span key="comment-list-reply-to-1">{item.postLikesNum}&nbsp;<LikeOutlined /></span>,
                            <span key="comment-list-reply-to-2">{item.postComNum}&nbsp;<MessageOutlined /></span>,
                            <span key="comment-list-reply-to-3"><Delete postId={item.id}/></span>
                        ],
                        author:memoryUtils.user.userPetName,
                        avatar: memoryUtils.user.userImg,
                        content: (
                            <Link to={`/forum/post-detail/${item.id}`}><p style={{fontSize:16}}>
                                {item.postTitle}
                            </p></Link>
                        ),
                        datetime: (<span>{moment(item.postLastDate).format("YYYY-MM-DD HH:mm:ss")}发布</span>),
                    }
                )
            })
        }
        const {pageSize:pS,total:tt,pageNum:pN} = result.data.data;
        this.setState({list:list,topicPage:{pageSize:pS,total:tt,pageNum:pN}})
    }

    async getCommentList(pageNum,userId){
        let list = []
        const result = await getCommentByUserId(pageNum,userId);
        if(result.data && result.data.data){
            result.data.data.list.forEach(item => {
                list.push(
                    {
                        postId:item.id,
                        actions: [
                            <span key="comment-list-reply-to-3"><Delete commentId={item.id}/></span>
                        ],
                        author:memoryUtils.user.userPetName,
                        avatar: memoryUtils.user.userImg,
                        content: (
                            <Link to={`/forum/post-detail/${item.postId}`}><p style={{fontSize:12}}>
                                {item.commentContent}
                            </p></Link>
                        ),
                        datetime: (<span>{moment(item.commentCreateTime).format("YYYY-MM-DD HH:mm:ss")}发表</span>),
                    }
                )
            })
        }
        const {pageSize:pS,total:tt,pageNum:pN} = result.data.data;
        this.setState({commentList:list,commentPage:{pageSize:pS,total:tt,pageNum:pN}})
    }

    onPageChange= (pageNum) => {
        this.getList(pageNum,memoryUtils.user.id)
        this.getCommentList(pageNum,memoryUtils.user.id)
    }

    render() {
        const user = memoryUtils.user;
        if (!user.userStatus) {
            <Redirect to='/login/user' />
        }
        return (
            <div>
                <Card
                    title={
                        <Button type='link' onClick={this.goBack}><ArrowLeftOutlined /></Button>
                    }
                >
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="主题" key="1">
                            <List
                                className="comment-list"
                                itemLayout="horizontal"
                                dataSource={this.state.list}
                                pagination={{
                                    onChange: page => {
                                        this.onPageChange(page)
                                    },
                                    pageSize: this.state.topicPage.pageSize,
                                    pageNum: this.state.topicPage.pageNum,
                                    total: this.state.topicPage.total
                                }}
                                renderItem={item => (
                                    <li>
                                        <Comment
                                            actions={item.actions}
                                            author={item.author}
                                            avatar={item.avatar}
                                            content={item.content}
                                            datetime={item.datetime}
                                        />
                                    </li>
                                )}
                            />
                        </TabPane>
                        <TabPane tab="评论" key="2">
                            <List
                                className="comment-list"
                                itemLayout="horizontal"
                                dataSource={this.state.commentList}
                                pagination={{
                                    onChange: page => {
                                        this.onPageChange(page)
                                    },
                                    pageSize: this.state.topicPage.pageSize,
                                    pageNum: this.state.topicPage.pageNum,
                                    total: this.state.topicPage.total
                                }}
                                renderItem={item => (
                                    <li>
                                        <Comment
                                            actions={item.actions}
                                            author={item.author}
                                            avatar={item.avatar}
                                            content={item.content}
                                            datetime={item.datetime}
                                        />
                                    </li>
                                )}
                            />
                    </TabPane>
                        <TabPane tab="收藏" key="3">
                        <List
                                className="comment-list"
                                itemLayout="horizontal"
                                dataSource={this.state.collectionList}
                                pagination={{
                                    onChange: page => {
                                        this.onPageChange(page)
                                    },
                                    pageSize: this.state.topicPage.pageSize,
                                    pageNum: this.state.topicPage.pageNum,
                                    total: this.state.topicPage.total
                                }}
                                renderItem={item => (
                                    <li>
                                        <Comment
                                            actions={item.actions}
                                            author={item.author}
                                            avatar={item.avatar}
                                            content={item.content}
                                            datetime={item.datetime}
                                        />
                                    </li>
                                )}
                            />
                    </TabPane>
                    </Tabs>
                </Card>
            </div>
        )
    }
}
export default withRouter(UserInfo);