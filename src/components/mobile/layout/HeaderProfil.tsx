import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PhotoDefault from '../../../../resources/photoDefault.png';
import CurrentUserContext from '../../../contexts/CurrentUser';
import IUserLog from '../../../interfaces/IUser';

const HeaderProfil = () => {
  const urlBack = import.meta.env.VITE_URL_BACK;

  const { idUser, setUser, user } = useContext(CurrentUserContext);

  useEffect(() => {
    axios
      .get<IUserLog>(`${urlBack}users/${idUser}`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => err);
  }, []);

  return (
    <div className="headerProfil">
      <div className="headerProfil__intro">
        <div className="headerProfil__intro__photo">
          <img
            src={user.picture}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = PhotoDefault;
            }}
            alt="Avatar"
          />
        </div>
        <div className="headerProfil__intro__name">
          <h3>
            {user.firstname} {user.lastname}
          </h3>
          <Link to="/profile" className="headerProfil__intro__name__link">
            Voir mon profil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfil;
