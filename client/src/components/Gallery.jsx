import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Image } from 'cloudinary-react';

import { PINS } from './queries/queries';

const Gallery = () => {
    const [imageIds, setImageIds] = useState();
    const { loading, error, data } = useQuery(PINS);
    console.log("qraphql ===>", data);
    // const loadImages = async () => {
    //     try {
    //         const res = await fetch('http://localhost:3001/images')
    //         const data = await res.json();
    //         console.log(data);
    //         setImageIds(data);
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // }
    // useEffect(() => {
    //     loadImages();
    // }, [])

    return (
        <div className="photo-list">
            {imageIds && imageIds.map((imageId, index) => (
                <Image key={index} CloudName="adam-a113" publicId={imageId} width="300" crop="scale" />
            ))}

        </div>
    )
}

export default Gallery;