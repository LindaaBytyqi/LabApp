import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdCategory } from "react-icons/md";
import { 
  FaBook,        
  FaUserEdit,    
  FaBuilding,    
  // FaSignOutAlt,  
} from "react-icons/fa";
import { UserService } from "../Services/UserService";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    UserService.LogOut(); 
    navigate("/"); 
  };
  const activeStyle = {
    fontWeight: "bold",
    color: "#a0c4ff",
    backgroundColor: "#34495e",
    borderRadius: "8px",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    fontSize: "1.05rem",
  };

  const defaultStyle = {
    color: "#ecf0f1",
    textDecoration: "none",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: "8px",
    fontSize: "1.05rem",
  };
 const isAdmin = UserService.GetUserRole()=== "Admin";
 const isCoordinator = UserService.GetUserRole()==="Coordinator";

  const sidebarLinks = [
    { name: "Dashboard Admin", path: "/AdminDashboard", icon: <MdDashboard /> },
    { name: "Authors", path: "/Author", icon: <FaUserEdit /> },
    { name: "Publisher", path: "/Publisher", icon: <FaBuilding /> },
    { name: "Category", path: "/Category", icon: <MdCategory /> },
    { name: "Books", path: "/Book", icon: <FaBook /> },
    { name: "Logout", path: "/", icon: <FaSignOutAlt /> },
  ];
  let filteredLinks = [];

if (isAdmin) {
  filteredLinks = sidebarLinks.filter(link =>
  [
    "/AdminDashboard",
    "/Book",
    "/Category",
    "/Author",
    "/Publisher",
    "/"
  ].includes(link.path)
  );
} else if (isCoordinator) {
  filteredLinks = sidebarLinks.filter(link =>
    [
      "/checkout",
      "/Cart"
    ].includes(link.path)
  );
} 


  return (
    <nav
      style={{
        width: collapsed ? "80px" : "230px",
        background: "#2c3e50",
        color: "white",
        height: "100vh",
        transition: "width 0.3s ease",
        position: "fixed",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: "1rem",
          borderBottom: "1px solid #34495e",
        }}
      >
        {!collapsed && <h2 style={{ margin: 0, color: "#ecf0f1" }}></h2>}
        <button
          onClick={toggleSidebar}
          style={{
            fontSize: "1.3rem",
            background: "none",
            border: "none",
            color: "#a0c4ff",
            cursor: "pointer",
          }}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
      </div>

      {/* Menu */}
      <ul
        style={{
          listStyle: "none",
          padding: collapsed ? "0.5rem" : "1rem",
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
          width: "100%",
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        {filteredLinks.map((link, index) => (
          <li key={index}>
            {link.name === "Logout" ? (
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  ...defaultStyle,
                }}
              >
                {link.icon}
                {!collapsed && <span>{link.name}</span>}
              </button>
            ) : (
              <NavLink
                to={link.path}
                style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
              >
                {link.icon}
                {!collapsed && <span>{link.name}</span>}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
