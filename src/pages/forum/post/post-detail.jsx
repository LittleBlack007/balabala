import React from 'react';
import { Card, Comment, Tooltip, List, Input, Avatar, Form, Button } from 'antd';
import moment from 'moment';
import { StarTwoTone, StarOutlined, LikeOutlined, LikeTwoTone } from '@ant-design/icons';

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
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
];

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          发表评论
        </Button>
      </Form.Item>
    </>
  );

class PostDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: '',
        };
    }

    render() {

        const { comments, submitting, value } = this.state;

        return (
            <Card>
                <h2 style={{ fontSize: 18, fontWeight: 'bold' }}>
                    #装修问诊室#圈子营业了，专家团在线坐诊，助你轻松实现美好家
                </h2>
                <Comment
                    avatar={personInfo.avatar}
                    author={personInfo.author}
                    datetime={personInfo.datetime}
                />
                <div dangerouslySetInnerHTML={{ __html: postDetailData }}></div>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <StarTwoTone twoToneColor='#FFD05A' style={{ fontSize: 50 }} />
                    <div style={{ width: 20, display: 'inline-block' }}></div>
                    <LikeTwoTone twoToneColor="#eb2f96" style={{ fontSize: 50 }} />
                </div>
                <div style={{ marginTop: 20 }}></div>
                <List
                    className="comment-list"
                    header={`${data.length} 回复`}
                    itemLayout="horizontal"
                    dataSource={data}
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
                <div style={{width:'60%',marginLeft:'20px'}}>
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
                </div>
            </Card>
        )
    }
}
export default PostDetail;