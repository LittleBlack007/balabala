import React,{Component} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../src/pages/main'

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
          <Route path='/' component={Main} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
