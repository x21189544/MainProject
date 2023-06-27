const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

//Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

//Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://x21189544:vPl0KPpIukdTT1qW@cluster0.6hyc4wq.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.log('Error connecting to MongoDB Atlas: ', error);
});

//Define MongoDB schema
const assetSchema = new mongoose.Schema({
    assetid: String,
    make: String,
    model: String,
    serial: String,
});

const Asset = mongoose.model('Asset', assetSchema); 

//Serve static files from the 'public' directory
app.use(express.static('public'));

//bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//Define routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/registerasset', (req, res) => {
  res.render('registerasset');
});

//send form data to MongoDB
app.post('/registerasset', (req, res) => {
    const assetid = req.body.assetid;
    const make = req.body.make;
    const model = req.body.model;
    const serial = req.body.serial;

    //create new asset document
    const asset = new Asset({
        assetid: assetid,
        make: make,
        model: model,
        serial: serial
    });

    //save asset document to database
    asset.save().then(() => {
        res.send('Asset registered');
    }).catch((error) => {
        console.log('Error saving Asset: '. error);
        res.send('Error registering asset');
    });
});

app.get('/reports', (req, res) => {
  res.render('reports');
});

app.get('/endoflife', (req, res) => {
  res.render('endoflife');
});

//Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
