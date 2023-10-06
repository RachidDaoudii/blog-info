const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validateFormUser = require('../requests/formUser');

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        // Check if there's a success message
        const errorMessage = req.session.errorMessage;
        const successMessage = req.session.successMessage;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        console.log(user);
        // Clear the messages from the session
        req.session.errorMessage = null;
        req.session.successMessage = null;
        res.render('userProfile', { user, successMessage, errorMessage });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);

    }
};

const updateUserProfile = async (req, res) => {

    let { userId } = req.params;
    // check error
    if (req.fileValidationError) {
        // Store the error message in the session
        req.session.errorMessage = req.fileValidationError;

        // Redirect the user to the profile page
        return res.redirect(`/user/profile/${userId}`);
    }

    // validate form
    let error = validateFormUser(req, res);
    if (error) {
        console.log(error);
        req.session.errorMessage = error.details[0].message;
        return res.redirect(`/user/profile/${userId}`);
    }


    try {
        // const { userId } = req.params;
        const updatedProfileData = req.body;
        // Update the user's name and email
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
                name: updatedProfileData.name,
                email: updatedProfileData.email,
            },
        });
        // Check if an image file was uploaded
        if (req.file) {
            // Update the user's profile image
            await prisma.user.update({
                where: { id: parseInt(userId) },
                data: {
                    image: req.file.filename, // Assuming you're storing the filename in the database
                },
            });
        }

        // Redirect the user to the profile page with a success message
        req.session.successMessage = 'Profile updated successfully';
        res.redirect(`/user/profile/${userId}`);
    }catch (error) {
        console.log(error.message);
        res.redirect(`/user/profile/${userId}?error=1`);
    }

};


module.exports = {
    getUserProfile,
    updateUserProfile
};