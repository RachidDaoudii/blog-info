const express = require('express');
const app = express();

// testing thr git auto deploy
const port = 3000;

 app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Listening on port ${port}...`))
