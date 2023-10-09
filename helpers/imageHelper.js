const multer = require('multer');
const path = require('path');
const imageFileFilter = require('../requests/imageFileFilter');
const fs = require('fs');


// Define multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        
        // if(req.body.title == "" || req.body.content == ""){
        //     return cb(new Error('Title and content are required'), null);
        // }
        // else{
        //     cb(null, Date.now() + path.extname(file.originalname));
        // }

        cb(null, Date.now() + path.extname(file.originalname));
        
    },

});

// Create a multer instance with the defined storage configuration
const upload = multer({ storage: storage, fileFilter: imageFileFilter });


const unlinkimage = async (nameimage)=>{
    const deleteimage =  await fs.unlink(`./public/images/${nameimage}`, (err) => {
    if (err) {
        console.error('Erreur lors de la suppression de l\'image', err);
        return;
    }
    console.log('Image supprimée avec succès');
    });
}

module.exports = {
    upload,
    unlinkimage
};
