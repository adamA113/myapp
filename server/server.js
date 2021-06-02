const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const { cloudinary } = require('./utils/cloudinary');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();

// allow cross-origin requests
app.use(cors());

// set database
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(result => console.log("db connected"))
    .catch(err => console.log(err));

app.use(express.urlencoded({ limit: "50MB", extended: true }));
app.use(express.json({ limit: "50MB" }));
app.use(express.static(__dirname + '../compiled/client/src'));

// app.use('/api', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

// app.use('/graphql', graphqlHTTP({
//     schema: typeDefs,
//     graphiql: true
// }));

const server = new ApolloServer({ typeDefs, resolvers });

// app.post('/upload', async (req, res) => {
//     try {
//         const fileStr = req.body.data;
//         // console.log("=====", fileStr)
//         const uploadedResponse = await cloudinary.uploader.upload(fileStr, { upload_preset: 'pinterest' }, function (error, result) {
//             // console.log(result);
//             // res.send({ test: result.public_id });
//         })
//         res.send(uploadedResponse.public_id)
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

// app.get('/images', async (req, res) => {
//     const { resources } = await cloudinary.search.expression('folder:pics')
//         .sort_by('public_id', 'desc')
//         .max_results(30)
//         .execute();
//     const publicIds = resources.map((file) => file.public_id);
//     res.send(publicIds);
// })

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

const port = process.env.PORT || 4000
server.listen({ port: port }).then(() => {
    console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});



