import React, { useState } from 'react';

const UploadPhoto = () => {

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setFileInputState(e.target.value);
    }

    //display input image as a string
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
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

    return (
        <div>
            <h1>Upload an Image</h1>
            <form onSubmit={handleSubmitFile}>
                <input type="file" onChange={handleFileChange} value={fileInputState}></input>
                <button className="btn" type="submit">Submit</button>
            </form>
            { previewSource && (<img src={previewSource} alt="string representing the input img" style={{ height: '300px' }} />)}
        </div>

    );
}

export default UploadPhoto;