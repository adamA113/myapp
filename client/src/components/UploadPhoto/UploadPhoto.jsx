import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
// import axios from "axios";
// import $ from "jquery";
import './UploadPhoto.css';

import { AddPin, UserSignUp } from '../queries/queries';

const UploadPhoto = () => {
    const [addPin] = useMutation(AddPin);

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [formData, setFormData] = useState({
        title: null,
        description: null,
        userId: "60b6a483f7931b08344870c4",
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        let fileType = file.type;
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        if (validExtensions.includes(fileType)) {
            // setErrMessage('');
            previewFile(file);
            setFileInputState(e.target.value);
        }
        // else {
        //     setErrMessage("Your upload failed because it's the wrong format.")
        // }
    }

    //display input image as a string
    const previewFile = (file) => {
        document.querySelector(".remove-img").classList.remove("show");
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
            document.querySelector(".remove-img").classList.add("show");
        }
    }

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!previewSource) return
        uploadImage(previewSource);
    }

    const uploadImage = async (source) => {
        console.log(source);
        try {
            addPin({
                variables: {
                    title: formData.title,
                    description: formData.description,
                    imageURL: source,
                    userId: formData.userId
                }
            });
            setFileInputState('');
            setPreviewSource('');
        }
        catch (err) {
            console.log(err);
        }


        // await fetch('http://localhost:3001/upload', {
        //     method: 'POST',
        //     body: JSON.stringify({ data: source }),
        //     headers: { 'Content-Type': 'application/json' }
        // })
        //     .then((response) => {
        //         console.log("before", response);
        //     })
        //     .catch(error => console.error(error))

    }

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value
        })
    }

    const handleRemoveClick = (e) => {
        setPreviewSource('');
        document.querySelector(".remove-img").classList.remove("show");
    }

    return (
        <div>
            <h1>Upload an Image</h1>
            <form onSubmit={handleSubmitFile}>
                <textarea onChange={handleChange} id="title" placeholder="Add you title" maxLength="100" cols="50" required></textarea><br />

                <textarea onChange={handleChange} id="description" placeholder="Tell everyone what is your pin about" maxLength="500" cols="50" required></textarea>

                <div className="img-preview">
                    <div className="drag-area">
                        <div className="drag-area-info">
                            {/* <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div> */}
                            <div className="icon"><i className="fas fa-arrow-circle-up fa-2x"></i></div>
                            <header>Drag and drop or click to upload</header>
                            <p> Recommendation: Use high-quality .jpg files less than 20MB</p>
                        </div>

                        {previewSource && (<img src={previewSource} alt="string representing the input img" />)}
                        <input type="file" onChange={handleFileChange} value={fileInputState} />
                    </div>

                    <div className="remove-img" onClick={handleRemoveClick}><i className="fas fa-trash"></i></div>
                </div>

                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div>

    );
}

export default UploadPhoto;