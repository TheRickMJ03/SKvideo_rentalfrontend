import React from 'react';
import '../Nav_bar/navbar.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useNav } from '../Nav_bar/Navcontext'; 

const Navbar = () => {
  const { activeMenu, setActiveMenu } = useNav(); 

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="" />
      </div>
      <ul className='nav-menu'>
        <li onClick={() => setActiveMenu('Home')}>
          <Link to='/' style={{ textDecoration: 'none' }}>Home</Link>
          {activeMenu === 'Home' ? <hr /> : null}
        </li>
        <li onClick={() => setActiveMenu('Films')}>
          <Link to='/Films' style={{ textDecoration: 'none' }}>Films</Link>
          {activeMenu === 'Films' ? <hr /> : null}
        </li>
        <li onClick={() => setActiveMenu('Customer')}>
          <Link to='/Customer' style={{ textDecoration: 'none' }}>Customer</Link>
          {activeMenu === 'Customer' ? <hr /> : null}
        </li>
      </ul>

    </div>
  );
};

export default Navbar;
