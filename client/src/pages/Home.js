import React from "react";
import { useState, useEffect } from "react";
import Api from "../helpers/Api";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
     const [products, setProducts] = useState([]);
     const [errorMsg, setErrorMsg] = useState([]);

     useEffect(() => {
          getProducts();
     }, []);

     const getProducts = async () => {
          let response = await Api.getContent("/products");
          if (response.ok) {
               let productData = response.data;
               setProducts(productData.filter((product, index) => index <= 2));
          } else {
               setErrorMsg("Uh oh! Something went wrong.");
          }
     };

     return (
          <div>
               <img
                         className="image"
                         src="https://images.unsplash.com/photo-1573849652968-ad773a0f0046?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
                         alt="candles"
                    ></img>
                    <div className="container-home">
               <h1 className="home-h1"> Homegrown</h1>
               <h3 className="home-h3">Shop your local Barcelona makers</h3>
               <div className="featured-products">
               <Link to="/products/all">
                              <button className="primary-btn btn formbutton homebutton"> Explore now</button>
                         </Link>
                         </div>
                         

               <h3 className="featured-h3">Top Products:</h3>
               </div>
               <div className="ProductCards">
                    <div className="row">
                         {products.map((p) => (
                              <div
                                   key={p.productid}
                                   className="col-sm-6 col-md-6 col-lg-4"
                              >
                                   <div className="card">
                                        <Link to={`/products/${p.productid}`}>
                                             <img
                                                  src={p.imgurl}
                                                  className="card-img-top"
                                                  alt="..."
                                             />
                                        </Link>

                                        <div className="card-body">
                                             <h5 className="card-title">
                                                  {p.name}
                                             </h5>
                                             <span className="prod-price badge badge-pill badge-light">
                                                  €{(p.price / 100).toFixed(2)}
                                             </span>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     );
}
export default Home;