const express = require('express');
const mongoose = require('mongoose');
const punycode = require('punycode');
const dotenv  =  require('dotenv').config();
const routes = require('./routes/routes.js')

const app = express();
const PORT = process.env.PORT || 3002;

mongoose.connect('mongodb+srv://admin:admin@atlascluster.3avcogk.mongodb.net/?retryWrites=true&w=majority');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use(express.json());
app.use("/notes",require("./routes/routes.js"));


app.get('/',(req,res) => {
    res.send("hello");
})


app.listen(PORT, () => {
  console.log(`Server is running on pocvrt ${PORT}`);
});
