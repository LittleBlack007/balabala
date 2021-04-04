import React from 'react';
import { Form, Button, Input, Card, Upload, Select,message } from 'antd';
import './register.less';
import moment from 'momnet';
import {registerUser} from '../../api/index';

const {Option} = Select;
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
            avatarUrl:'http://balabala-1300823189.cos.ap-guangzhou.myqcloud.com/balabala/images/360wallpaper_dt16164569544041881695277306635362.jpg',
        };
    }

    onFinish = async values => {
        values.userImg = this.state.avatarUrl
        values.userCtime = moment().format('YYYY-MM-DD HH:mm:ss');
        values.userStatus = 1;
        console.log(values)
        const result = await registerUser(values);
        if(result.status === 200){
            if(result.data && result.data.status==='success' && result.data.data>0){
                message.success("注册成功");
                message.success("等待审批",3);
                this.props.history.replace('/login/user')
            }else{
                message.error("账号已经存在！")
            }
        }else{
            message.error("注册失败")
        }
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
                    scrollToFirstError
                >
                    <Form.Item
                        label='头像'
                        name='userImg'
                    >
                        <Upload 
                            maxCount={1}
                            action="http://localhost:8080/user/upload_pic" 
                            accept="image/*"
                            listType="picture-card"
                            name='pic' //发到后台的文件参数名
                            //onPreview={this.handlePreview} 
                            onChange={({ file, fileList }) => {
                                if(file.status === "done"){
                                    if(file.response.status === 'success'){
                                        const {data} = file.response;
                                        this.setState({avatarUrl:data})
                                    }
                                }
                            }}
                            showUploadList={true}
                        > 
                            <Button type='link'>上传头像</Button> 
                        </Upload>
                    </Form.Item>
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
                        <Input  style={{ width: '30%' }}/>
                    </Form.Item>
                    <Form.Item
                        name="userPwd"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password style={{ width: '30%' }} type="password" placeholder="密码" />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['userPwd']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('userPwd') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两个密码不一致'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password style={{ width: '30%' }} />
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
                        <Input style={{ width: '30%' }}/>
                    </Form.Item>
                    <Form.Item
                        name="userSex"
                        label="性别"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Sex!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Select style={{width:'100px'}}>
                            <Option value="man">男</Option>
                            <Option value="women">女</Option>
                        </Select>
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
                            style={{ width: '30%' }}
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
                            { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '只允许出现文字，数字，英文！' },
                        ]}
                    >
                        <Input style={{ width: '70%' }} placeholder="详细地址" />
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
                            注册
                            </Button>
                    </Form.Item>
                </Form>
                </Card>
            </div>
        )
    }
}
export default UserResgister;