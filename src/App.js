import './App.css'
import {Redirect, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import JobsData from './components/JobsData'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import FullJobCard from './components/FullJobCard'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/jobs" component={JobsData} />
      <ProtectedRoute exact path="/jobs/:id" component={FullJobCard} />
      <Route component={PageNotFound} />
      <Redirect component={PageNotFound} />
    </Switch>
  </>
)
export default App
