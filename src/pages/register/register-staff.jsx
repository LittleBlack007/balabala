import React from 'react';
import {message} from 'antd';
import './register.less';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    // onFinish = async (values) => {
    //     values.id = memoryUtils.user.id;
    //     const result = await updateUser(values);
    //     if(result.data.status === "success"){
    //         const newUser = await reqLogin({userPetName:memoryUtils.user.userPetName,userPwd:memoryUtils.user.userPwd});
    //         storageUtils.saveUser(newUser.data.data); 
    //         message.success('修改成功')
    //         window.history.go(`/login/${this.props.match.params.type}`);
    //     }
    // };

    render() {
        const type = this.props.match.params.type
        return (
            <div>
                <header className='login-header'>
                    <h1>个体员工注册</h1>
                </header>
                123
            </div>
        )
    }
}
export default Register;