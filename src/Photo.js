var Photo = ({ photo }) => (
    <div className="photo media">
        <div className="photo-con">
            <span className="photo-name">{ photo.label}</span>
            <img className="media-object" src={photo.url} alt={photo.label} style={{ width:350, height:410 }}/>
        </div>
        {/* <div className="photo-buttons">
            <button className="delete" onClick={ }>Delete</button>
            <button className="add-to-fav" onClick={ }>Add-To-Fav</button>
        </div> */}
    </div>
);


export default Photo;

