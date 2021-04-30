import React from 'react';
import moment from 'momnet';
import { Comment, List, Tooltip} from 'antd';
import {EyeOutlined,LikeOutlined,MessageOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {getPostUserByIds,getPostUserByTypeId } from '../../../api/index'


// const data = [
//     {
//         actions: [<span key="comment-list-reply-to-0">123<EyeOutlined/></span>,<span key="comment-list-reply-to-1">123<LikeOutlined /></span>,<span key="comment-list-reply-to-2">123<MessageOutlined /></span>],
//         author: 'Han Solo',
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//         content: (
//             <Link to='/forum/post-detail/1'><p style={{fontSize:16}}>
//                 We supply a series of design principles, practical patterns and high quality design
//                 resources (Sketch and Axure), to help people create their product prototypes beautifully and
//                 efficiently.
//             </p></Link>
//         ),
//         datetime: (
//             <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
//                 <span>{moment().subtract(1, 'days').fromNow()}</span>
//             </Tooltip>
//         ),
//     }
// ];

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page:{pageSize:0,total:0,pageNum:0},
            list:[],
            userList:[]
        };
    }

    // async componentDidMount(){
    //     const typeId = this.props.typeId
    //     this.getList(1,typeId);
    // }

    // componentWillReceiveProps(){
    //     this.setState({page:this.props.page})
    // }
    render() {

        return (
            <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={this.props.list}
                // pagination={{
                //     onChange: page => {
                //       this.props.onPageChange(page)
                //     },
                //     pageSize: this.props.page.pageSize,
                //     pageNum:this.props.page.pageNum,
                //     total:this.props.page.total
                //   }}
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
        )
    }
}
export default PostList;