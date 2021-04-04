import React from 'react';
import RichTextEditor from '../../../components/rich-text-editor/rich-text-editor';
import { Form, Input, Button, Select, Card,message } from 'antd';
import {Redirect} from 'react-router-dom';
import memoryUtils from '../../../utils/memoryUtils';
import {getPostType,creatPost} from '../../../api/index';
import moment from 'momnet';

const dateFormat = "YYYY-MM-DD HH:mm:ss"//'yyyy-MM-ddTHH:mm:ss.SSSX'
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 14,
    },
}

class PostForum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postType:[{id:'',typeName:''}],
        };
        this.editor = React.createRef();
        //this.picturesWall = React.createRef();
    }

    onFinish = async value => {
        value.userId = memoryUtils.user.id;
        value.postContent=this.editor.current.getDetail()
        value.postLastDate = moment().format(dateFormat);
        value.poseViewed = 0;
        value.postComNum = 0;
        value.postPosition = 0;
        value.postLikesNum = 0;
        const result = await creatPost(value);
        if(result.data && result.data.status ==='success' && result.data.data){
            message.success("成功");
            this.props.history.push('/forum/forum-index')
        }else{
            message.error("失败");
        }
    }

    async getPostType(){
        const postType = await getPostType();
        this.setState({postType:postType.data.data.list})
    }

    async componentDidMount(){
        this.getPostType()
    }

    render() {
        const user = memoryUtils.user;
        if(!user.userStatus){
            return <Redirect to={"/login/user"} />
        }
        return (
            <Card bodyStyle={{padding:'20px'}}>
                <Form
                    onFinish={this.onFinish}
                    {...formItemLayout}
                    layout='vertical'
                    // form={form}
                    // onValuesChange={onFormLayoutChange}
                >
                    <Form.Item 
                        name='postTitle'
                        label="帖子标题"
                        rules={[
                            {required:true,message:'请输入帖子的标题！'}
                        ]}
                    >
                        <Input placeholder="--请概述你的问题--" />
                    </Form.Item>
                    <Form.Item 
                        name='postTypeId'
                        label="板块分类"
                        rules={[
                            {required:true,message:'请选择对应的板块分类！'}
                        ]}
                    >
                        <Select placeholder='--请选择板块分类--'>
                            {
                                this.state.postType.map(item => (
                                    <Option value={item.id}>{item.typeName}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label='正文' labelCol={{span:4}} wrapperCol={{span:18}} >
                        <RichTextEditor ref={this.editor} />
                    </Form.Item>
                    {/* <Form.Item>
                        <PicturesWall ref={this.picturesWall} />
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">发布帖子</Button>{/*onClick={this.submic}*/}
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
export default PostForum;