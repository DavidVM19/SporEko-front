import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { BsBoxSeam, BsShield } from 'react-icons/bs';
import { useParams } from 'react-router';

import cards from '../../../../resources/cards.png';
import CurrentUserContext from '../../../contexts/CurrentUser';
import ICondition from '../../../interfaces/ICondition';
import IDeliverer from '../../../interfaces/IDeliverer';
import IDelivererPrice from '../../../interfaces/IDelivererPrice';
import IOffer from '../../../interfaces/IOffer';
import IOfferDeliverer from '../../../interfaces/IOfferDeliverer';
import ISize from '../../../interfaces/ISize';
import IUser from '../../../interfaces/IUser';
import IUserLog from '../../../interfaces/IUser';

const urlBack = import.meta.env.VITE_URL_BACK;

const ConfirmationOrder = () => {
  const { id } = useParams();
  const { idUser } = useContext(CurrentUserContext);
  const [confirmedOrder, setConfirmedOrder] = useState<IOffer>();
  const [confirmedAdress, setConfirmedAdress] = useState<IUserLog>();
  const [_confirmedDeliverer, setConfirmedDeliverer] = useState<IOfferDeliverer>();
  const [_confirmedDelivererPrice, setConfirmedDelivererPrice] =
    useState<IDelivererPrice>();
  const [confirmedCondition, setConfirmedCondition] = useState<ICondition>();
  const [deliverersList, setDeliverersList] = useState<IDeliverer[]>([]);
  const [confirmedSize, setConfirmedSize] = useState<ISize>();

  const [handDelivery, setHandDelivery] = useState(0);

  useEffect(() => {
    axios.get<IOffer>(`${urlBack}/offers/${id}`).then((res) => {
      setConfirmedOrder(res.data);
      axios
        .get<ISize>(`${urlBack}/sizes/${res.data.id_size}`)
        .then((res) => setConfirmedSize(res.data));
      axios
        .get<ICondition>(`${urlBack}/conditions/${res.data.id_condition}`)
        .then((res) => setConfirmedCondition(res.data));
    });
    axios
      .get<IUser>(`${urlBack}/users/${idUser}`, { withCredentials: true })
      .then((res) => setConfirmedAdress(res.data));
    axios.get(`${urlBack}/offer_deliverers`).then((res) => {
      setConfirmedDeliverer(res.data);
      axios.get(`${urlBack}/deliverers`).then((res) => setDeliverersList(res.data));
    });
    axios
      .get<IDelivererPrice>(`${urlBack}/deliverer_price`)
      .then((res) => setConfirmedDelivererPrice(res.data));
  }, []);

  return (
    <div className="confirmedOrder">
      <div className="confirmedOrder__confirmedOrderContainer">
        <div className="confirmedOrder__confirmedOrderContainer__box">
          <p className="instructions">
            <BsBoxSeam /> Le mode de livraison disponible (Mondial Relay ou Colissimo) ou
            une remise en main propre
          </p>
          <p className="instructions">
            <BsShield /> La protection Acheteurs Sporeko
          </p>
          <p className="instructions">
            <AiOutlineLock /> Paiement sécurisé{' '}
            <img className="cards" src={cards} alt="cards" />
          </p>
        </div>
        <div className="confirmedOrder__confirmedOrderContainer__box">
          <h3>COMMANDE</h3>
          {confirmedOrder && (
            <div>
              <img src={confirmedOrder.picture1} alt="picture1" />
              <h4>{confirmedOrder.title}</h4>
              <p>
                {confirmedSize && confirmedSize.size_fr}
                {confirmedCondition && confirmedCondition.name}
              </p>
              <h3>{confirmedOrder.price} €</h3>
            </div>
          )}
        </div>
        <div className="confirmedOrder__confirmedOrderContainer__box">
          <h3>VOS COORDONNEES</h3>
          {confirmedAdress && (
            <div>
              <h4>
                {confirmedAdress.firstname} {confirmedAdress.lastname}
              </h4>
              <p>{confirmedAdress.address}</p>
              <p>{confirmedAdress.address_complement}</p>
              <p>
                {confirmedAdress.zipcode} {confirmedAdress.city}
              </p>
              <p>{confirmedAdress.country}</p>
            </div>
          )}
        </div>
        <div className="confirmedOrder__confirmedOrderContainer__box">
          <h3>OPTIONS DE LIVRAISON</h3>
          <div className="delivererList">
            <span className="confirmedOrder__confirmedOrderContainer__span">
              Remise en main propre
            </span>
            <label className="switch">
              <input
                checked={handDelivery ? true : false}
                onChange={() => {
                  handDelivery ? setHandDelivery(0) : setHandDelivery(1);
                }}
                type="checkbox"
                name="handDelivery"
              />
              <span className="slider round"> </span>
            </label>
          </div>
          {!handDelivery &&
            deliverersList.map((deliverer, index) => <p key={index}>{deliverer.name}</p>)}
        </div>
        <div className="confirmedOrder__confirmedOrderContainer__box">
          <h3>Résumé de la commande</h3>
          {confirmedOrder && (
            <div>
              <img src={confirmedOrder.picture1} alt="picturetotal" />
              <p>Montant : {confirmedOrder.price} €</p>
              <p>Frais de port : </p>
              <p>Frais de protection acheteurs : </p>
              <p>TOTAL : {confirmedOrder.price} + 1 €</p>
            </div>
          )}
        </div>
        <button className="btn">Payer</button>
      </div>
    </div>
  );
};

export default ConfirmationOrder;
