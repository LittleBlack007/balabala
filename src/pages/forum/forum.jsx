import React from 'react';
import {Row, Col, Avatar, Card, Button} from 'antd';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import UserInfo from '../forum/userInfo';
import NewPost from '../forum/post/new-post';
import PostDetail from '../forum/post/post-detail';
import ForumLeft from './forum-left/forum-left';
import memoryUtils from '../../utils/memoryUtils';

const colPhone = {
    xl: 24,
    ls: 24,
    sm: 24,
    lg: 24
};
class Forum extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    async componentDidMount(){
        
    }

    render(){
        const user = memoryUtils.user;
        return(
            <div style={{width:'99%'}}>
                <Row gutter={16}>
                    <Col {...colPhone} xl={17}>
                        <Switch>
                            <Route path='/forum/forum-index' component={ForumLeft} />
                            <Route path='/forum/post-detail/:postId' component={PostDetail}/>
                            <Route path='/forum/post' component={NewPost} />
                            <Route path='/forum/user-info' component={UserInfo} />
                            <Redirect to='/forum/forum-index'/>
                        </Switch>
                    </Col>
                    <Col {...colPhone} xl={7}>
                        <Card style={{ textAlign: 'center',padding:'10px 50px' }}>
                            <Avatar
                                style={{ width: 70, height: 70 }}
                                src={user.userImg}
                            />
                            <br /><br />
                            <p><Link to='/forum/user-info'>{user.userName}</Link></p>
                            <Button type='primary' block><Link to='/forum/post'>发布帖子</Link></Button>
                        </Card>
                        <Card style={{height:200, marginTop:20}} bodyStyle={{textAlign:'center'}}>广告位招租</Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Forum;