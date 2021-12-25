import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

import { logout } from '../redux/actions/userActionCreators'

import ProfilePicture from './ProfilePicture'

function Dropdown() {
    const dispatch = useDispatch()
    const history = useHistory()
    const userInfo = useSelector(state => state.user.info)
    return (
        <div className="dropdown">
            <button className="d-flex align-items-center border-0 bg-transparent dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                <ProfilePicture size={32} />
                <strong className="ms-2">{userInfo.firstName}</strong>
            </button>
            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                <li><NavLink className="dropdown-item" to="/create-item">New item...</NavLink></li>
                <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={() => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    dispatch(logout())
                    history.push('/login')
                }}>Sign out</button></li>
            </ul>
        </div>
    )
}

export default Dropdown;