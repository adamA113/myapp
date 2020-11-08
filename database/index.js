const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3001/fav', { useNewUrlParser: true, useUnifiedTopology: true });
let repoSchema = mongoose.Schema({
    
    id: { type: Number },
    photo_label: String,
    photo_url: String,
    password: String
});


let Repo = mongoose.model('Repo', repoSchema);

let saveData = (data) => {
    var customData = {
        id: data,
        photo_label: data,
        photo_url: data,
        password: data
    }
    var datab = new Repo(customData);

    datab.save((err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result)
        }
    });

}

module.exports.saveData = saveData;