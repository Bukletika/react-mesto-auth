import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
    return (
      <header className="header">
          <div className="header__logo">
            <a className="header__logo-link" href="/" target="_self" title="На главную">
                <img className="header__logo-img" src={headerLogo} alt="Логотип Место" />
            </a>
          </div>
      </header>
    );
  }

export default Header;
