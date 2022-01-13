import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaChevronRight } from 'react-icons/fa';
import { HiEye } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

const Connection = () => {
  const [hiEye, setHiEye] = useState(true);

  return (
    <main className="connectionPage">
      <h1>SporEko</h1>
      <h2>Bienvenue !</h2>
      <p>Connectez-vous pour découvrir toutes nos fonctionnalités</p>
      <form className="connectionPage__form" action="">
        <div className="connectionPage__form__inputsContainer">
          <div>
            <CgProfile className="inputIcon" />
            <input type="email" placeholder="blabla@email.com" />
          </div>
          <hr />
          <div>
            <RiLockPasswordLine className="inputIcon" />
            <input type={`${hiEye ? 'password' : 'text'}`} placeholder="*************" />
            <HiEye className="inputIcon right" onClick={() => setHiEye(!hiEye)} />
          </div>
        </div>
        <button type="submit" className="btn connectionPage__form__submit">
          Se connecter <FaChevronRight className="chevronRightIcon" />
        </button>
      </form>
      <div className="connectionPage__span">
        <span className="connectionPage__span--bold">Devenir un SporEko ?</span>
        <span className="connectionPage__span--red"> Créer un compte </span>
      </div>
    </main>
  );
};

export default Connection;
