import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import SubmitModal from '../components/Modal';

const blank = {
    email: '',
    username: '',
    password: ''
};

function UserSignUp(props) {
    const [formData, setFormData] = useState(blank);
    const [modalShow, setModalShow] = useState(false);
    const modalInfo = {
      title: 'Account created successfully!',
      closetext: 'Close window',
      backtext: 'Log In',
      backpath: '/user/login'
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      props.addUserCb(formData);
      setModalShow(true);
      setFormData(blank);
      // add MUI alerts here depending on success or not
    }
  
    function handleChange(event) {
      let { name, value } = event.target;
      setFormData(data => ({
        ...data,
        [name]: value
      }));
    }
  
    return (
      <div>
        <h2>Create Account</h2>

        <div className="container d-flex justify-content-center">
      <form className="mt-3 user-form" onSubmit={handleSubmit}>
          <div className="ShopperSignupForm">

          <label className="form-label">Email</label>
          <input type="text"
                 name="email"
                 value={formData.email}
                 className="form-control"
                 onChange={handleChange}
                   />

          <label className="form-label">Username</label>
          <input type="text"
                 name="username"
                 value={formData.username}
                 className="form-control"
                 onChange={handleChange}
                   />

          <label className="form-label">Password</label>
          <input type="password"
                 name="password"
                 value={formData.password}
                 className="form-control"
                 onChange={handleChange}
                   />
                 
              <div>
              <button type="submit" className="btn btn-primary formbutton">Create account</button>
              </div>
                </div>
                </form>
                </div>
                <SubmitModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                modalInfo={modalInfo}/>
                </div>
    );
}

export default UserSignUp;