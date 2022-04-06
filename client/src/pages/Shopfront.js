import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import './Shopfront.css';
import Loading from '../components/Loading';

function Shopfront(props) {

  const [selectedShop, setSelectedShop] = useState({});
  let {sellerid} = useParams();

  useEffect(() => {
    getSelectedShop(sellerid);
  }, []);

  const getSelectedShop = async sellerid => {
    try {
      let response = await fetch(`/sellers/${sellerid}`);
      if (response.ok) {
        let selectedShop = await response.json();
        setSelectedShop(selectedShop);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  };

 return (
<div className="shopfront d-flex flex-column align-items-center">

{
            Object.keys(selectedShop.coverurl !== null && selectedShop.picurl !== null && selectedShop).length > 0
            ?
            (
              <div className="header-div">
              <div className="profile-cover">
            <img className="profile-cover-img" src={`/images/sellers/${selectedShop.coverurl}`} alt="cover photo"></img>
            <img className="profile-seller-img" src={`/images/sellers/${selectedShop.picurl}`} alt="profile photo"></img>
        </div>

        <div className="profile-info">
        <h2 className="shop-name">{selectedShop.shopname}</h2>
            <p className="shop-desc">{selectedShop.description}</p>
        </div>

        <div className="container shopfront-cont mt-5">
          <div className="row">
            {
              selectedShop.products.map(prod => (
                <div className="seller-prod-display col-md-6 col-lg-4 d-flex flex-column align-items-center" key={prod.productid}>
                  
                  <Link to={`/products/${prod.productid}`} className="seller-prod-link">
                  <div className="prod-card d-flex flex-column p-2 rounded">
                  <div className="img-container"><img src={prod.imgurl} className="prod-img"/></div>
                  <div className="fs-6 mt-2 prod-name">{prod.name}</div>
                  <div className="fw-bold fs-5 prod-price">€{(prod.price/100).toFixed(2)}</div>
                  </div>
                  </Link>

                </div>
              ))
            }
            
          </div>
        </div>
        </div>
            )
            :

            Object.keys(selectedShop.coverurl === null && selectedShop.picurl === null &&selectedShop).length > 0
            ?
            (
              <div>
                <h2 className="shop-h2"> Shop</h2>
              <p className="shop-p"> Shop is currently empty
              </p>
        </div>
            )
            :
            <Loading />
          }

          

</div>
 )
}

export default Shopfront;

// Object.keys(selectedShop.coverurl !== null && selectedShop.picurl !== null && selectedShop).length > 0
//             ?
//             (
//               <div>
//               <div className="profile-cover">
//             <img className="profile-cover-img" src={`/images/sellers/${selectedShop.coverurl}`} alt="cover photo"></img>
//             <img className="profile-seller-img" src={`/images/sellers/${selectedShop.picurl}`} alt="profile photo"></img>
//         </div>

//         <div className="profile-info">
//         <h2 className="shop-name">{selectedShop.shopname}</h2>
//             <p className="shop-desc">{selectedShop.description}</p>
//         </div>

//         <div className="container mt-5">
//           <div className="row">
//             {
//               selectedShop.products.map(prod => (
//                 <div className="col-md-6 d-flex flex-column align-items-center" key={prod.productid}>
                  
//                   <Link to={`/products/${prod.productid}`}>
//                   <div className="prod-card d-flex flex-column p-2 rounded">
//                   <div className="img-container"><img src={prod.imgurl} className="prod-img"/></div>
//                   <div className="fs-6 mt-2">{prod.name}</div>
//                   <div className="fw-bold fs-5">€{(prod.price/100).toFixed(2)}</div>
//                   </div>
//                   </Link>

//                 </div>
//               ))
//             }
            
//           </div>
//         </div>
//         </div>
//             )
//             :




// GET one seller
// router.get('/:sellerid', ensureSameSeller, async function(req, res, next) {
//     let {sellerid} = req.params;
//     let sql = 'SELECT * FROM sellers WHERE sellerid = ' + sellerid;
  
//     try {
//       let results = await db(sql);
//       let seller = results.data[0];
//       delete seller.password;
//       res.send(seller);
//     } catch (err) {
//       res.status(500).send({error: err.message});
//     }
//   }); 