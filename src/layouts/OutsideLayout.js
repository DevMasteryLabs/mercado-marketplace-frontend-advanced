import Topbar from '../components/Topbar';

import './OutsideLayout.css';



function OutsideLayout({children}) {

  return (
    <div className="outside-layout">
      <Topbar />
      <main className="container">
          {children}
      </main>
    </div>
  );
}

export default OutsideLayout;
