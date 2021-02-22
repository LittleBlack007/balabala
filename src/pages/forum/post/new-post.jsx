import React from 'react';
import RichTextEditor from './rich-text-editor'
import { Form, Input, Button, Select, Card } from 'antd';

const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 14,
    },
}

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

class PostForum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.editor = React.createRef();
    }

    submic = ()=>{
        console.log(this.editor.current.getDetail())
    }

    render() {
        return (
            <Card bodyStyle={{padding:'20px'}}>
                <Form
                    {...formItemLayout}
                    layout='vertical'
                    // form={form}
                    // onValuesChange={onFormLayoutChange}
                >
                    <Form.Item 
                        name='title'
                        label="帖子标题"
                        rules={[
                            {required:true,message:'请输入帖子的标题！'}
                        ]}
                    >
                        <Input placeholder="--请概述你的问题--" />
                    </Form.Item>
                    <Form.Item 
                        name='plate'
                        label="板块分类"
                        rules={[
                            {required:true,message:'请选择对应的板块分类！'}
                        ]}
                    >
                        <Select placeholder='--请选择板块分类--'>
                            {
                                tabList.map(item => (
                                    <Option value={item.key}>{item.tab}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label='正文' labelCol={{span:4}} wrapperCol={{span:18}} >
                        <RichTextEditor ref={this.editor} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.submic}>发布帖子</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
export default PostForum;