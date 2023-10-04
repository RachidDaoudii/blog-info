const express = require('express');
const app = express();
const userRoutes = require('./routes/profile');

const port = 3000;
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './public/views');

app.use('/user', userRoutes);
app.listen(port, () => console.log(`Listening on port ${port}...`));
