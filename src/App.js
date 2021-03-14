import React,{Component} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CompanyManage from './pages/company-manage';
import Main from '../src/pages/main'
import StaffCenter from './pages/staff';
import User from './pages/user';

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
          <Route path="/user" component={User} / >
          <Route path='/staff-center' component={StaffCenter} />
          <Route path='/company-manage' component={CompanyManage} />
          <Route path='/' component={Main} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
