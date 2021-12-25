import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import CustomRoute from './routes/CustomRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Items from './pages/Items';
import CreateItem from './pages/CreateItem';
import UpdateItem from './pages/UpdateItem';
import NotFound from './pages/NotFound';
import { useDispatch } from "react-redux";
import { login } from "./redux/actions/userActionCreators";
import ItemDetails from "./pages/ItemDetails";

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  if (token && user) {
    dispatch(login(user, token))
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <PublicRoute exact path="/" component={Home} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/items' component={Items} />
          <PrivateRoute exact path='/create-item' component={CreateItem} />
          <PrivateRoute exact path='/update-item/:id' component={UpdateItem} />
          <CustomRoute exact path='/items/:id' component={ItemDetails} />
          <CustomRoute component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
