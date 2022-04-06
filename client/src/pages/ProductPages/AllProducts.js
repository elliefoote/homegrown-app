import React, {useEffect, useState} from 'react';
import ProductDisplay from '../../components/ProductDisplay';

function AllProducts({user}) {
  return (
    <div className="container d-flex flex-column align-items-center">
        <h2>All Products</h2>
        <ProductDisplay category="All" user={user} />
    </div>
  );
}

export default AllProducts;