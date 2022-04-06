import React, { useState } from 'react';

const blank = {
    username: '',
    password: ''
};

const UserLogin = (props) => {
    const [formData, setFormData] = useState(blank);

    function handleSubmit(event) {
      event.preventDefault();
      props.userLogInCb(formData.username, formData.password);
      if (props.loginError) {console.log(props.loginError)}
      setFormData(blank);
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
      <h2>Login</h2>

      <div className="container d-flex justify-content-center">
    <form className="mt-3 user-form" onSubmit={handleSubmit}>
        <div className="UserLoginForm">

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
               required
               value={formData.password}
               className="form-control"
               onChange={handleChange}
                 />
               
            <div>
            <button type="submit" className="btn btn-primary formbutton">Log In</button>
            </div>
              </div>
              </form>
              </div>
              <div>
          <br></br>
          <h3>Not got an account?</h3>
        <a className="btn btn-primary formbutton" href="/user/signup" role="button">Create Account</a>
            </div> 
              </div> 
  )
}

export default UserLogin;