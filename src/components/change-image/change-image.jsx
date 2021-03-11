import React from 'react';

class ChangeImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div style={{margin:'15px 0px',textAlign:'center'}}>
                    <img alt='公司标志' src="http://www.jituwang.com/uploads/allimg/160226/257934-160226225P747.jpg" width='200px' height='200px' />
                    <div>修改</div>
                </div>
        )
    }
}
export default ChangeImage;