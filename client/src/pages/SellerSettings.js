import React, {useState} from 'react';
import {MdSettings} from 'react-icons/md';
import './UserSettings.css';

const INIT_STATE = {
    newEmail: '',
    oldPassword: '',
    newPassword: ''
};

const SellerSettings = (props) => {
    const [formData, setFormData] = useState(INIT_STATE);

    const handleEmail = (e) => {
        e.preventDefault();
        let updatedSeller = {
            username: props.seller.username,
            email: formData.newEmail
        }
        let route = '/seller/change_email';
        props.updateSellerCB(updatedSeller, route);
        setFormData(INIT_STATE);
      }

    const handlePassword = (e) => {
        e.preventDefault();
        let updatedSeller = {
            username: props.seller.username,
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword
        }
        let route = '/seller/change_password'
        props.updateSellerCB(updatedSeller, route);
        setFormData(INIT_STATE);
    }
    
      function handleChange(e) {
        let { name, value } = e.target;
        setFormData(data => ({
          ...data,
          [name]: value
        }));
      }

    return (
     <div id="user-settings" className="container d-flex flex-column align-items-center">
      <h2 className="mb-4">My Settings</h2>
      
        <div className="d-flex flex-column align-items-center">
      
      <form 
      onSubmit={e => handleEmail(e)}
      className="user-form mb-4 bg-light rounded text-dark p-3" >
      <h4 className="mb-3">Update Email</h4>  
        
          <div className="mb-3">
          <label className="form-label d-block mb-1">Current email:</label> 
          <p className="border p-2 text-muted text-start">{props.seller.email}</p>
          </div>

        <div className="mb-3">
          <label className="form-label d-block">Enter new email:</label>
          <input 
          className="form-control"
          name="newEmail"
          value={formData.newEmail}
          onChange={(e) => handleChange(e)} />
          </div>
          
          <div>
          <button className="btn btn-primary" type="submit">Submit</button>
          </div>

        </form>

      <form className="user-form bg-light rounded text-dark p-3 mb-3" onSubmit={e => handlePassword(e)}> 
      <h4 className="mb-3">Update Password</h4>  
          <div className="mb-3">
          <label className="form-label d-block">Enter current password:</label>
          <input 
          name="oldPassword"
          type="password"
          value={formData.oldPassword}
          className="form-control"
          onChange={(e) => handleChange(e)}  />
          </div>

        <div className="mb-3">
          <label className="form-label d-block">Enter new password:</label>
          <input 
          className="form-control"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={(e) => handleChange(e)}
           />
          </div>
          
          <div>
          <button className="btn btn-primary" type="submit">Submit</button>
          </div>

        </form> 
        </div>
     </div>

  )
}

export default SellerSettings;