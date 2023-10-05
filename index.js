const express = require('express');
const app = express();
const userRoutes = require('./routes/profile');
const port = 3000;

const ejs = require('ejs');

// Parse JSON and URL-encoded bodies
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// routes
app.use('/user', userRoutes);


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.listen(port, () => console.log(`Listening on port ${port}...`));
