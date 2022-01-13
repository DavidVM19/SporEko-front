import React, { useState } from 'react';

import Logo from '../../../../resources/logo.jpg';
import SearchBar from './SearchBar';

const HeaderDesktop = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const handleShowSearch = () => {
    return setShowSearch(!showSearch);
  };

  //   // GEOLOCATION //

  const points = [
    { name: 'Bayonne', lat: 43.492949, lng: -1.474841 },
    { name: 'Bordeaux', lat: 44.837789, lng: -0.57918 },
    { name: 'Lausanne', lat: 46.534271, lng: 6.620206 },
    { name: 'Zürich', lat: 47.381583, lng: 8.531827 },
    { name: 'Le Mans', lat: 48.001837, lng: 0.194578 },
    { name: 'Montpellier', lat: 43.624121, lng: 3.871447 },
    { name: 'Münich', lat: 48.140408, lng: 11.586595 },
    { name: 'Mexico', lat: 19.427701, lng: -99.266023 },
    { name: 'Buenos Aires', lat: -34.422808, lng: -58.572664 },
    { name: 'Brasilia', lat: -15.792772, lng: -47.883031 },
    { name: 'Yaoundé', lat: 3.875265, lng: 11.487751 },
    { name: 'Oklahoma City', lat: 35.509992, lng: -97.53986 },
    { name: 'Québec', lat: 45.502601, lng: -73.589665 },
  ];

  let myPosition: { latitude: number; longitude: number } | null = null;

  // Calculate the distance //

  function calculateDistance(lat1: number, long1: number, lat2: number, long2: number) {
    const p = 0.017453292519943295;
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((long2 - long1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
  }

  // Filter list in KM //

  function filterPoints(radius: number) {
    if (myPosition == null) {
      return false;
    }

    // return only the points in the area
    return points.filter(
      (point) =>
        calculateDistance(
          myPosition.latitude,
          myPosition.longitude,
          point.lat,
          point.lng,
        ) <= radius,
    );
  }
  console.log(filterPoints);

  const [showLocation, setShowLocation] = useState('');

  const haveLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      return setShowLocation(
        `${position.coords.latitude} + ${position.coords.longitude}`,
      );
    }),
      (error: any) => {
        // check if the user denied geolocation, or if there was any other problem
        if (error.code == error.PERMISSION_DENIED) {
          alert(
            "Geolocation has been disabled on this page, please review your browser's parameters",
          );
        } else {
          alert('Unable to find your position, try again later.');
        }
      },
      {
        timeout: 10000,
      };
  };

  return (
    <div className="header">
      <img id="logoHeader" src={Logo} alt={Logo} />
      <div className="headerContainer">
        {showSearch && <SearchBar />}
        <div
          className="hiddenSearchBar"
          role="button"
          tabIndex={0}
          onClick={handleShowSearch}
          onKeyDown={handleShowSearch}>
          <p>Tous les sports</p>
        </div>
        <div className="geolocation">
          <button type="button" onClick={haveLocation}>
            Ma position
          </button>
          <input type="input" value={showLocation} readOnly></input>
          <p>Près de chez vous</p>
        </div>
        <div>
          <input
            id="searchHome"
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div>
          <a href="/mon_compte">Mon compte</a>
        </div>
      </div>
    </div>
  );
};

export default HeaderDesktop;
