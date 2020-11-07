import Photo from './Photo';

var Galary = () => (
    <div className="photo-list">
        {photos.map((photo) =>
            <Photo/>
        )}
    </div>
);


export default Galary;