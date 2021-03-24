import React from 'react';
import { Modal, Form, Input, Button, Select, Card,InputNumber } from 'antd';
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
                        label='佣金'
                        name="orderCommission"
                        rules={[
                            { required: true, message: '请输入本单佣金！' },
                        ]}
                    >
                        <InputNumber 
                            style={{width:'35%'}}
                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item
                        name='orderType'
                        label='订单类型'
                        rules={[
                            { required: true, message: '请选择职业类型。' }
                        ]}
                    >
                        <Select placeholder="请选择订单类型" style={{width:'20%'}}>
                           <Option value='设计'>设计</Option>
                           <Option value='施工'>施工</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='地址'
                        name='orderAddress'
                        rules={[
                            { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '只允许出现文字，数字，英文！' },
                        ]}
                    >
                            <Input style={{ width: '60%' }} placeholder="施工地址" />
                    </Form.Item>
                    <Form.Item
                        name="orderPhone"
                        label="联系电话"
                        rules={[
                            {
                                required: true,
                                message: '请输入电话号码',
                            },
                            { pattern: /^1[3456789]\d{9}$/, message: '不是正确的手机号码' },
                        ]}
                    >
                        <Input
                            style={{ width: '60%',}}
                        />
                    </Form.Item>
                    <Form.Item
                        label="订单要求简要"
                        name="orderContent"
                    // rules={[{ required: true }]}
                    // style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                        <TextArea maxLength={255} autoSize={{ minRows: 4 }} style={{ width: '75%' }} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            提交订单
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        )
    }
}
export default AddOrderForm;