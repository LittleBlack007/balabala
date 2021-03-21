import React from 'react';
import { Modal, Form, Input, Button, Select, Card } from 'antd';
import moment from 'momnet';

const { TextArea } = Input
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

class AddOrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
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

    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    componentDidMount() {
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <Card>
                <Form
                    {...formItemLayout}
                    ref={this.formRef}
                    name="new_order"
                    onFinish={this.onFinish}
                    // initialValues={
                    scrollToFirstError
                >
                    <Form.Item
                        label=''
                        name="staff_pet_name"
                        rules={[
                            { required: true, message: '请输入用户名！' },
                            { min: 4, message: '用户名最小长度为4位！' },
                            { max: 12, message: '用户名最大长度为12位！' },
                            { pattern: /^[A-Za-z1-9_]+$/, message: '用户名以数字，字母和下划线构成！' }
                        ]}
                    >
                        <Input placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name='staff_kind'
                        label='职业'
                        rules={[
                            { required: true, message: '请选择职业类型。' }
                        ]}
                    >
                        <Select>
                            {this.state.a ? this.state.a.map(item => (<Option key={item.key}>{item.name}</Option>)) : null}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='staff_sex'
                        label='性别'
                        rules={[
                            { required: true, message: '请选择职业类型。' }
                        ]}
                    >
                        <Select placehold='性别'>
                            <Option value={0}>女</Option>
                            <Option value={1}>男</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
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

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="staff_name"
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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
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
                    <Form.Item
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
                    </Form.Item>
                    <Form.Item label="现住地址">
                        <Input.Group compact>
                            <Form.Item
                                name={['address', 'province']}
                                noStyle
                                rules={[
                                    { required: true, message: '请输入省份！' },
                                    { pattern: /^[\u4E00-\u9FA5]+$/, message: '请输入汉字！' }
                                ]}
                            >
                                <Input style={{ width: '10%' }} placeholder="省份" />
                            </Form.Item>
                            <Form.Item
                                name={['address', 'city']}
                                noStyle
                                rules={[
                                    { required: true, message: '请输入城市！' },
                                    { pattern: /^[\u4E00-\u9FA5]+$/, message: '请输入汉字！' },
                                ]}
                            >
                                <Input style={{ width: '10%' }} placeholder="市" />
                            </Form.Item>
                            <Form.Item
                                name={['address', 'address']}
                                noStyle
                                rules={[
                                    { required: true, message: '请输入详细地址！' },
                                    { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '只允许出现文字，数字，英文！' },
                                ]}
                            >
                                <Input style={{ width: '80%' }} placeholder="详细地址" />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item
                        label="个人简介"
                        name="person_profile"
                    // rules={[{ required: true }]}
                    // style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                        <TextArea maxLength={255} autoSize={{ minRows: 4 }} style={{ width: '75%' }} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            确定添加
                            </Button>
                    </Form.Item>
                </Form>

            </Card>
        )
    }
}
export default AddOrderForm;