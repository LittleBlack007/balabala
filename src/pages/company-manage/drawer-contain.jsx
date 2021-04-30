import React from 'react';
import { Drawer, Button } from 'antd';
import CaseList from './case-list';
import CommentList from './comment-list';
import CompanyDetail from './company-detail';
import StaffManage from './staff-manage';

class DrawerContain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            show:{'案例置顶':<CaseList />,'订单信息':<CommentList />,'公司信息':<CompanyDetail />,'员工管理':<StaffManage />}
        };
    }

    setVisible = (visible) => {
        this.setState({
            visible:visible
        })
    }

    showDrawer = () => {
        this.setVisible(true);
      };
    
    onClose = () => {
        this.setVisible(false);
      };


    render() {
        const name = this.props.name;
        return (
            <div>
                <Button type="link" onClick={this.showDrawer} style={{fontSize:'18px',fontWeight:'bold',color:'white'}}>{name}</Button>
                <Drawer
                    title={name}
                    width='70%'
                    placement="right"
                    // closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    {this.state.show[name]}
                </Drawer>
            </div>
        )
    }
}
export default DrawerContain;