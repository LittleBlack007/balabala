import React from 'react';
import {Upload, Button, message, Image} from 'antd';
import {updatePicUrl,reqLogin, reqCompanyLogin,reqStaffLogin} from '../../api/index';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

class ChangeImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl:'',
        };
    }

    /*file: 当前操作文件信息对象 fileList: 所有文件信息对象的数组 */
    handleChange = async ({ file, fileList }) => {
        const {api} = this.props;
        const type = api.match(/^\/[a-z]*/g)[0].substr(1); //截取地址第一个单词作为表示
        if(file.status === "done"){
            if(file.response.status === 'success'){
                const {data} = file.response;
                let typeImg = type+"Img";  //后端接受图片地址字段为xxxImg
                const result = await updatePicUrl(api,{[typeImg]:data,id:memoryUtils[type].id});

                if(result.data.status === 'success' && result.data.data === 1){
                    let newOne;
                    switch(type){
                        case 'user':
                            newOne = await reqLogin({userPetName:memoryUtils.user.userPetName,userPwd:memoryUtils.user.userPwd});
                            storageUtils.saveUser(newOne.data.data); 
                            break;
                        case 'company':
                            newOne = await reqCompanyLogin({companyPetName:memoryUtils.company.companyPetName,companyPwd:memoryUtils.company.companyPwd});
                            storageUtils.saveCompany(newOne.data.data); 
                            break;
                        case 'staff':
                            newOne = await reqStaffLogin({staffPetName:memoryUtils.staff.staffPetName,staffPwd:memoryUtils.staff.staffPwd});
                            storageUtils.saveStaff(newOne.data.data); 
                            break;
                        default:
                            
                    }
                    
                    this.setState({imgUrl:data})
                    message.success('修改成功');
                }else{
                    message.error('修改失败')
                }
            }else{
                message.error("修改失败")
            }
        }
    }

    componentDidMount(){
        this.setState({imgUrl:this.props.imgUrl})
    }

    render() {
        return (
            <div style={{margin:'15px 0px',textAlign:'center'}}>
                    <img alt='图片'  src={this.state.imgUrl} width='200px' height='200px' />
                    <div style={{marginTop:'10px'}}>
                        <Upload 
                            maxCount={1}
                            action="http://localhost:8080/user/upload_pic" 
                            accept="image/*"
                            name='pic' //发到后台的文件参数名
                            //onPreview={this.handlePreview} 
                            onChange={this.handleChange}
                            showUploadList={false}
                        > 
                            <Button type='primary'>修改</Button> 
                        </Upload>
                    </div>
            </div>
        )
    }
}
export default ChangeImage;