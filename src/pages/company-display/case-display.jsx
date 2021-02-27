import React from 'react';
import {Card, Col, Row, Tag} from 'antd';
import H3 from '../../assets/images/huodong3.jpg';

const colPhone = {
    xl: 24,
    ls: 24,
    sm: 24,
    lg: 24
}

class CaseDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Card>
                <Row>
                    <Col {...colPhone} xl={16}>
                        <Row 
                            title='世纪花园'
                            bordered={false}
                        >
                            <Col span={14}><img src={H3} style={{width:480,height:300}} alt='封面图片' /></Col>
                            <Col span={10}>
                                <p style={{fontSize:18,fontWeight:'bold'}}>世纪花园</p>
                                <p><Tag color='green'>188m<sup>2</sup></Tag></p>
                                <p>造价：<span style={{fontSize:26,color:'#dd4848'}}>35万</span></p>
                                <p></p>
                            </Col>
                        </Row>
                    </Col>
                    <Col {...colPhone} xl={8}>

                    </Col>
                </Row>
            </Card>
        )
    }
}
export default CaseDisplay;