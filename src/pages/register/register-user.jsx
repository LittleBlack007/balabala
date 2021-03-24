import React from 'react';
import { Form, Button, Input, Card } from 'antd';
import './register.less';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 6,
        },
    },
};

class UserResgister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div style={{backgroundColor:'#F5F5F5', height:'100%'}}>
                <header className='login-header'>
                    <h1>普通用户注册</h1>
                </header>
                <Card style={{width:'80%',margin:'50px auto'}}>
                <Form
                    {...formItemLayout}
                    ref={this.formRef}
                    name="register"
                    onFinish={this.onFinish}
                    initialValues={this.props.user}
                    scrollToFirstError
                >
                    <Form.Item
                        label='用户名'
                        name="userPetName"
                        rules={[
                            { required: true, message: '请输入用户名！' },
                            { min: 4, message: '用户名最小长度为4位！' },
                            { max: 12, message: '用户名最大长度为12位！' },
                            { pattern: /^[A-Za-z1-9_]+$/, message: '用户名以数字，字母和下划线构成！' }
                        ]}
                    >
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                        name="userName"
                        label="真实姓名"
                        tooltip="What do you want others to call you?"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="userPhone"
                        label="电话号码"
                        rules={[
                            {
                                required: true,
                                message: '请输入电话号码',
                            },
                            { pattern: /^1[3456789]\d{9}$/, message: '不是正确的手机号码' },
                        ]}
                    >
                        <Input
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    {/* <Form.Item
                            name="person_id"
                            label="身份证号码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入电话号码',
                                },
                                { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号码。' },
                            ]}
                        >
                            <Input
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item> */}
                    {/* <Form.Item label="现住地址">
                            <Input.Group compact> */}
                    <Form.Item
                        label='现住省份'
                        name='userProvince'
                        // noStyle
                        rules={[
                            { required: true, message: '请输入省份！' },
                            { pattern: /^[\u4E00-\u9FA5]+$/, message: '请输入汉字！' }
                        ]}
                    >
                        <Input style={{ width: '20%' }} placeholder="省份" />
                    </Form.Item>
                    <Form.Item
                        name='userCity'
                        label='显著城市'
                        // noStyle
                        rules={[
                            { required: true, message: '请输入城市！' },
                            { pattern: /^[\u4E00-\u9FA5]+$/, message: '请输入汉字！' },
                        ]}
                    >
                        <Input style={{ width: '20%' }} placeholder="市" />
                    </Form.Item>
                    <Form.Item
                        name='userAddress'
                        label='详细地址'
                        // noStyle
                        rules={[
                            { required: true, message: '请输入详细地址！' },
                            { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '只允许出现文字，数字，英文！' },
                        ]}
                    >
                        <Input style={{ width: '80%' }} placeholder="详细地址" />
                    </Form.Item>
                    {/* </Input.Group>
                        </Form.Item> */}
                    {/* <Form.Item
                            label="个人简介"
                            name="userProfile"
                        // rules={[{ required: true }]}
                        // style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <TextArea maxLength={255} autoSize={{ minRows: 4 }} style={{ width: '75%' }} />
                        </Form.Item> */}
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            确定修改
                            </Button>
                    </Form.Item>
                </Form>
                </Card>
            </div>
        )
    }
}
export default UserResgister;