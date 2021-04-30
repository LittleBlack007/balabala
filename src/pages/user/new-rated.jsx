import React from 'react';
import { Modal, Form, Input, Button, Select, Radio,Upload,Comment,Image, message,Avatar, Tooltip } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import {getRateById,createRate} from '../../api/index';
import moment from 'moment'

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
            rateData:{},
            imgs:''
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
        const userId = parseInt(memoryUtils.user.id);
        const {orderId,staffId} = this.props
        values.userId = userId;
        values.orderId = orderId;
        values.staffId = staffId;
        values.rateImgs = this.state.imgs;
        values.rateTime = moment().format("YYYY-MM-DD HH:mm:ss");
        console.log('Received values of form: ', values);
        const result = await createRate(values);
        if(result.data && result.data.data >= 1){
            message.success("成功");
            this.props.getOrderData(1,userId,2);
            this.handleCancel()
        }else{
            message.error("失败")
        }
    };

    async componentDidMount() {
        const {rateId} = this.props
        if(rateId){
            this.getRateData(rateId);
        }
    }
    getRateData = async(id) =>{
        const result = await getRateById(id);
        this.setState({rateData:result.data.data})
    }

    render() {
        const {rateId,type} = this.props
        const { modalVisible,rateData } = this.state;
        const user = memoryUtils.user
        return (
            <>
                <Button type="link" onClick={this.showModal} disabled={!rateId} >
                    {rateId?'查看评价':(type === 'staff'?'待评价':'去评价')}
                </Button>
                <Modal title="评价" visible={modalVisible} onCancel={this.handleCancel} footer={null} width={'70%'}>
                    {!rateId
                    ?<Form
                        {...formItemLayout}
                        ref={this.formRef}
                        name="new_rated"
                        onFinish={this.onFinish}
                        // initialValues={
                        scrollToFirstError
                    >
                        <Form.Item
                            label='评价等级'
                            name='rateGrade'
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
                            name='rateContent'
                        >
                            <TextArea />
                        </Form.Item>
                        <Form.Item
                            label='图片'
                            name='rateImgs'
                            tooltip='最多可以上传3张照片'
                        >
                            <Upload
                                maxCount={3}
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
                                                const oldUrlArr = result.imgs;
                                                console.log(data)
                                                result.imgs = oldUrlArr+'$'+data
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
                        
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                确定添加
                            </Button>
                        </Form.Item>
                    </Form>
                    :<Comment
                    actions={[rateData.rateGrade === 1 ? '好评':(rateData.rateGrade === 2?'中评':'差评')]}
                    author={user.userName}
                    avatar={
                      <Avatar src={user.userImg}/>}
                    content={
                        <p>
                            <p>{rateData.rateContent}</p>
                            {rateData.rateImgs?(rateData.rateImgs.split("$").map(item => item !== ""?<Image width={200} src={item}></Image>:null)):null}
                        </p>
                        }
                    datetime={
                      <Tooltip title={moment(rateData.rateTime).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(rateData.rateTime).fromNow()}</span>
                      </Tooltip>
                    }
                  />
                    }
                </Modal>
            </>
        )
    }
}
export default NewRated;