var express = require('express');
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '../compiled/client/src'));

app.post('/favourite', function (req, res) {
    console.log(req)


    // res.end();
});

// app.getfavourite function (req, res) {
//   // res.render("/");
// });

app.listen(3001, () => {
    console.log('server is listening ')
})



