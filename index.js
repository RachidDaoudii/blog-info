const express = require('express');
const session = require('express-session');
const app = express();
const userRoutes = require('./routes/profile');
const articleRoutes = require('./routes/articles');

// set style
// Configure Express to serve CSS files with a MIME type of 'text/css'
app.use(express.static('src', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    },
}));

const port = 3000;

const ejs = require('ejs');

// Parse JSON and URL-encoded bodies
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Configure session middleware
app.use(
    session({
        secret: 'any secret key', // hadi khassha tbdel darori bch t3ml session dyalk secure
        resave: false,
        saveUninitialized: true,
    })
);

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './public/views');

// routes
app.use('/user', userRoutes);
app.use('/article', articleRoutes);

app.listen(port, () => console.log(`Listening on port ${port}...`));
