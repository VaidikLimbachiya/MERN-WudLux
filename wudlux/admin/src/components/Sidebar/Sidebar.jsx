import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { PiUserListLight } from "react-icons/pi";
import { MdAddCircleOutline } from "react-icons/md";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { TfiPackage } from "react-icons/tfi";

const Sidebar = () => {
  const location = useLocation(); // Get current URL path

  return (
    <aside className="modern-sidebar">
      <div className="sidebar-options">
        <Link
          to="/add"
          className={`sidebar-option ${location.pathname === "/add" ? "active" : ""}`}
        >
          <MdAddCircleOutline className="icon" />
          <span className="identifire">Add Items</span>
        </Link>
        
        <Link
          to="/list"
          className={`sidebar-option ${location.pathname === "/list" ? "active" : ""}`}
        >
          <BsReverseListColumnsReverse className="icon" />
          <span className="identifire">List Items</span>
        </Link>

        <Link
          to="/orders"
          className={`sidebar-option ${location.pathname === "/orders" ? "active" : ""}`}
        >
          <TfiPackage className="icon" />
          <span className="identifire">Orders</span>
        </Link>

        <Link
          to="/users"
          className={`sidebar-option ${location.pathname === "/users" ? "active" : ""}`}
        >
          <PiUserListLight className="icon" />
          <span className="identifire">Users</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
