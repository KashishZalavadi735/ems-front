import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import "../css/Layout.css";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="d-flex vh-100 w-100" style={{ backgroundColor: "#F3F4F6" }}>
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

      <div className="wrapper container p-0">
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="container p-0 inner-my">
            
            {/* It loads all pages */}
          <Outlet />
          
        </div>

      </div>
    
    </div>
  )
}

export default Layout;