import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Local from "./helpers/Local";
import Api from "./helpers/Api";
import CartContext from "./CartContext";

// Import navigation components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Import pages
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import SellerLogin from "./pages/SellerLogin";
import UserSignUp from "./pages/UserSignUp";
import SellerSignUp from "./pages/SellerSignUp";
import ErrorPage from "./pages/ErrorPage";
import TestPrivateUsers from "./pages/TestPrivateUsers";
import TestPrivateSellers from "./pages/TestPrivateSellers";
import PrivateRouteUsers from "./components/PrivateRouteUsers";
import PrivateRouteSellers from "./components/PrivateRouteSellers";
import ShopSettings from "./pages/ShopSettings";
import Shopfront from "./pages/Shopfront";
import UserSettings from "./pages/UserSettings";
import OrderHistory from "./pages/OrderHistory";
import AddProduct from "./pages/AddProduct";
import SellerOrders from './pages/SellerOrders';

// Product pages
import AllProducts from "./pages/ProductPages/AllProducts";
import Homewares from "./pages/ProductPages/Homewares";
import Art from "./pages/ProductPages/Art";
import Jewellry from "./pages/ProductPages/Jewellry";
import Clothing from "./pages/ProductPages/Clothing";
import ProductDetail from "./pages/ProductPages/ProductDetail";

function App() {
     const [user, setUser] = useState(Local.getUser());
     const [seller, setSeller] = useState(Local.getSeller());
     const [cart, setCart] = useState([]);
     const [loginError, setLoginError] = useState("");
     const [errorMsg, setErrorMsg] = useState("");
     const navigate = useNavigate();
     // const history = useHistory();

     useEffect(() => {
          getCart();
     }, [user]);

     const getCart = async () => {
          if (user) {
               let userid = user.userid;
               let response = await Api.getContent(`/cart/${userid}`);
               if (response.ok) {
                    setCart(response.data);
               } else {
                    setErrorMsg(response.error);
               }
          }
     };

     async function handleUserLogin(username, password) {
          handleSellerLogout();
          let response = await Api.loginUser(username, password);
          console.log(response);
          if (response.ok) {
               Local.saveUserInfo(response.data.token, response.data.user);
               setUser(response.data.user);
               setLoginError("");
               navigate("/");
          } else {
               setLoginError(response.error);
               console.log(loginError);
          }
     }

     async function handleSellerLogin(username, password) {
          handleUserLogout();
          let response = await Api.loginSeller(username, password);
          console.log(response);
          if (response.ok) {
               Local.saveSellerInfo(response.data.token, response.data.seller);
               setSeller(response.data.seller);

               setLoginError("");
               navigate("/");
          } else {
               setLoginError(response.error);
               console.log(loginError);
          }
     }

     function handleUserLogout() {
          Local.removeUserInfo();
          setUser(null);
      }

     async function handleSellerLogout() {
          Local.removeSellerInfo();
          setSeller(null);
     }

     const handleUserSignUp = async (newUser) => {
          let response = await Api.userSignUp(
               newUser.username,
               newUser.password,
               newUser.email
          );
          if (response.ok) {
               setLoginError("");
               console.log("Sign up successful!");
          } else {
               setLoginError(response.error);
               console.log(loginError);
          }
     };

     const handleSellerSignUp = async (newSeller) => {
          let response = await Api.sellerSignUp(
               newSeller.username,
               newSeller.password,
               newSeller.email
          );
          if (response.ok) {
               setLoginError("");
               console.log("Sign up successful!");
          } else {
               setLoginError(response.error);
               console.log(loginError);
          }
     };

     // Change user info

     async function updateUserData(userObj, route) {
          let response = await Api.updateUserData(userObj, route);
          console.log(response);
          if (response.ok) {
               Local.saveUserInfo(response.data.token, response.data.user);
               setUser(response.data.user);
               setLoginError("");
          } else {
               setLoginError("Login failed");
               console.log(loginError);
          }
     }

     // Change seller info

     async function updateSellerData(sellerObj, route) {
          let response = await Api.updateSellerData(sellerObj, route);
          console.log(response);
          if (response.ok) {
               Local.saveSellerInfo(response.data.token, response.data.seller);
               setSeller(response.data.seller);
               setLoginError("");
          } else {
               setLoginError("Login failed");
               console.log(loginError);
          }
     }

     // CART FUNCTIONS
     const increaseOrderCount = async (id, current, price) => {
          let patched = {
               productid: id,
               quantity: current + 1,
               price: price,
          };
          let response = await Api.patchContent(
               `/cart/${user.userid}`,
               patched
          );
          if (response.ok) {
               setCart(response.data);
          } else {
               setErrorMsg(response.error);
          }
     };

     const decreaseOrderCount = async (id, current, price) => {
          if (current === 1) {
               deleteFromCart(id);
          } else {
               let patched = {
                    productid: id,
                    quantity: current - 1,
                    price: price,
               };
               let response = await Api.patchContent(
                    `/cart/${user.userid}`,
                    patched
               );
               if (response.ok) {
                    setCart(response.data);
               } else {
                    setErrorMsg(response.error);
               }
          }
     };
     const deleteFromCart = async (productid) => {
          let response = await Api.deleteContent(
               `/cart/${user.userid}/${productid}`
          );
          if (response.ok) {
               setCart(response.data);
          } else {
               setErrorMsg(response.error);
          }
     };

     const addToCart = async (id, price) => {
          if (user) {
               let newCartObj = {
                    userid: user.userid,
                    productid: id,
                    price: price,
               };
               let response = await Api.addContent("/cart", newCartObj);
               if (response.ok) {
                    setCart(response.data);
               } else {
                    setErrorMsg(response.error);
               }
          }
     };

     const contextObj = {
          cart,
          increaseOrderCountCB: increaseOrderCount,
          decreaseOrderCountCB: decreaseOrderCount,
          deleteFromCartCB: deleteFromCart,
          addToCartCB: addToCart
     };

     async function updateUserInfo(userObj, route) {
          let response = await Api.patchContent(route, userObj);
          if (response.ok) {
               Local.saveUserInfo(response.data.token, response.data.user);
               setUser(response.data.user);
               setLoginError("");
          } else {
               setLoginError("Update failed");
               console.log(loginError);
          }
     }

     // update shop info

     async function updateShopInfo(shopObj, route) {
          let response = await Api.patchContent(route, shopObj);
          if (response.ok) {
               Local.saveSellerInfo(response.data.token, response.data.seller);
               setSeller(response.data.seller);
          } else {
               setErrorMsg(response.error);
          }
     }

     const addProduct = async ({name, description, imgurl, category, price, listedby}) => {
               let newProductObj = {
                    name: name,
                    description: description,
                    imgurl: imgurl,
                    category: category,
                    price: price,
                    listedby: seller.sellerid,
               };
               let response = await Api.addContent('/products/', newProductObj);
               if (response.ok) {
                    console.log('Product added!');
               } else {
                    setErrorMsg(response.error);
                    console.log(response.error);
          }
     };

     return (
          <div className="App">

               <CartContext.Provider value={contextObj}>
                    <header className="App-header">
                         <Navbar user={user} seller={seller}
                         userLogoutCb={handleUserLogout}
                         sellerLogoutCb={handleSellerLogout} />
                    </header>

                    <div className="d-flex flex-column align-items-center" >
                         <Sidebar />

                         <div className="App-content d-flex container justify-content-center">
                              <Routes>
                                   <Route path="/" element={<Home />} />
                                   <Route
                                        path="/products/all"
                                        element={<AllProducts user={user} />}
                                   />

                                   <Route
                                        path="/products/:productid"
                                        element={<ProductDetail user={user} />}
                                   />  

                                   <Route
                                        path="/products/art"
                                        element={<Art user={user} />}
                                   />

                                   <Route
                                        path="/products/clothing"
                                        element={<Clothing user={user} />}
                                   />

                                   <Route
                                        path="/products/homewares"
                                        element={<Homewares user={user} />}
                                   />

                                   <Route
                                        path="/products/jewellry"
                                        element={<Jewellry user={user} />}
                                   />

                                   <Route
                                        path="/cart"
                                        element={<PrivateRouteUsers>
                                             <Cart user={user} />
                                        </PrivateRouteUsers>}
                                   />

                                   <Route
                                        path="/user/login"
                                        element={
                                             <UserLogin
                                                  userLogInCb={(
                                                       username,
                                                       password
                                                  ) =>
                                                       handleUserLogin(
                                                            username,
                                                            password
                                                       )
                                                  }
                                             />
                                        }
                                        loginError={loginError}
                                   />
                                   <Route
                                        path="/user/signup"
                                        element={
                                             <UserSignUp
                                                  addUserCb={(newUser) =>
                                                       handleUserSignUp(newUser)
                                                  }
                                             />
                                        }
                                   />
                                   <Route
                                        path="/seller/login"
                                        element={
                                             <SellerLogin
                                                  sellerLogInCb={(
                                                       username,
                                                       password
                                                  ) =>
                                                       handleSellerLogin(
                                                            username,
                                                            password
                                                       )
                                                  }
                                             />
                                        }
                                        loginError={loginError}
                                   />
                                   <Route
                                        path="/seller/signup"
                                        element={
                                             <SellerSignUp
                                                  addSellerCb={(newSeller) =>
                                                       handleSellerSignUp(
                                                            newSeller
                                                       )
                                                  }
                                             />
                                        }
                                   />

                                   <Route
                                        path="/users/private"
                                        element={
                                             <PrivateRouteUsers>
                                                  <TestPrivateUsers />
                                             </PrivateRouteUsers>
                                        }
                                   />

                                   <Route
                                        path="/sellers/private"
                                        element={
                                             <PrivateRouteSellers>
                                                  <TestPrivateSellers />
                                             </PrivateRouteSellers>
                                        }
                                   />

                                   <Route
                                        path="/shopsettings"
                                        element={
                                             <PrivateRouteSellers>
                                             <ShopSettings
                                                  seller={seller}
                                                  updateNameCB={(
                                                       updatedNameObject,
                                                       route
                                                  ) =>
                                                       updateShopInfo(
                                                            updatedNameObject,
                                                            route
                                                       )
                                                  }
                                                  updateDescCB={(
                                                       updatedDescObject,
                                                       route
                                                  ) =>
                                                       updateShopInfo(
                                                            updatedDescObject,
                                                            route
                                                       )
                                                  }
                                             />
                                        </PrivateRouteSellers>
                                        }
                                   />

                                   <Route
                                        path="/addproduct"
                                        element={
                                             <PrivateRouteSellers>
                                             <AddProduct
                                                  seller={seller}
                                                  addProductCB={(
                                                       newProductObject,
                                                       route
                                                  ) =>
                                                       addProduct(
                                                            newProductObject,
                                                            route
                                                       )
                                                  }
                                             />
                                        </PrivateRouteSellers>}
                                   />

                                   <Route
                                        path="shop/:sellerid"
                                        element={<Shopfront seller={seller} />}
                                   />

                                   <Route
                                        path="/usersettings"
                                        element={
                                             <PrivateRouteUsers>
                                                  <UserSettings
                                                       user={user}
                                                       updateUserCB={(
                                                            updatedUserObject,
                                                            route
                                                       ) =>
                                                            updateUserInfo(
                                                                 updatedUserObject,
                                                                 route
                                                            )
                                                       }
                                                  />
                                             </PrivateRouteUsers>
                                        }
                                   />

                                   <Route
                                        path="/orderhistory"
                                        element={
                                             <PrivateRouteUsers>
                                                  <OrderHistory user={user} />
                                             </PrivateRouteUsers>
                                        }
                                   />

                                   <Route
                                        path="/orders/:sellerid"
                                        element={
                                             <PrivateRouteSellers>
                                             <SellerOrders
                                                  seller={seller}
                                             />
                                        </PrivateRouteSellers>}
                                   />
                              </Routes>
                         </div>
                    </div>
               </CartContext.Provider>
          </div>
     );
}

export default App;
