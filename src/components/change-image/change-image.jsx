import React from 'react';
import {Upload, Button, message} from 'antd';

class ChangeImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    /*file: 当前操作文件信息对象 fileList: 所有文件信息对象的数组 */
    handleChange = async ({ file, fileList }) => {
        console.log('handleChange()', file, fileList)
        // 如果上传图片完成 
        if (file.status === 'done') {
            const result = file.response
            if (result.status === 0) {
                message.success('上传成功了')
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name 
                file.url = url
            } else {
                message.error('上传失败了')
            }
        } else if (file.status === 'removed') { // 删除图片 
            //const result = await reqDeleteImg(file.name)
            const result = {status:1} //未完善后端
            if (result.status === 0) {
                message.success('删除图片成功')
            } else {
                message.error('删除图片失败')
            }
        }
        // 更新 fileList 状态 
        this.setState({ fileList })
    }

    render() {
        return (
            <div style={{margin:'15px 0px',textAlign:'center'}}>
                    <img alt='公司标志' src="http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg" width='200px' height='200px' />
                    <div>
                        <Upload 
                            maxCount={1}
                            action="/manage/img/upload" 
                            accept="image/*"
                            name='imgs' //发到后台的文件参数名
                            //onPreview={this.handlePreview} 
                            onChange={this.handleChange} 
                        > 
                            <Button type='primary'>修改</Button> 
                        </Upload>
                    </div>
            </div>
        )
    }
}
export default ChangeImage;