import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import {reqLogin,reqCompanyLogin,reqStaffLogin} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

const paramToText = {
    user:'用户',
    company:'公司',
    staff:'员工'
}
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    formOnFinish = async values => {
        const type = this.props.match.params.type; //进来的方式
        let result = null;
        if(type === 'user'){
           result = await reqLogin({userPetName:values.name,userPwd:values.password});
        }else if(type === 'staff'){
            result = await reqStaffLogin({staffPetName:values.name,staffPwd:values.password})
        }else if(type === 'company'){
            result = await reqCompanyLogin({companyPetName:values.name,companyPwd:values.password})
        }
        if(result&&result.data && result.data.status === "success" && result.data.data){
            //提示登录成功
            if(type === 'user'){
                storageUtils.saveUser(result.data.data);//保存用户信息localStroage
                memoryUtils.user = result.data.data //保存到内存
            }else if(type === 'staff'){
                storageUtils.saveStaff(result.data.data);//保存用户信息localStroage
                memoryUtils.staff = result.data.data //保存到内存
            }else if(type === 'company'){
                storageUtils.saveCompany(result.data.data);//保存用户信息localStroage
                memoryUtils.company = result.data.data //保存到内存
            }
            if(!result.data.data[type+'Status']){
                message.error("账号未激活");
            }else{
                message.success('登录成功',2);
                if(type === 'user'){
                    this.props.history.replace('/');
                }else{
                    this.props.history.replace('/'+type+'-manage');//跳转到/目录
                }
            }
        }else{
            message.error("账号密码错误");
        }
    }

    render() {
        //如果已经登录，自动跳转
        const type = this.props.match.params.type; //标志进来的方式
        if(memoryUtils[type] && memoryUtils[type][type+'Status']){
            return <Redirect to={`/${type}-manage`} />;
        }
        return (
            <div className='login'>
                <header className='login-header'>
                    <h1>巴拉巴拉{paramToText[type]}登录</h1>
                </header>
                <section className='login-content'>
                    <h3>{paramToText[type]}登录</h3>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.formOnFinish}
                    >
                        <Form.Item
                            name="name"
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