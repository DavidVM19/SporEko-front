import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { BsPlusLg } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiMail } from 'react-icons/fi';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer__footerContainer">
        <li>
          <a href="/favorites">
            <FiHeart className="footer__footerContainer__footerIcons" />
            Favoris
          </a>
        </li>
        <li>
          <Link to="/">
            <BsSearch className="footer__footerContainer__footerIcons" />
            Rechercher
          </Link>
        </li>
        <li id="vendre">Vendre</li>
        <li>
          <a href="/messages">
            <FiMail className="footer__footerContainer__footerIcons" />
            Messages
          </a>
        </li>
        <li>
          <Link to="/Connection">
            <CgProfile className="footer__footerContainer__footerIcons" />
            Compte
          </Link>
        </li>
      </ul>
      <button type="button" className="footer__button">
        <BsPlusLg className="btn" />
      </button>
    </div>
  );
};

export default Footer;
