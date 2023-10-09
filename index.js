const userRoutes = require('./routes/profile');
const articleRoutes = require('./routes/articles');
const commentsRoutes = require('./routes/comments');
const authRouter = require('./routes/auth');
const pages = require('./routes');
const bodyParser = require('body-parser');
const layoutEjs = require('express-ejs-layouts');

const express = require('express');
const session = require('express-session');
const app = express();
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));


// Use method-override middleware
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
// Configure session middleware
app.use(
    session({
        secret: "any secret key", // hadi khassha tbdel darori bch t3ml session dyalk secure
        resave: false,
        saveUninitialized: true,
    })
);
// Set EJS as the view engine
app.use(layoutEjs);
app.set("view engine", "ejs");
app.set("views", "./public/views");

// app.use((req, res, next) => {
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

// routes
app.use("/user", userRoutes);
app.use("/article", articleRoutes);
app.use("/comment", commentsRoutes);
app.use("/", pages);
app.use('/auth', authRouter)

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));