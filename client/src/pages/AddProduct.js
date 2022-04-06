import React, {useState} from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const blank = {
    name: '',
    description: '',
    imgurl: '',
    category: '',
    price: '',
    listedby: '',
};

function AddProduct(props) {
    const [formData, setFormData] = useState(blank);


    toast.configure();

    const notifyProductAdd = () => {
      toast.success('Product added to shop!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    
      function handleChange(e) {
        let { name, value } = e.target;
        setFormData(data => ({
          ...data,
          [name]: value
        }));
      }

      function handleSubmit(e) {
        e.preventDefault();
        let newProductObject = {
            name: formData.name,
            description: formData.description,
            imgurl: formData.imgurl,
            category: formData.category,
            price: formData.price*100,
            listedby: props.seller.sellerid
        }
        let route = `/products/`;
         console.log(route, "route")
        props.addProductCB(newProductObject, route);
        setFormData(blank);
      }

    return (
      <div>
        <h2>Add Product</h2>

        <div className="container d-flex justify-content-center">
      <form className="mt-3 user-form" onSubmit={handleSubmit}>
          <div className="AddProductShopForm">

          <label className="form-label">Product Name</label>
          <input type="text"
                 name="name"
                 value={formData.name}
                 className="form-control"
                 onChange={handleChange}
                   />

          <label className="form-label">Description</label>
          <input type="text"
              name="description"
              value={formData.description}
              className="form-control"
              onChange={handleChange}
              />

          <label className="form-label">Image URL</label>
          <input type="text"
              name="imgurl"
              value={formData.imgurl}
              className="form-control"
              onChange={handleChange}
              />

          <label className="form-label">Category</label>
          <input type="text"
              name="category"
              value={formData.category}
              className="form-control"
              onChange={handleChange}
              />

          <label className="form-label">Price</label>
          <input type="number"
              name="price"
              value={formData.price}
              className="form-control"
              onChange={handleChange}
              />

                 
              <div>
              <button onClick={notifyProductAdd} type="submit" className="btn btn-primary formbutton">Add product</button>
              </div>
                </div>
                </form>
                </div>

                </div>
  )
}

export default AddProduct;
