import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Admin from './components/Admin'
import ErrorPage from './components/ErrorPage'

import './App.css';

function App() {
  return (
    <>
    
      <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Admin} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </Router>
    </>
  );
}

export default App;
 