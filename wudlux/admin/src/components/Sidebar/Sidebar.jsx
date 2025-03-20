import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="modern-sidebar">
      <div className="sidebar-options">
        <Link to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="Add Items" />
          <span>Add Items</span>
        </Link>
        <Link to="/list" className="sidebar-option">
          <img src={assets.list} alt="List Items" />
          <span>List Items</span>
        </Link>
        <Link to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="Orders" />
          <span>Orders</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
