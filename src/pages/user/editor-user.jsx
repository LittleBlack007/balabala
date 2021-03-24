import React from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import ChangeImage from '../../components/change-image';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils'
import {updateUser,reqLogin} from '../../api';

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

class EditorUser extends React.Component {
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

    onFinish = async (values) => {
        values.id = memoryUtils.user.id;
        const result = await updateUser(values);
        if(result.data.status === "success"){
            const newUser = await reqLogin({userPetName:memoryUtils.user.userPetName,userPwd:memoryUtils.user.userPwd});
            storageUtils.saveUser(newUser.data.data); 
            message.success('修改成功')
            window.history.go("/user-manage");
        }
    };

    onChangePwd = async (values) => {
        const newPwd = values.password
        const result = await updateUser({id:memoryUtils.user.id,userPwd:newPwd});
        if(result.data.status === "success" && result.data.data === 1){
            storageUtils.removeUser(); 
            message.success('修改成功')
            window.history.go("/user-manage");
        }
    }

    componentDidMount() {
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <>
                <Button type="link" onClick={this.showModal} style={{color:'white'}}>
                    个人编辑
                </Button>
                <Modal title="编辑个人资料" visible={modalVisible} onCancel={this.handleCancel} footer={null} width={'70%'}>
                    <ChangeImage imgUrl={this.props.user.userImg} api="/user/update-user"/>
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
                    <Form name="change_pwd" onFinish={this.onChangePwd} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
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
                </Modal>
            </>
        )
    }
}
export default EditorUser;