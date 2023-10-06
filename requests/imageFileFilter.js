const imageFileFilter = function (req,file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        // return cb('Only image files are allowed!', false);
        req.fileValidationError = 'Only image files are allowed!';
        // Indicate that the file is not accepted
        return cb(null, false);
    }
    cb(null, true);
};

module.exports = imageFileFilter;