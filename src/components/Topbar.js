import {useSelector} from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineMenuUnfold } from 'react-icons/ai'

import MercadoLogo from './MercadoLogo'

function Topbar({showSidebarOnMobile, handleShowSidebar}) {
    const {isAuth} = useSelector(state => state.user);
    return (
        <div className="topbar">
            {
                isAuth
                ? (
                    <>
                    {!showSidebarOnMobile && <Link to='/'><MercadoLogo height={36}/></Link>}
                    <AiOutlineMenuUnfold onClick={handleShowSidebar} className="toggle-sidebar-icon" size={22} />
                    </>
                )
                : (
                    <>
                    <Link to='/'><MercadoLogo height={36}/></Link>
                    <nav>
                        <NavLink to='/login'>Sign in</NavLink>
                        <NavLink to='/register'>Sign up</NavLink>
                    </nav>
                    </>
                    
                )
            }
        </div>
    )
}

export default Topbar;