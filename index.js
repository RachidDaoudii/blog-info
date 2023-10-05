const express = require('express');
const app = express();
const userRoutes = require('./routes/profile');
const articleRoutes = require('./routes/articles');

// set style
app.use(express.static('public'));

const port = 3000;

const ejs = require('ejs');

// Parse JSON and URL-encoded bodies
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests




// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './public/views');

// routes
app.use('/user', userRoutes);
app.use('/article', articleRoutes);

app.listen(port, () => console.log(`Listening on port ${port}...`));
