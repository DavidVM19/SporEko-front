import React from 'react';

import Logo from '../../resources/logo.jpg';

const Header = () => {
  return (
    <div className="header">
      <img id="logoHeader" src={Logo} alt={Logo} />
      <ul className="headerContainer">
        <li>
          <a href="/location">Près de chez vous</a>{' '}
        </li>
        <li>
          <input id="searchHome" type="search" value="Rechercher un article" />
        </li>
        <li>
          <a href="/mon_compte">Mon compte</a>{' '}
        </li>
      </ul>
    </div>
  );
};

export default Header;
