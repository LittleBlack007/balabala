/*富文本编程器组件 */
import React, { Component } from 'react';
import {message} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default class RichTextEditor extends Component {
    constructor(props) {
        super(props) // 根据传入的 html 文本初始显示 
        const detail = this.props.detail 
        let editorState
        if (detail) { // 如果传入才需要做处理 
            const blocksFromHtml = htmlToDraft(detail)
            const { contentBlocks, entityMap } = blocksFromHtml
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
            editorState = EditorState.createWithContent(contentState)
        } else {
            editorState = EditorState.createEmpty()
        }
        // 初始化状态 
        this.state = {
            editorState
        }
    }
    /*当输入改变时立即保存状态数据 */

    onEditorStateChange = (editorState) => {
        this.setState({ editorState })
    }
    /*得到输入的富文本数据 */
    getDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    }

    // uploadImageCallBack=(file)=>{
    //     return new Promise(
    //       (resolve, reject) => {
    //         let formData = new FormData()
    //         formData.append('file', file)
    //         let subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo')) || {}
    //         fetch(`/balabala/images`, {
    //           method: 'POST',
    //           headers: {
    //           'store-user-token':subsystemTourInfo.token
    //           },
    //           body: formData,
    //         }).then(res => {
    //           return res.json()
    //         }).then(res => {
    //           if (res.err !== 0) {
    //             message.error('图片上传失败', 2)
    //             reject(res)
    //           } else {
    //             resolve({data: {link: res.fileId}})
    //           }
      
    //         }).catch(err => {
    //           reject(err)
    //         })
    //       }
    //     )
    //   }
    imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let img = new Image();
            // let url = ''
            reader.onload = function (e) {
                img.src = this.result
            };

            img.onload = function () {
                //console.log(img); // 获取图片
                // console.log(img.src.length)
                // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');

                // 图片原始尺寸
                let originWidth = this.width;
                let originHeight = this.height;

                // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
                let maxWidth = 400,
                    maxHeight = 500;
                // 目标尺寸
                let targetWidth = originWidth,
                    targetHeight = originHeight;
                // 图片尺寸超过300x300的限制
                if(originWidth > maxWidth || originHeight > maxHeight) {
                    if(originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }
                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);
                // 图片压缩
                context.drawImage(img, 0, 0, targetWidth, targetHeight);
                /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/

                //压缩后的图片转base64 url
                /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
                  * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
                let newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式

                resolve({
                    data: {
                        link: newUrl
                    }
                })

                //也可以把压缩后的图片转blob格式用于上传
                // canvas.toBlob((blob)=>{
                //     console.log(blob)
                //     //把blob作为参数传给后端
                // }, 'image/jpeg', 0.92)
            }
        }
    );

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                editorStyle={{ height: 250, border: '1px solid #000', padding: '0 30px' }}
                onEditorStateChange={this.onEditorStateChange} 
                toolbar={{
                    image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        alignmentEnabled: true,   // 是否显示排列按钮 相当于text-align
                        uploadCallback: this.imageUploadCallBack,  //图片的处理 （但是仅限于本地上传的，url方式不经过此函数）
                        previewImage: true,
                        inputAccept: 'image/*',
                        alt: {present: false, mandatory: false}
                    }
                  }}
            />

        )
    }
}