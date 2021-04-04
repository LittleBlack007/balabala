import React from 'react';
import './register.less';
import { Card, Input, Upload, Button, Form, message } from 'antd';
import {registerCompany} from '../../api/index';

const { TextArea } = Input;
class RegisterCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarUrl:'http://balabala-1300823189.cos.ap-guangzhou.myqcloud.com/balabala/images/360wallpaper_dt16164569544041881695277306635362.jpg',
            qualificationsUrlArr: '['
        };
    }

    onFinish = async values => {
        values.companyImg = this.state.avatarUrl;
        values.companyQualifications = this.state.qualificationsUrlArr+']';
        console.log(values.companyQualifications)
        values.companyStatus = 0;
        const result = await registerCompany(values);
        if(result.status === 200){
            if(result.data && result.data.status==='success' && result.data.data>0){
                message.success("注册成功");
                message.success("等待审批",3);
                this.props.history.replace('/login/company')
            }else{
                message.error("账号已经存在！")
            }
        }else{
            message.error("注册失败")
        }
        
    }

    render() {
        return (
            <div>
                <header className='login-header'>
                    <h1>公司账号申请</h1>
                </header>
                <Card>
                    <Form
                        ref={this.formRef}
                        name="company_register"
                        onFinish={this.onFinish}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Form.Item
                            label='头像'
                            name='companyImg'
                        >
                            <Upload
                                maxCount={1}
                                action="http://localhost:8080/user/upload_pic"
                                accept="image/*"
                                listType="picture-card"
                                name='pic' //发到后台的文件参数名
                                //onPreview={this.handlePreview} 
                                onChange={({ file, fileList }) => {
                                    if (file.status === "done") {
                                        if (file.response.status === 'success') {
                                            const { data } = file.response;
                                            this.setState({ avatarUrl: data })
                                        }
                                    }
                                }}
                                showUploadList={true}
                            >
                                <Button type='link'>上传头像</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="公司账户">
                            <Form.Item
                                name="companyPetName"
                                noStyle
                            //initialValue={this.state.detail.name}
                            // rules={[{ required: true, message: 'Username is required' }]}
                            >
                                <Input style={{ width: '30%' }} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            name="companyPwd"
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
                            dependencies={['companyPwd']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('companyPwd') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两个密码不一致'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password style={{ width: '30%' }} />
                        </Form.Item>
                        <Form.Item label="公司名">
                            <Form.Item
                                name="companyName"
                                noStyle
                            //initialValue={this.state.detail.name}
                            // rules={[{ required: true, message: 'Username is required' }]}
                            >
                                <Input style={{ width: '30%' }} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="公司电话">
                            <Form.Item
                                name="companyPhone"
                                rules={[
                                    { pattern: /^1[3456789]\d{9}$/, message: '不是正确的手机号码' },
                                ]}
                            // style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            >
                                <Input style={{ width: '30%' }} placeholder="电话" />
                            </Form.Item>
                        </Form.Item>
                        {/* <Form.Item label="公司地址">
                        <Input.Group compact> */}
                        <Form.Item
                            name="companyProvince"
                            label='省份'
                            //noStyle
                            rules={[
                                { required: true, message: '请输入省份！' },
                                { pattern: /^[\u4E00-\u9FA5]+$/, message: '请输入汉字！' }
                            ]}
                        >
                            <Input style={{ width: '30%' }} placeholder="省份" />
                        </Form.Item>
                        <Form.Item
                            name="companyCity"
                            label='城市'
                            //noStyle
                            rules={[
                                { required: true, message: '请输入城市！' },
                                { pattern: /^[\u4E00-\u9FA5]+$/, message: '请输入汉字！' },
                            ]}
                        >
                            <Input style={{ width: '30%' }} placeholder="市" />
                        </Form.Item>
                        <Form.Item
                            name='companyAddress'
                            label='详细地址'
                            //noStyle
                            rules={[
                                { required: true, message: '请输入详细地址！' },
                                { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '只允许出现文字，数字，英文！' },
                            ]}
                        >
                            <Input style={{ width: '70%' }} placeholder="详细地址" />
                        </Form.Item>

                        {/* </Input.Group>
                    </Form.Item> */}
                        <Form.Item label="公司简介">
                            <Form.Item
                                name="companyProfile"
                            // rules={[{ required: true }]}
                            // style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            >
                                <TextArea maxLength={255} autoSize={{ minRows: 4 }} style={{ width: '70%' }} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label=" " colon={false}>
                            <Button type="primary" htmlType="submit">
                                提交申请
                        </Button>
                        </Form.Item>
                        <Form.Item
                            label='公司资质证明图片'
                            name='companyQualifications'
                            tooltip='最多可以上传五张照片'
                        >
                            <Upload
                                maxCount={5}
                                action="http://localhost:8080/user/upload_pic"
                                accept="image/*"
                                listType="picture-card"
                                name='pic' //发到后台的文件参数名
                                //onPreview={this.handlePreview} 
                                onChange={({ file, fileList }) => {
                                    if (file.status === "done") {
                                        if (file.response.status === 'success') {
                                            const { data } = file.response;
                                            this.setState(prevState =>{
                                                const result = {...prevState}
                                                const oldUrlArr = result.qualificationsUrlArr;
                                                console.log(data)
                                                result.qualificationsUrlArr = oldUrlArr+','+data
                                                return result;
                                            })
                                        }
                                    }
                                }}
                                showUploadList={true}
                            >
                                <Button type='link'>上传</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default RegisterCompany;