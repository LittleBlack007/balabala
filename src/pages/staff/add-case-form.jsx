import React from 'react';
import { Modal, Form, Input, Button, Select,InputNumber, Upload, message } from 'antd';
import RichTextEditor from '../../components/rich-text-editor'
import {createCase} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils';

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
            imgUrl:'',
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

    onFinish = async (values) => {
        const staffId = parseInt(memoryUtils.staff.id);
        const companyId = parseInt(memoryUtils.staff.companyId);
        values.caseIndeximg = this.state.imgUrl;
        values.staffId = staffId;
        values.companyId = companyId;
        values.casePosition = 0;
        values.caseContent = this.editorRef.current.getDetail();
        const result = await createCase(values);
        if(result.data && result.data.data ===1){
            message.success("添加成功");
            this.props.history.push('/staff-manage');
        }else{
            message.error("创建失败");
        }
        //console.log(this.formRef.current.getFieldValue('company_pet_name'))
    };

    componentDidMount() {
        //this.formRef.current.setFieldsValue({ "company_pet_name": '平行空间', "company_name": '平行空间' })
    }



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
                                            console.log(data)
                                            this.setState({ imgUrl: data })
                                        }
                                    }
                                }}
                                showUploadList={true}
                            >
                                <Button type='link'>上传封面</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label='案例标题'
                            name="caseTitle"
                            rules={[
                                { required: true, message: '请输入标题！' },
                                { max: 12, message: '标题最大长度为12位！' },
                            ]}
                        >
                            <Input placeholder="案例封面标题" />
                        </Form.Item>
                        <Form.Item
                            label='造价预算'
                            name="caseBudget"
                            rules={[
                                { required: true, message: '请输入您的预算！' },
                            ]}
                        >
                            <InputNumber 
                                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                placeholder="预算(￥)"  
                                style={{width:'200px'}} />
                        </Form.Item>
                        <Form.Item
                            label='房屋类型'
                            name="caseType"
                            rules={[
                                { required: true, message: '请选择您的房屋类型' },
                            ]}
                        >
                            <Select placeholder='请选择'>
                                <Option value={0}>普通住宅</Option>
                                <Option value={1}>复式别墅</Option>
                                <Option value={2}>局部装修</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='房型'
                            name="layoutId"
                            rules={[
                                { required: true, message: '请选择您的房型' },
                            ]}
                        >
                            <Select placeholder='请选择'>
                                <Option value='0'>一居室</Option>
                                <Option value='1'>二居室</Option>
                                <Option value='2'>三居室</Option>
                                <Option value='3'>四居室</Option>
                                <Option value='4'>其他</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='设计风格'
                            name="styleId"
                            rules={[
                                { required: true, message: '请选择设计风格' },
                            ]}
                        >
                            <Select placeholder='请选择'>
                                <Option value={1}>欧式</Option>
                                <Option value={2}>中式</Option>
                                <Option value={3}>简约</Option>
                                <Option value={4}>混搭</Option>
                                <Option value={5}>其他</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='面积'
                            name="caseArea"
                            rules={[
                                { required: true, message: '请输入您的房屋面积！' },
                            ]}
                        >
                            <InputNumber style={{width:'200px'}} placeholder={"面积(平方米)"} />
                        </Form.Item>
                        <Form.Item
                            label='案例正文内容'
                            name='caseContent'
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