import React, {useState} from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadForm(props) {
    const [profileFile, setProfileFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

    toast.configure();

    const notifyProfile = () => {
      toast.success('Profile picture updated!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    const notifyCover = () => {
        toast.success('Cover photo updated!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }

    function handleFileChange(event) {
        setProfileFile(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('myfile', profileFile, profileFile.name);

        props.uploadProfileCb(formData)

        setProfileFile(null);
    }

    function handleCoverChange(event) {
        setCoverFile(event.target.files[0]);
    }

    function handleCoverSubmit(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('myfile', coverFile, coverFile.name);

        props.uploadCoverCb(formData)

        setCoverFile(null);
    }
    

    return (
        <div>
            <div className="container d-flex justify-content-center">
        <div className="upload-form">
            <form className="mt-3 user-form" onSubmit={handleSubmit}>
            <label>Upload Profile Picture
                <br></br>
            <input type="file"
                   onChange={handleFileChange}
                   />
            </label>
            <br></br>
            <button class=" btn formbutton" onClick={notifyProfile} type="submit">Upload</button>
            </form>     
        </div>
        </div>

        <div className="container d-flex justify-content-center">
        <div className="upload-form">
            <form className="mt-3 user-form" onSubmit={handleCoverSubmit}>
            <label>Upload Cover Photo
                <br></br>
            <input type="file"
                onChange={handleCoverChange}
                />
            </label>
            <br></br>
            <button class="btn formbutton" onClick={notifyCover} type="submit">Upload</button>
            </form>     
            </div>
            </div>

        </div>
    )
}

export default UploadForm;