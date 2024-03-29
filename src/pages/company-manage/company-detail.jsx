import React from 'react';
import { Form, Input, Button, message } from 'antd';
import ChangeImage from '../../components/change-image';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {updateCompany,reqCompanyLogin} from '../../api';

const { TextArea } = Input;

class CompanyDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: { name: '' },
            checked_require: false,
            newpw: ''
        };
        this.formRef = React.createRef();
    }

    onFinish = async values => {
        values.id = memoryUtils.company.id;
        const result = await updateCompany(values);
        if(result.data.status === "success"){
            const newCompany = await reqCompanyLogin({companyPetName:memoryUtils.company.companyPetName,companyPwd:memoryUtils.company.companyPwd});
            storageUtils.saveCompany(newCompany.data.data); 
            message.success('修改成功')
            window.history.go("/company-manage");
        }
        //console.log(this.formRef.current.getFieldValue('company_pet_name'))
    };
    onChangePwd = async (values) => {
        const newPwd = values.password
        console.log(memoryUtils.company.id)
        const result = await updateCompany({id:memoryUtils.company.id,companyPwd:newPwd});
        if(result.data.status === "success" && result.data.data === 1){
            storageUtils.removeCompany(); 
            message.success('修改成功')
            window.history.go("/company-manage");
        }
    }

    componentDidMount() {
        //this.formRef.current.setFieldsValue({ "company_pet_name": '平行空间', "company_name": '平行空间' })
    }

    render() {
        return (
            <div>
                <ChangeImage imgUrl={memoryUtils.company.companyImg} api='/company/update-company'/>
                <Form 
                    initialValues={memoryUtils.company}
                    ref={this.formRef} 
                    name="company_detail" 
                    onFinish={this.onFinish} 
                    labelCol={{ span: 4 }} 
                    wrapperCol={{ span: 20 }}
                >
                    <Form.Item label="公司账户用户名">
                        <Form.Item
                            name="companyPetName"
                            noStyle
                            //initialValue={this.state.detail.name}
                        // rules={[{ required: true, message: 'Username is required' }]}
                        >
                            <Input style={{ width: 160 }} disabled />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="公司名">
                        <Form.Item
                            name="companyName"
                            noStyle
                            //initialValue={this.state.detail.name}
                        // rules={[{ required: true, message: 'Username is required' }]}
                        >
                            <Input style={{ width: 160 }} disabled />
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
                                <Input style={{ width: '10%' }} placeholder="省份" />
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
                                <Input style={{ width: '10%' }} placeholder="市" />
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
                            <TextArea maxLength={255} autoSize={{ minRows: 4 }} style={{ width: '75%' }} />
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
                    <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit">
                            提交修改
                        </Button>
                    </Form.Item>
                </Form>
                <Form name="change_pwd" onFinish={this.onChangePwd} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    <Form.Item
                        name="password"
                        label="新密码"
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
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两个密码不一致'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password style={{ width: '30%' }} />
                    </Form.Item>
                    <Form.Item label=" " colon={false}>
                        <Button type="primary" htmlType="submit">
                            修改密码
                            </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default CompanyDetail;