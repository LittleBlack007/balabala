import React from 'react';
import { Card, Comment, Tooltip, List, Input, Avatar, Form, Button, message } from 'antd';
import moment from 'moment';
import { StarTwoTone, StarOutlined, LikeOutlined, LikeTwoTone } from '@ant-design/icons';
import memoryUtils from '../../../utils/memoryUtils';
import {getPostUserById,getPostById,
    cancelCollection,addCollection,getCollectionId,
    cancelLike,addLike,getLikeId,
    getCommentUserByPostId,
    updatePostLikes, updatePostCommentNum, addComment
} from '../../../api/index'

const { TextArea } = Input;
const postDetailData = '<p>123</p><p>321</p><ul><li><span style="font-size: 24px;">2222</span></li></ul><ol><li><span style="font-size: 24px;">21321</span></li></ol>'
const personInfo = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    datetime: (<span>{moment().format('YYYY-MM-DD HH:mm:ss')}</span>
    ),
}
const data = [
    {
        // actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: '王大深',
        avatar: 'http://balabala-1300823189.cos.ap-guangzhou.myqcloud.com/balabala/images/360wallpaper_dt16164569544041881695277306635362.jpg',
        content: (
            <><p>
                图片真好看，是你拍的吗
                
            </p>
           
            </>
        ),
        datetime: (
            <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: '王大深',
        avatar: 'http://balabala-1300823189.cos.ap-guangzhou.myqcloud.com/balabala/images/360wallpaper_dt16164569544041881695277306635362.jpg',
        content: (
            <p>
                图片真好看，有空一起交流
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
];

const Editor = ({ onChange, onSubmit, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" onClick={onSubmit} type="primary">
          发表评论
        </Button>
      </Form.Item>
    </>
  );

class PostDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postData:{},
            myComentData:'',
            commentData:{},
            comments: [],
            submitting: false,
            value: '',
            zanFou:false,
            cangFou:false,
            cangId:null,
            zangId:null
        };
    }

    async componentDidMount(){
        const userId = memoryUtils.user.id
        const postId = this.props.match.params.postId
        const result = await getPostUserById(parseInt(postId));
        const contentData = await getPostById(parseInt(postId))
        this.getCollectionIdData(parseInt(userId),parseInt(postId))
        this.getLikeIdData(parseInt(userId),parseInt(postId))
        this.setState({postData:result.data.data,postContent:contentData.data.data.postContent})
        this.getCommentData(postId);
    }
    getCommentData = async postId => {
        const result = await getCommentUserByPostId(1,postId);
        this.setState({commentData:result.data.data})
    }
    getCollectionIdData = async (userId,postId) => {
        const result = await getCollectionId(userId,postId)
        if(result.data && result.data.data && result.data.data>=0){
            this.setState({cangFou:true,cangId:result.data.data})
        }
    }
    getLikeIdData = async (userId,postId) => {
        const result = await getLikeId(userId,postId)
        if(result.data && result.data.data && result.data.data>=0){
            this.setState({zanFou:true,zanId:result.data.data})
        }
    }
    clickZan = async () => {
        const postId = this.props.match.params.postId
        const user = memoryUtils.user;
        if(!user.id){
            this.props.history.replace('/login/user')
        }
        if(this.state.zanFou){
            const {zanId} = this.state;
            const result = await cancelLike(zanId);
            if(result.data && result.data.data >0){
                await updatePostLikes(postId,this.state.postData.post_likes_num-1)
                this.setState({zanFou:false});
            }else{
                message.success('取消点赞失败！')
            }
        }else{
            const result = await addLike({postId,userId:parseInt(user.id)})
            if(result.data && result.data.data >0){
                const result = await getLikeId(parseInt(user.id),postId)
                await updatePostLikes(postId,this.state.postData.post_likes_num+1)
                this.setState({zanFou:true,zanId:result.data.data});
                message.success('点赞成功')
            }else{
                message.success('点赞失败！')
            }
        }
    }

    clickCang = async () => {
        const postId = this.props.match.params.postId
        const user = memoryUtils.user;
        if(!user.id){
            this.props.history.replace('/login/user')
        }
        if(this.state.cangFou){
            const {cangId} = this.state;
            const result = await cancelCollection(cangId);
            if(result.data && result.data.data >0){
                this.setState({cangFou:false});
            }else{
                message.success('取消收藏失败！')
            }
        }else{
            const result = await addCollection({postId,userId:user.id})
            if(result.data && result.data.data >0){
                const result = await getCollectionId(parseInt(user.id),postId)
                this.setState({cangFou:true,cangId:result.data.data});
                message.success('收藏成功')
            }else{
                message.success('收藏失败！')
            }
        }
    } 
    toCommentList = list =>{
        let commentList = [];
        list.forEach(item => {
            commentList.push({
                // actions: [<span key="comment-list-reply-to-0">Reply to</span>],
                author: item.user_name,
                avatar: item.user_img,
                content: (
                    <><p>{item.comment_content}</p></>),
                datetime: (
                    <Tooltip title={moment(item.comment_create_time).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(item.comment_create_time).fromNow()}</span>
                    </Tooltip>
                ),
            })
        })
        return commentList;
    }
    handleChange = e => {
        this.setState({myComentData:e.target.value});
    }
    handleSubmit = async () => {
        const {postId} = this.props.match.params
        const userId = memoryUtils.user.id;
        if(this.state.myComentData !== null && this.state.myComentData !== ''){
            const comment = {};
            comment.userId = parseInt(userId);
            comment.postId = postId;
            comment.commentContent = this.state.myComentData;
            comment.commentCreateTime = moment().format("YYYY-MM-DD HH:mm:ss");
            console.log(comment)
            const result = await addComment(comment);
            if(result.data && result.data.data === 1){
                await updatePostCommentNum(postId,this.state.postData.post_com_num+1)
                this.getCommentData(postId)
                message.success('发表成功')
            }else{
                message.error("失败")
            }
            
            
        }else{
            message.error('请输入内容');
        }
    }
    render() {

        const { postData ,postContent, commentData} = this.state;

        return (
            
            <Card>
                <h2 style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {postData.post_title}
                </h2>
                <Comment
                    avatar={postData.user_img}
                    author={postData.user_pet_name}
                    datetime={moment(postData.post_last_date).format('YYYY-MM-DD HH:mm:ss')}
                />
                <div dangerouslySetInnerHTML={{ __html: postContent }}></div>
                {/* 点赞-收藏 */}
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{display: 'inline-block' }} onClick={this.clickZan}>
                        {!this.state.zanFou?<LikeOutlined style={{fontSize:40,color:'#B0A898'}}/>:
                        <LikeTwoTone twoToneColor='#FFD05A' style={{ fontSize: 40 }} />}
                    </div>
                    <div style={{ width: 20, display: 'inline-block' }}></div>
                    <div style={{ width: 20, display: 'inline-block' }} onClick={this.clickCang}>
                        {!this.state.cangFou?<StarOutlined style={{fontSize:40,color:'#B0A898'}}/>:
                        <StarTwoTone twoToneColor="#eb2f96" style={{ fontSize: 40 }} />}
                    </div>
                </div>
                <div style={{ marginTop: 20 }}></div>

                {/*评论区*/}
                {commentData && commentData.list &&commentData.list.length >0
                ?<List
                    className="comment-list"
                    header={`${commentData.total} 回复`}
                    itemLayout="horizontal"
                    dataSource={this.toCommentList(commentData.list)}
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
                />:null}
                <div style={{width:'60%',marginLeft:'20px'}}>
                <Comment
                    avatar={
                        <Avatar
                            src={memoryUtils.user.userImg}
                            alt={memoryUtils.user.userName}
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            //submitting={submitting}
                            value={this.state.myComentData}
                        />
                    }
                />
                </div>
            </Card>
        )
    }
}
export default PostDetail;