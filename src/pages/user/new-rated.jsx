import React from 'react';
import { Modal, Form, Input, Button, Select, Radio } from 'antd';
import PictureWall from '../../components/picture-wall';

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

class NewRated extends React.Component {
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
            <>
                <Button type="link" onClick={this.showModal} disabled={this.props.disabled}>
                    评价
                </Button>
                <Modal title="评价" visible={modalVisible} onCancel={this.handleCancel} footer={null} width={'70%'}>
                    <Form
                        {...formItemLayout}
                        ref={this.formRef}
                        name="new_rated"
                        onFinish={this.onFinish}
                        // initialValues={
                        scrollToFirstError
                    >
                        <Form.Item
                            label='评价等级'
                            name='rated'
                            rules = {[
                                {required:true,message:'请选择评价等价。'}
                            ]}
                        >
                            <Radio.Group>
                                 <Radio value={1}>好</Radio>
                                 <Radio value={2}>中</Radio>
                                 <Radio value={3}>差</Radio>
                             </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label='评价内容'
                            name='content'
                        >
                            <TextArea />
                        </Form.Item>
                        <Form.Item
                            label='上传图片'
                            name='imges'
                        >
                            <PictureWall />
                        </Form.Item>
                        
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                确定添加
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}
export default NewRated;