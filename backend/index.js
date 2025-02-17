const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PostRoute = require('./routes/post.route.js');
const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//routes
app.use("/api/DetailPage", PostRoute);
app.get('/', (req, res) => {
    res.send('Hello World ,this is nodemon kjkk');
});
mongoose.connect("mongodb+srv://admin:1nQEg5QATJVp6gFW@backenddb.jf9zj.mongodb.net/Users?retryWrites=true&w=majority&appName=BackendDB").then(db => {
    console.log('DB connected')
    app.listen(3000, () => { console.log('Server is running on port 3000') });
}).catch(err => { console.log(err) });