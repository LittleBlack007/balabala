import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
// import 'antd/dist/antd.css'

//当点击页面刷新时，把localStroage的用户信息保存到内存中，维持登录状态
const user = storageUtils.getUser();
const staff = storageUtils.getStaff();
const company = storageUtils.getCompany();

if(user && user.userStatus){
    memoryUtils.user = user
}
if(staff && staff.staffStatus){
  memoryUtils.staff = staff
}
if(company && company.companyStatus){
  memoryUtils.company = company
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
