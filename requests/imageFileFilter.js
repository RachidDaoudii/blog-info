const imageFileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        // Reject files that are not images
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

module.exports = imageFileFilter;