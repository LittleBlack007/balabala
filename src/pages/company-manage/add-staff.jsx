import React from 'react';
import { Modal, Form, Input, Button, Select, message, Upload } from 'antd';
import {registerStaff,getKindNoPage} from '../../api/index'
import moment from 'momnet'

const {TextArea} = Input
const { Option } = Select;
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

class AddStaff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            a: []
        };
        this.formRef = React.createRef();
    }

    showModal = () => {
        this.setState({ modalVisible: true })
    };

    handleOk = () => {
        this.setIsModalVisible(false);
    };

    handleCancel = () => {
        this.setState({ modalVisible: false })
    };

    onFinish = async values => {
        values.staffImg = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1878364230,3474122270&fm=26&gp=0.jpg'
        values.staffStart = moment().format("YYYY-MM-DD HH:mm:ss");
        values.companyId = this.props.companyId;
        values.staffStatus = 1;
        const result = await registerStaff(values);
        if(result.status === 200){
            if(result.data && result.data.status==='success' && result.data.data>0){
                message.success("注册成功");
                this.handleCancel();
            }else{
                message.error("账号已经存在！")
            }
        }else{
            message.error("注册失败")
        }

    }

    async componentDidMount() {
        const kind = await getKindNoPage();
        this.setState({ a: kind.data.data })
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <>
                <Button type="link" onClick={this.showModal} style={{ color: 'white' }}>
                    添加员工
                </Button>
                <Modal title="添加新员工" visible={modalVisible} onCancel={this.handleCancel} footer={null} width={'70%'}>
                <Form
                        {...formItemLayout}
                        ref={this.formRef}
                        name="register"
                        onFinish={this.onFinish}
                        // initialValues={
                        scrollToFirstError
                    >
                        <Form.Item
                            label='用户名'
                            name="staffPetName"
                            rules={[
                                { required: true, message: '请输入用户名！' },
                                { min: 4, message: '用户名最小长度为4位！' },
                                { max: 12, message: '用户名最大长度为12位！' },
                                { pattern: /^[A-Za-z1-9_]+$/, message: '用户名以数字，字母和下划线构成！' }
                            ]}
                        >
                            <Input placeholder="用户名" style={{width:'20%'}} />
                        </Form.Item>
                        <Form.Item
                            name="staffPwd"
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
                            dependencies={['staffPwd']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('staffPwd') === value) {
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
                            name='kindId'
                            label='职业'
                            rules={[
                                { required: true, message: '请选择职业类型。' }
                            ]}
                        >
                            <Select  style={{width:'20%'}}>
                                {this.state.a ? this.state.a.map(item => (<Option value={item.id}>{item.kindName}</Option>)) : null}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="staffName"
                            label="真实姓名"
                            tooltip="What do you want others to call you?"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your nickname!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input  style={{width:'20%'}}/>
                        </Form.Item>

                        <Form.Item
                            name="staffPhone"
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
                                    width: '30%',
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
                            label='省份'
                            name='staffProvince'
                            //noStyle
                            rules={[
                            
                                { pattern: /^[\u4E00-\u9FA5]+$/, message: '请输入汉字！' }
                            ]}
                        >
                            <Input style={{ width: '20%' }} placeholder="省份" />
                        </Form.Item>
                        <Form.Item
                            label='城市'
                            name='staffCity'
                            //noStyle
                            rules={[
                                { required: true, message: '请输入城市！' },
                                { pattern: /^[\u4E00-\u9FA5]+$/, message: '请输入汉字！' },
                            ]}
                        >
                            <Input style={{ width: '20%' }} placeholder="市" />
                        </Form.Item>
                        <Form.Item
                            name='staffAddress'
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
                        <Form.Item
                            label="个人简介"
                            name="staffProfile"
                        // rules={[{ required: true }]}
                        // style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <TextArea maxLength={255} autoSize={{ minRows: 4 }} style={{ width: '70%' }} />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                提交修改
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}
export default AddStaff;