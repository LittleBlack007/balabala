import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Avatar, Row, Col, Card, Statistic, Tooltip, Table, Switch, Pagination, Collapse, Comment, List, Modal } from 'antd';
import moment from 'momnet';
import AddCaseForm from './add-case-form';
import EditorStaff from './editor-staff';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

const { Panel } = Collapse;
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
const colPhone = {
    xl: 24,
    ls: 24,
    sm: 24,
    lg: 24
}
const { Meta } = Card;

const dataSource = {
    doing: [
        {
            order_id: '11231231231a2',
            customer_phone:'13232672652',
            customer_name: '李四',
            work_address: '广东省吴川市巴拉巴拉村',
            status: '进行中',
            commission: 10000,
        },
        {
            order_id: '11231231231d2',
            customer_phone:'13232672652',
            customer_name: '李四',
            work_address: '广东省吴川市巴拉巴拉村',
            status: '准备中',
            commission: 10000,
        },
        {
            order_id: '112312312f312',
            customer_phone:'13232672652',
            customer_name: '李四',
            work_address: '广东省吴川市巴拉巴拉村',
            status: '准备中',
            commission: 10000,
        },
        {
            order_id: '11231231h2312',
            customer_phone:'13232672652',
            customer_name: '李四',
            work_address: '广东省吴川市巴拉巴拉村',
            status: '准备中',
            commission: 10000,
        }
    ],
    finish: [
        {
            order_id: '1123123j12312',
            customer_phone:'13232672652',
            customer_name: '李四',
            status: '已完成',
            commission: 10000,
            end_date: '2021-03-10',
            rated: 2
        },
        {
            order_id: '11231231k2312',
            customer_phone:'13232672652',
            customer_name: '李四',
            status: '已完成',
            commission: 10000,
            end_date: '2021-03-10',
            rated: 2
        },
        {
            order_id: '1123123l12312',
            customer_phone:'13232672652',
            customer_name: '李四',
            status: '已完成',
            commission: 10000,
            end_date: '2021-03-10',
            rated: 4
        },
        {
            order_id: '1123123p12312',
            customer_phone:'13232672652',
            customer_name: '李四',
            status: '已完成',
            commission: 10000,
            end_date: '2021-03-10',
            rated: 3
        }
    ]
}
const tabList = [
    {
        key: 'doing',
        tab: '未完成',
    },
    {
        key: 'finish',
        tab: '已完成',
    },
];
const columns = {
    doing: [
        {
            title: '订单ID',
            dataIndex: 'order_id',
            key: 'dorder_id',
        },
        {
            title: '业主名字',
            dataIndex: 'customer_name',
            key: 'dcustomer_name',
        },
        {
            title: '业主电话',
            dataIndex: 'customer_phone',
            key: 'customer_phone',
        },
        {
            title: '工作地点',
            dataIndex: 'work_address',
            key: 'dwork_address',
        },
        {
            title: '当前状态',
            dataIndex: 'status',
            key: 'dstatus',
            render: text => (<Switch checkedChildren="进行中" unCheckedChildren="准备中" defaultChecked={text === '进行中' ? true : false} onChange={checked => console.log(checked)} />)
        },
        {
            title: '佣金(￥)',
            dataIndex: 'commission',
            key: 'dcommission',
        },
        {
            title: '操作',
            key: 'daction',
            render: (text, record) => (<Button type='link' onClick={() => console.log(record.dorder_id)}>删除订单</Button>)
        }
    ],
    finish: [
        {
            title: '订单ID',
            dataIndex: 'order_id',
            key: 'order_id',
        },
        {
            title: '业主名字',
            dataIndex: 'customer_name',
            key: 'customer_name',
        },
        {
            title: '业主电话',
            dataIndex: 'customer_phone',
            key: 'customer_phone',
        },
        {
            title: '当前状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '佣金(￥)',
            dataIndex: 'commission',
            key: 'commission',
        },
        {
            title: '完成时间',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        {
            title: '评价',
            dataIndex: 'rated',
            key: 'rated',
            render: rated => {
                let text = '无';
                if (rated === 2) { text = '好评'; }
                else if (rated === 3) { text = '中评'; }
                else if (rated === 4) { text = '差评'; }
                else { text = '未评价'; }
                return <span>{text}</span>
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (<AddCaseForm buttonName='提交案例' />)

        }
    ]
}

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

class StaffCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabKey: 'doing'
        };
    }

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };

    logout = () => {
        Modal.confirm({
            content: '确定退出？',
            okText:'确定',
            cancelText:'取消',
            onOk: () => {
                storageUtils.removeStaff();
                memoryUtils.staff = {};
                this.props.history.replace('/');
            },
            onCancel: () => {}
        })
    }



    render() {
        const staff = memoryUtils.staff;
        if(!staff.staffStatus){
            return <Redirect to={"/login/staff"} />
        }
        return (
            <div>
                <div style={{ display: 'flex', marginBottom: '20px', height: '60px', backgroundColor: '#1DA57A', color: 'white', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>&nbsp;&nbsp;员工中心</span>
                    </div>
                    <div>
                        <Link to='/' style={{ color: 'white' }}>平台首页</Link>
                        <Button type='link' onClick={this.logout} style={{ color: 'white' }}>
                            退出
                        </Button>
                    </div>
                </div>
                <Row gutter={24}>
                    <Col {...colPhone} xl={6}>
                        <Card
                            actions={[
                                <AddCaseForm buttonName='创建案例' />,
                                <EditorStaff />, //编辑员工信息
                            ]}
                        >
                            <Meta
                                avatar={<Avatar size={64} src={staff.staffImg} />}
                                title={staff.staffName}
                                description={staff.staffProfile}
                            />
                        </Card>
                        <Card style={{ marginTop: '20px',backgroundColor:'#FFA58B' }}>
                            <Statistic title="订单总收入(￥)" value={112893} precision={2} />
                        </Card>
                        <Card style={{ marginTop: '20px',backgroundColor:'#A1B2A8' }}>
                            <Statistic title="订单数" value={112893} precision={0} />
                        </Card>
                    </Col>
                    <Col {...colPhone} xl={18}>
                        <Card
                            style={{ width: '100%' }}
                            title="我的订单"
                            // extra={<a href="#">More</a>}
                            tabList={tabList}
                            activeTabKey={this.state.activeTabKey}
                            onTabChange={key => {
                                this.onTabChange(key, 'activeTabKey');
                            }}
                        >
                            <Table
                                rowKey={(record) => {
                                    return (record.order_id || record.dorder_id + Date.now()) //在这里加上一个时间戳就可以了
                                }}
                                dataSource={dataSource[this.state.activeTabKey]}
                                columns={columns[this.state.activeTabKey]}
                            // pagination={{ defaultPageSize: 2, total: 100 }}
                            />
                        </Card>
                    </Col>
                </Row>
                <Collapse defaultActiveKey={['1']}  style={{margin:'20px 20px'}}>
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
                    </Panel>
                </Collapse>
            </div>
        )
    }
}
export default StaffCenter;