import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <nav className="modern-navbar">
      <div className="nav-left">
        <img src={assets.logo} alt="Logo" className="nav-logo" />
        <span className="brand-name">Wudlux Admin</span>
      </div>
    </nav>
  );
};

export default Navbar;
