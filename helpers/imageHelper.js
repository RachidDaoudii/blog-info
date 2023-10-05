const multer = require('multer');
const path = require('path');
const imageFileFilter = require('../requests/imageFileFilter');

// Define multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Create a multer instance with the defined storage configuration
const upload = multer({ storage: storage, fileFilter: imageFileFilter });

module.exports = upload;
