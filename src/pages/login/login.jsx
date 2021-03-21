import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import logo from "../../assets/images/logo.jpg";
import {reqLogin} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    formOnFinish = async values => {
        const result = await reqLogin(values);
        console.log(result);
        if(result.data.status === 0){
            //提示登录成功
            message.success('登录成功',2);
            storageUtils.saveUser(result.data.data);//保存用户信息localStroage
            memoryUtils.user = result.data.data //保存到内存
            //跳转到/目录
            this.props.history.replace('/');
        }else{
            //登录失败
            message.error(result.data.msg);
        }
    }

    render() {
        //如果用户已经登录，自动跳转到admin
        if(memoryUtils.user && memoryUtils.user._id){
            return <Redirect to='/' />;
        }
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo' />
                    <h1>React-balabala后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h3>用户登录</h3>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.formOnFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {required: true, message: '请输入用户名！' },
                                {min: 4, message:'用户名最小长度为4位！' },
                                {max: 12, message: '用户名最大长度为12位！'},
                                {pattern: /^[A-Za-z1-9_]+$/ , message: '用户名以数字，字母和下划线构成！'}
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {required: true, message: '请输入用户名！' },
                                {min: 4, message:'用户名最小长度为4位！' },
                                {max: 12, message: '用户名最大长度为12位！'},
                                {pattern: /^[A-Za-z1-9_]+$/ , message: '用户名以数字，字母和下划线构成！'}
                            ]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

export default Login;