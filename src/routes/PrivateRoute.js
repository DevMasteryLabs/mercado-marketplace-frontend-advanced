import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

import InsideLayout from '../layouts/InsideLayout';

function PrivateRoute({component: Component, ...rest}) {
    const {isAuth} = useSelector(state => state.user);
    return (
        <Route 
        {...rest}
        render={(props) => (
            isAuth 
            ? <InsideLayout><Component /></InsideLayout> 
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        )}
        
        />
    )
}

export default PrivateRoute;