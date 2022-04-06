import React, {useEffect, useState} from 'react';
import UploadForm from '../components/UploadForm';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const blank = {
     shopname: "",
     description: "",
};

const ShopSettings = (props) => {
     const [formData, setFormData] = useState(blank);

    toast.configure();

    const notifyName = () => {
      toast.success('Shop name updated!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    const notifyDesc = () => {
      toast.success('Shop description updated!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    const handleNameSubmit = (event) => {
      
      event.preventDefault();

        let updatedName = {
            shopname: formData.shopname,
        }
        let route = `/sellers/${props.seller.sellerid}`;
         console.log(route, "route")
        props.updateNameCB(updatedName, route);
        setFormData(blank);
      }
    
      function handleNameChange(event) {
        let { name, value } = event.target;
        setFormData(data => ({
          ...data,
          [name]: value
        }));
      }

      const handleDescSubmit = (event) => {
      
        event.preventDefault();
  
          let updatedDesc = {
              description: formData.description
          }
          let route = `/sellers/${props.seller.sellerid}`;
           console.log(route, "route")
          props.updateDescCB(updatedDesc, route);
          setFormData(blank);
        }
      
        function handleDescChange(event) {
          let { name, value } = event.target;
          setFormData(data => ({
            ...data,
            [name]: value
          }));
        }

     async function uploadProfile(fd) {
          let options = {
               method: "PATCH",
               body: fd,
          };

          try {
               let response = await fetch(
                    `sellers/profile/${props.seller.sellerid}`,
                    options
               );
               if (response.ok) {
                    let data = await response.json();
                    props.setProfileFile(data);
               } else {
                    console.log(
                         `Server error: ${response.status}: ${response.statusText}`
                    );
               }
          } catch (err) {
               console.log(`Network error:${err.message}`);
          }
     }

     async function uploadCover(fd) {
          let options = {
               method: "PATCH",
               body: fd,
          };

          try {
               let response = await fetch(
                    `sellers/cover/${props.seller.sellerid}`,
                    options
               );
               if (response.ok) {
                    let data = await response.json();
                    props.setCoverFile(data);
               } else {
                    console.log(
                         `Server error: ${response.status}: ${response.statusText}`
                    );
               }
          } catch (err) {
               console.log(`Network error:${err.message}`);
          }
     }

    return (
      <div>
        <h2>Shop Settings</h2>

        <div>
          {/* <div className="img-thumb">
          <img className="img-prev" src={`/images/sellers/${props.seller.picurl}`}/> </div>
          <div className="img-thumb">
        <img className="img-prev" src={`/images/sellers/${props.seller.coverurl}`}/> </div> */}
        <UploadForm uploadProfileCb={fd => uploadProfile(fd)} uploadCoverCb={fd => uploadCover(fd)} />
        </div>

        <div className="container d-flex justify-content-center">
      <form className="mt-3 user-form" onSubmit={handleNameSubmit}>
          <div className="UpdateShopForm">
          <label className="form-label">Shop Name</label>
          <input type="text"
                 name="shopname"
                 value={formData.shopname}
                 className="form-control"
                 onChange={handleNameChange}>
                 </input>
                 <div>
                <button onClick={notifyName}type="submit" className="btn btn-primary formbutton">Update</button>
              </div>
                </div>
                </form>
                </div>
   
                <div className="container d-flex justify-content-center">
          <form className="mt-3 user-form" onSubmit={handleDescSubmit}>
          <div className="UpdateShopForm">
          <label className="form-label">Shop Description</label>
          <input type="text"
                 name="description"
                 value={formData.description}
                 className="form-control"
                 onChange={handleDescChange}>
                </input>
              <div>
              <button onClick={notifyDesc}type="submit" className="btn btn-primary formbutton">Update</button>
              </div>
                </div>
                </form>
                </div>

                </div>
     
  )
}

export default ShopSettings;
