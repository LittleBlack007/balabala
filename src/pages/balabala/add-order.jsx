import React from 'react';
import { Modal, Form, Input, Button, Select, Card,InputNumber, message } from 'antd';
import moment from 'momnet';
import memoryUtils from '../../utils/memoryUtils';
import {Redirect} from 'react-router-dom';
import { addOrder } from '../../api';

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

    onFinish = async (values) => {
        const userId = memoryUtils.user.id
        const {staffId,companyId} = this.props.match.params
        values.userId = userId;
        values.companyId = companyId;
        values.staffId = staffId;
        values.orderStatus = 0
        values.orderRateStatus = 0
        values.orderCreateTime =moment().format('yyyy-MM-DD HH:mm:ss')
        const result = await addOrder(values);
        if(result.data && result.data.data>0){
            message.success('创建成功')
            this.props.history.push(`/balabala/staff/${staffId}`)
        }else{
            message.error('创建失败')
        }
    };

    async componentDidMount() {
        
    }

    render() {
        const user = memoryUtils.user;
        if(!user.userStatus){
            return <Redirect to='/login/user'/>
        }
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
                            parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item
                        name='orderType'
                        label='订单类型'
                        rules={[
                            { required: true, message: '请选择订单类型。' }
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