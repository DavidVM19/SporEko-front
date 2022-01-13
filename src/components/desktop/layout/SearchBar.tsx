import axios from 'axios';
import React, { useEffect, useState } from 'react';

import IBrand from '../interface/IBrands';
import ICategory from '../interface/ICategories';
import IClothes from '../interface/IClothes';
import IGender from '../interface/IGenders';
import ISport from '../interface/ISports';

const SearchBar = () => {
  const [sportDetails, setSportDetails] = useState<any>('');
  const [allSports, setAllSports] = useState([]);
  const [showAllSport, setShowAllSport] = useState<boolean>(false);
  const [allGenders, setAllGenders] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allClothes, setAllClothes] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [max, setMax] = useState<number>(15);

  const showSportDetails = (id: number) => {
    setSportDetails(id);
  };

  // const hideSportDetails = () => {
  //   setSportDetails('');
  // };

  useEffect(() => {
    showAllSport ? setMax(allSports.length) : setMax(15);
  }, [showAllSport]);

  const useBack = 'http://localhost:8000';

  // UseEffect SPORTS //
  useEffect(() => {
    axios
      .get(`${useBack}/sports`)
      .then((res) => res.data)
      .then((data) => {
        setAllSports(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // UseEffect GENDERS //
  useEffect(() => {
    axios
      .get(`${useBack}/genders`)
      .then((res) => res.data)
      .then((data) => {
        setAllGenders(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // UseEffect CATEGORIES //
  useEffect(() => {
    axios
      .get(`${useBack}/categories`)
      .then((res) => res.data)
      .then((data) => {
        setAllCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // UseEffect CLOTHES //
  useEffect(() => {
    axios
      .get(`${useBack}/clothes`)
      .then((res) => res.data)
      .then((data) => {
        setAllClothes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // UseEffect BRANDS //
  useEffect(() => {
    axios
      .get(`${useBack}/brands`)
      .then((res) => res.data)
      .then((data) => {
        setAllBrands(data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(allSports);
  console.log(allGenders);
  console.log(allCategories);
  console.log(allClothes);
  console.log(allBrands);

  console.log(allSports.length);

  return (
    <div className="searchBar">
      <h3>Sports :</h3>
      <div className="activeBar">
        {allSports.slice(0, Number(max)).map((sport: ISport, index: number) => {
          return (
            <div
              className="sportSearch"
              role="button"
              key={index}
              onClick={() => showSportDetails(sport.id_sport)}
              aria-hidden="true">
              {sport.name}
              <img
                className="sportImg"
                src={sport.icon}
                alt={sport.name}
                title={sport.name}
              />
              {sport.id_sport === sportDetails && (
                <div className="allFilters">
                  <h4> {sport.name} :</h4>
                  <div className="listFilter">
                    <div className="selectedFilter">
                      <h5>Genre :</h5>
                      <div className="genderFilter">
                        <div className="genderFilterDetail">
                          <h6>Adulte :</h6>
                          {allGenders.map((gender: IGender, index: number) => {
                            return <a key={index}> {gender.adult_name}</a>;
                          })}
                        </div>
                        <div className="genderFilterDetail">
                          <h6>Enfant :</h6>
                          {allGenders.map((gender: IGender, index: number) => {
                            return <a key={index}> {gender.child_name}</a>;
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="selectedFilter">
                      <h5>Catégories :</h5>
                      {allCategories.map((category: ICategory, index: number) => {
                        return <a key={index}> {category.name} </a>;
                      })}
                    </div>
                    <div className="selectedFilter">
                      <h5>Vêtements :</h5>
                      {allClothes.map((clothes: IClothes, index: number) => {
                        return <a key={index}> {clothes.name} </a>;
                      })}
                    </div>
                    <div className="selectedFilter">
                      <h5>Marque :</h5>
                      {allBrands.map((brands: IBrand, index: number) => {
                        return <a key={index}> {brands.name} </a>;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="btnAllSports"
        onClick={() => setShowAllSport(!showAllSport)}>
        {showAllSport ? 'Top 15 des sports' : 'Tous les sports'}
      </button>
    </div>
  );
};

export default SearchBar;
