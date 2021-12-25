
import { NavLink, Link } from 'react-router-dom'
import { IoHomeOutline } from 'react-icons/io5'
import { FaRegUserCircle } from 'react-icons/fa'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'

import MercadoLogo from './MercadoLogo'
import Dropdown from './Dropdown'


function Sidebar({handleShowSidebar, showSidebarOnMobile}) {
    const anchors = [
        {
            name: 'Home',
            to: '/items',
            icon: IoHomeOutline
        },
        {
            name: 'Create item',
            to: '/create-item',
            icon: AiOutlineAppstoreAdd
        },
        {
            name: 'Profile',
            to: '/profile',
            icon: FaRegUserCircle
        }
    ]

    const NavItem = ({ name, to, icon: Icon }) => {
        return (
            <li className="nav-item">
                <NavLink onClick={handleShowSidebar} to={to} exact className="nav-link link-dark d-flex gap-2">
                    <Icon className="bi" size={22} />
                    <span>{name}</span>
                </NavLink>
            </li>
        )
    }

    return (
        <div className={`bg-light sidebar ${showSidebarOnMobile ? 'show-on-mobile' : ''}`}>
            <div className="d-flex flex-column flex-shrink-0 p-3 h-100">
                <Link onClick={handleShowSidebar} to="/items" className="mb-0 me-md-auto link-dark text-decoration-none">
                    <MercadoLogo height={36}/>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    {
                        anchors.map(({ name, to, icon }, i) => <NavItem key={i} name={name} to={to} icon={icon} />)
                    }
                </ul>
                <hr />
                <Dropdown />
            </div>
            <BsFillArrowLeftCircleFill onClick={handleShowSidebar} className="hide-sidebar-icon" size={20} />
        </div>
    )
}

export default Sidebar;