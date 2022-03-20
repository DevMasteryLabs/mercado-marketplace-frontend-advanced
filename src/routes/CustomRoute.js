import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import InsideLayout from '../layouts/InsideLayout';
import OutsideLayout from '../layouts/OutsideLayout';

function CustomRoute({ component: Component, ...rest }) {
    const { isAuth } = useSelector(state => state.user);
    return (
        <Route
            {...rest}
            render={(props) => (
                isAuth
                    ? <InsideLayout><Component {...props} /></InsideLayout>
                    : <OutsideLayout><Component {...props} /></OutsideLayout>
            )}
        />
    )
}

export default CustomRoute;