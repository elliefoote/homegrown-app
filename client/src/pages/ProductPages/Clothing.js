import React, {useEffect, useState, useContext} from 'react';
import ProductDisplay from '../../components/ProductDisplay';

function Clothing({user}) {
  return (
    <div className="container d-flex flex-column align-items-center">
        <h2>Clothing & Accessories</h2>
        <ProductDisplay category="Clothing & Accessories" user={user} />
    </div>
  );
}

export default Clothing;