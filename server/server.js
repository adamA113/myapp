const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./database/schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const { cloudinary } = require('./utils/cloudinary')
require('dotenv').config();

const app = express();

// allow cross-origin requests
app.use(cors());

const dbURI = "mongodb+srv://adamA113:student@pinterest.wbf36.mongodb.net/pinterest-clone";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("db connected"))
    .catch(err => console.log(err));

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname + '../compiled/client/src'));
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        // console.log("=====", req.body)
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, { upload_preset: 'pinterest' }, function (error, result) {
            console.log(result)
        })
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search.expression('folder:pics')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();
    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
})

// app.get('/api/images', async (req, res) => {
//     const { resources } = await cloudinary.search.expression('public_id:pics/xnlaqgswmvbijosjt2yl')
//         .execute();
//     const publicIds = resources.map((file) => file.public_id);
//     res.send(publicIds);
// })

// app.use(function (req, res, next) {
//     console.log("====", __dirname)


//     next();
// });

//listen for requests
const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`server is listening to ${port}`)
})



