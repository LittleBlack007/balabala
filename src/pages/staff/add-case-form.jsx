import React from 'react';
import { Modal, Form, Input, Button, Select,InputNumber } from 'antd';
import RichTextEditor from '../../components/rich-text-editor'
import ChangeImage from '../../components/change-image';

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

class AddCaseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            a: []
        };
        this.formRef = React.createRef();
        this.editorRef = React.createRef();
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
        const a = [{ key: '1', name: '设计师' }, { key: '2', name: '工人' }]
        this.setState({ a: a })
        //this.formRef.current.setFieldsValue({ "company_pet_name": '平行空间', "company_name": '平行空间' })
    }

    onFinish = values => {
        console.log('Received values of form: ', values);
        console.log(this.formRef.current.getFieldValue('company_pet_name'))
    };


    render() {
        const { modalVisible } = this.state;
        const {buttonName} = this.props;
        return (
            <>
                <Button type="link" onClick={this.showModal}>
                    {buttonName}
                </Button>
                <Modal title="创建案例" visible={modalVisible} onCancel={this.handleCancel} footer={null} width={'70%'}>
                    <Form
                        {...formItemLayout}
                        ref={this.formRef}
                        name="register"
                        onFinish={this.onFinish}
                        // initialValues={
                        scrollToFirstError
                    >
                        <Form.Item
                            label='案例封面'
                            name="case_indexImg"
                            rules={[
                                { required: true, message: '请上传封面！' },
                            ]}
                        >
                            <ChangeImage />
                        </Form.Item>
                        <Form.Item
                            label='案例标题'
                            name="case_title"
                            rules={[
                                { required: true, message: '请输入用户名！' },
                                { max: 12, message: '用户名最大长度为12位！' },
                            ]}
                        >
                            <Input placeholder="案例封面标题" />
                        </Form.Item>
                        <Form.Item
                            label='造价预算'
                            name="case_budget"
                            rules={[
                                { required: true, message: '请输入您的预算！' },
                            ]}
                        >
                            <InputNumber placeholder="预算(￥)"  style={{width:'200px'}} />
                        </Form.Item>
                        <Form.Item
                            label='房屋类型'
                            name="case_house_type"
                            rules={[
                                { required: true, message: '请选择您的房屋类型' },
                            ]}
                        >
                            <Select placeholder='请选择'>
                                <Option value='0'>普通住宅</Option>
                                <Option value='1'>复式别墅</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='房屋属性'
                            name="case_status"
                            rules={[
                                { required: true, message: '请选择您的房屋属性' },
                            ]}
                        >
                            <Select placeholder='请选择'>
                                <Option value='0'>毛坯房</Option>
                                <Option value='1'>老屋翻新</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='房型'
                            name="case_layout"
                            rules={[
                                { required: true, message: '请选择您的房型' },
                            ]}
                        >
                            <Select placeholder='请选择'>
                                <Option value='0'>两室一厅</Option>
                                <Option value='1'>一室一厅</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='设计风格'
                            name="case_sytle"
                            rules={[
                                { required: true, message: '请选择设计风格' },
                            ]}
                        >
                            <Select placeholder='请选择'>
                                <Option value='0'>欧式</Option>
                                <Option value='1'>中式</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='面积'
                            name="case_area"
                            rules={[
                                { required: true, message: '请输入您的房屋面积！' },
                            ]}
                        >
                            <InputNumber style={{width:'200px'}} placeholder={"面积(平方米)"} />
                        </Form.Item>
                        <Form.Item
                            label='案例正文内容'
                            name='case_content'
                        >
                            <RichTextEditor  ref={this.editorRef} />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                确定提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}
export default AddCaseForm;