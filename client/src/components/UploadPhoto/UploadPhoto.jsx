import React, { useState } from 'react';
import $ from "jquery";
import './UploadPhoto.css';

const UploadPhoto = () => {
    //selecting all required elements
    // $(function () {
    //     const dropArea = document.querySelector(".drag-area");
    //     // const input = dropArea.querySelector("input");
    //     // console.log("++++++++", input)

    //     dropArea.addEventListener("dragover", (event) => {
    //         event.preventDefault();
    //         dropArea.classList.add("active");
    //         // dragText.textContent = "Release to Upload File";
    //     });

    //     dropArea.addEventListener("dragleave", () => {
    //         dropArea.classList.remove("active");
    //         // dragText.textContent = "Drag & Drop to Upload File";
    //     });

    //     dropArea.addEventListener("drop", (event) => {
    //         event.preventDefault();
    //         let file = event.dataTransfer.files[0];
    //         showFile(file);
    //     });

    //     // input.addEventListener("change", function (event) {
    //     //     let file = event.target.files[0];
    //     //     dropArea.classList.add("active");
    //     //     showFile(file); 
    //     // });

    //     function showFile(file) {
    //         let fileType = file.type;
    //         let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    //         if (validExtensions.includes(fileType)) {
    //             let fileReader = new FileReader();
    //             fileReader.onload = () => {
    //                 let fileURL = fileReader.result;
    //                 let imgTag = `<img src="${fileURL}" alt="image">`;
    //                 dropArea.innerHTML = imgTag;
    //             }
    //             fileReader.readAsDataURL(file);
    //         } else {
    //             alert("This is not an Image File!");
    //             dropArea.classList.remove("active");
    //             removeImg.classList.remove("show");
    //             // dragText.textContent = "Drag & Drop to Upload File";
    //         }
    //     }
    // })


    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [errMessage, setErrMessage] = useState('');

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
        // console.log(source);
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: source }),
                headers: { 'Content-Type': 'application/json' }
            })
            setFileInputState('');
            setPreviewSource('');
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleClick = (e) => {
        setPreviewSource('');
        document.querySelector(".remove-img").classList.remove("show");
    }

    return (
        <div>
            <h1>Upload an Image</h1>
            <form onSubmit={handleSubmitFile}>
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

                    <div className="remove-img" onClick={handleClick}><i className="fas fa-trash"></i></div>
                </div>

                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div>

    );
}

export default UploadPhoto;