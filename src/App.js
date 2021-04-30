import React,{Component} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CompanyManage from './pages/company-manage';
import Main from '../src/pages/main'
import StaffCenter from './pages/staff';
import User from './pages/user';
import Login from './pages/login';
import RegisterUser from './pages/register/register-user';
import RegisterStaff from './pages/register/register-staff';
import RegisterCompany from './pages/register/register-company';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/register/staff" component={RegisterStaff} />
          <Route path="/register/company" component={RegisterCompany} />
          <Route path="/register/user" component={RegisterUser} />
          <Route path="/login/:type" component={Login} />
          <Route path="/user-manage" component={User} / >
          <Route path='/staff-manage' component={StaffCenter} />
          <Route path='/company-manage' component={CompanyManage} />
          <Route path='/' component={Main} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
