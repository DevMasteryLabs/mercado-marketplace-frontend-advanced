import {useState} from 'react'
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

import './InsideLayout.css';

function InsideLayout({ children }) {
  const [showSidebarOnMobile, toggleShowSidebar] = useState(false)
  const handleShowSidebar= () => {
    toggleShowSidebar(prevState => !prevState)
  }
  
  return (
    <div className="inside-layout">
      <Sidebar handleShowSidebar={handleShowSidebar} showSidebarOnMobile={showSidebarOnMobile} />
      <div className="main-wrapper">
        <Topbar 
          showSidebarOnMobile={showSidebarOnMobile}
          handleShowSidebar={handleShowSidebar} 
        />
        <main className="container mt-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default InsideLayout;
