    // import  from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import './Sidebar.css';

    // Import icons from your assets folder
    import ordersIcon from '../../assets/history.png';
    import addressesIcon from '../../assets/address.png';
    import logoutIcon from '../../assets/logout.png';
    import logoIcon from '../../assets/logo.png'; // Update with your logo's file name

    const navItems = [
    { id: 'orders', label: 'Order History', icon: ordersIcon, link: '/orders' },
    { id: 'addresses', label: 'Addresses', icon: addressesIcon, link: '/address' },
    { id: 'logout', label: 'Logout', icon: logoutIcon, link: '/logout' },
    ];

    const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
        <div className="sidebar-header">
            <img src={logoIcon} alt="Logo" className="sidebar-logo" loading="lazy"/>
            <h2 className="sidebar-title">Wudlux</h2>
        </div>
        <nav className="sidebar-navigation">
            {navItems.map((item) => (
            <Link
                key={item.id}
                to={item.link}
                className={`sidebar-nav-item ${
                location.pathname === item.link ? 'sidebar-nav-active' : ''
                }`}
            >
                <img src={item.icon} alt={item.label} className="sidebar-nav-icon" loading="lazy"/>
                <span className="sidebar-nav-text">{item.label}</span>
            </Link>
            ))}
        </nav>
        </div>
    );
    };

    export default Sidebar;
