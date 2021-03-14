import React from 'react';
import { Card, Col, Row, Tag, Avatar, Button, Collapse, List, Comment, Pagination, Tooltip, Rate } from 'antd';
import H3 from '../../assets/images/huodong3.jpg';
import { Link } from 'react-router-dom';
import moment from 'moment';

const { Panel } = Collapse;
const { Meta } = Card;
const colPhone = {
    xl: 24,
    ls: 24,
    sm: 24,
    lg: 24
}
const personData = {
    name: '王巴拉',
    position: '设计师总监',
    goodAt: '现代、简约、北欧、美式 作品分布： 航武家园 、南郊一品、鹤沙航城航武嘉园',
    time: '8年',
    praiseRate: 4.5
}
const postDetailData = '<p>123</p><p>321</p><ul><li><span style="font-size: 24px;">2222</span></li></ul><ol><li><span style="font-size: 24px;">21321</span></li></ol>'
const anlidata = [
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
    { name: '世纪花园', cost: '88万', area: 188 },
]
const data = [
    {
        actions: [<span key="comment-list-reply-to-0">差评</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <><p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
                
            </p>
            <img src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' style={{width:'100px',height:'100px'}}  alt='图片'/>&nbsp;
            <img src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' style={{width:'100px',height:'100px'}}  alt='图片'/>
            </>
        ),
        datetime: (
            <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
    {
        actions: [<span key="comment-list-reply-to-0">好评</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
];

class StaffDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Card>
                <Row gutter={16}>
                    <Col {...colPhone} xl={18} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#f0f0f0', padding: 5 }}>
                        <Collapse defaultActiveKey={['1']} style={{ margin: '20px 20px' }}>
                            <Panel header="业主评价" key="1">
                                <List
                                    className="comment-list"
                                    header={`${data.length} 条评价`}
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={item => (
                                        <li>
                                            <Comment
                                                actions={item.actions}
                                                author={item.author}
                                                avatar={item.avatar}
                                                content={item.content}
                                                datetime={item.datetime}
                                            />

                                        </li>
                                    )}
                                />
                            </Panel>
                            <Panel header="个人案例" key="2">
                                <Row gutter={16}>
                                    {
                                        anlidata.map(item => (
                                            <Link to='/balabala/company-display/case'>
                                                <Col style={{ marginTop: 16 }}>
                                                    <Card
                                                        hoverable
                                                        style={{ width: 290, }}
                                                        cover={<img alt="example" style={{ height: 160 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                                    >
                                                        <Meta
                                                            title={item.name}
                                                            description={
                                                                <div style={{ fontSize: 14, color: '#999' }}>
                                                                    <span> {item.cost} | {item.area}m<sup>2</sup></span>
                                                                </div>
                                                            }
                                                        />
                                                    </Card>
                                                </Col>
                                            </Link>
                                        ))
                                    }
                                </Row>
                                <div style={{ textAlign: 'center', marginTop: 20 }}>
                                    <Pagination defaultPageSize={12} showQuickJumper hideOnSinglePage defaultCurrent={1} total={50} onChange={this.onPaginationChange} />
                                </div>
                            </Panel>
                        </Collapse>
                    </Col>
                    <Col {...colPhone} xl={6}>
                        <Card style={{marginBottom:'20px'}}>
                            <div style={{ width: '100%', height: 96, marginTop: 20, textAlign:'center' }}>
                                <Rate count={5} defaultValue={4.5} disabled allowHalf />&nbsp;&nbsp;
                                <span>92.23% 好评率</span>
                                <p>订单数：88888</p>
                            </div>
                        </Card>
                        <Card title='Ta的信息' bodyStyle={{ color: '#f0f0ff0' }}>
                            <Row>
                                <Col {...colPhone} xl={12}>
                                    <Avatar size={86} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </Col>
                                <Col {...colPhone} xl={12} style={{ marginTop: '20px' }}>
                                    <div style={{ fontWeight: 'bold', color: '#666666' }}>{personData.name}</div>
                                    <div>工作年限：{personData.time}</div>
                                </Col>
                            </Row>
                            <div style={{ padding: '10px' }}>&nbsp;&nbsp;个人简介:{personData.goodAt}</div>
                            <div style={{ textAlign: 'center' }}>
                                <Button type='primary' style={{ width: '200px' }}>电话号码：13232672652</Button>
                            </div>
                            <div style={{ textAlign: 'center', marginTop:'20px' }}>
                                <Button type='primary' style={{ width: '200px' }}>创建订单</Button>
                            </div>
                        </Card>
                    
                    </Col>
                </Row>
            </Card>
        )
    }
}
export default StaffDisplay;