import React from 'react';

import Loupe from '../../../../resources/loupe.png';

const Home = () => {
  return (
    <div className="home">
      <div className="home__Container">
        <h1>
          Spor<span>E</span>ko
        </h1>
        <p>Dépensez moins, pour vous dépenser plus!</p>
        <form>
          <button onClick={() => console.log('youpi')}>
            <img src={Loupe} alt="loupe" />
          </button>
          <input className="btn" type="text" placeholder="Recherchez sur SPOREKO" />
        </form>
      </div>
    </div>
  );
};

export default Home;
