import axios from 'axios';
import React, { useEffect, useState } from 'react';

import PhotoDefault from '../../../../resources/photoDefault.png';
import IUser from '../../../interfaces/IUser';

const HeaderProfil = () => {
  const [user, setUser] = useState<IUser>();
  // Url back
  const urlBack = import.meta.env.VITE_URL_BACK;
  // Axios call for user infos
  useEffect(() => {
    axios
      .get(`${urlBack}/users/${sessionStorage.getItem('id')}`)
      .then((res) => setUser(res.data));
  }, []);

  return (
    <div className="headerProfil">
      <div className="headerProfil__intro">
        <div className="headerProfil__intro__photo">
          <img
            src={user?.picture ? user?.picture : PhotoDefault}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = PhotoDefault;
            }}
            alt="Avatar"
          />
        </div>
        <div className="headerProfil__intro__name">
          <h3>
            {user?.firstname} {user?.lastname}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfil;
