import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Image } from 'cloudinary-react';

const pinsQuery = gql`
    {
        pins {
            title
            description
        }
    }
`
const Gallery = () => {
    const [imageIds, setImageIds] = useState();
    const { loading, error, data } = useQuery(pinsQuery);
    // console.log(data);
    const loadImages = async () => {
        try {
            const res = await fetch('/api/images')
            const data = await res.json();
            console.log(data);
            setImageIds(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        loadImages();
    }, [])

    return (
        <div className="photo-list">
            {imageIds && imageIds.map((imageId, index) => (
                <Image key={index} CloudName="adam-a113" publicId={imageId} width="300" crop="scale" />
            ))}

        </div>
    )
}

export default Gallery;