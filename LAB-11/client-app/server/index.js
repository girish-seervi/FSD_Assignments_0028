const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs'); 

// (Optional) Connect to MongoDB if you have a connection string
// mongoose.connect('mongodb://localhost:27017/social_media', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/', (req, res) => {
    // If you had an EJS template named 'index', you would use:
    // res.render('index');
    res.send("Welcome to the Social Media Server!");
});

app.get('/api/data', (req, res) => {
    res.json({ message: "Hello from the Express server! The Social Media API is running." });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
