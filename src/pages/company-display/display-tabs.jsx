import React from 'react';
import { Tabs, Card, Row, Col, Pagination, Avatar  } from 'antd';
import { Link } from 'react-router-dom';
// import {tickFormatter} from '../../utils/formatter.ts';

const { TabPane } = Tabs;
const { Meta } = Card;
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
const shejishidata = [
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
    { name: '巴拉巴拉', position: '总监设计师', goodAt: '现代 美式 中式 北欧 混搭', time: '11年', caseNum: 20 },
]


class DisplayTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onTabChange = (key) => {
        console.log(key);
    }

    onPaginationChange = (pageNumber) => {
        console.log(pageNumber)
    }

    render() {
        return (
            <Card>
                <Tabs defaultActiveKey="case" onChange={this.onTabChange} type='card'
                // tabBarExtraContent={<Button type='link'>查看更多</Button>}
                >
                    <TabPane tab="竣工案例" key="case">
                        <Row gutter={16}>
                            {
                                anlidata.map(item => (
                                    <Link to='/balabala/company-display/case'>
                                        <Col style={{ marginTop: 16 }}>
                                            <Card
                                                hoverable
                                                style={{ width: 290, }}
                                                cover={<img alt="example" style={{ height: 200 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
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
                    </TabPane>
                    <TabPane tab="设计团队" key="design">
                        <Row gutter={16}>
                            {
                                shejishidata.map(item => (
                                    <Link>
                                        <Col>
                                            <Card
                                                style={{ width: 300, marginTop: 16 }}
                                                actions={[
                                                    <><p style={{ color: '#F17722' }}>{item.time}</p><p>从业年限</p></>,
                                                    <><p style={{ color: '#F17722' }}>{item.caseNum}套</p><p>案例个数</p></>,
                                                ]}
                                            >
                                                <Meta
                                                    avatar={
                                                        <Avatar size={86} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                    }
                                                    title={<><span style={{ fontWeight: 500, fontSize: 20 }}>{item.name}</span><span style={{  fontSize: 14 }}>{item.position}</span></>}
                                                    description={`擅长：${item.goodAt}`}
                                                />
                                            </Card>
                                        </Col>
                                    </Link>
                                ))
                            }
                        </Row>
                    </TabPane>
                    <TabPane tab="工长团队" key="foreman">
                    <Row gutter={16}>
                            {
                                shejishidata.map(item => (
                                    <Link>
                                        <Col>
                                            <Card
                                                style={{ width: 300, marginTop: 16 }}
                                                actions={[
                                                    <><p style={{ color: '#F17722' }}>{item.time}</p><p>从业年限</p></>,
                                                    <><p style={{ color: '#F17722' }}>{item.caseNum}个</p><p>工地个数</p></>,
                                                ]}
                                            >
                                                <Meta
                                                    avatar={
                                                        <Avatar size={86} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                    }
                                                    title={<p><br />{item.name}</p>}
                                                />
                                            </Card>
                                        </Col>
                                    </Link>
                                ))
                            }
                        </Row>
                    </TabPane>
                </Tabs>
            </Card>

        )
    }
}
export default DisplayTabs;