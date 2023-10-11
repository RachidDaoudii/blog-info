const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validateFormUser = require('../requests/formUser');

const getUserProfile = async (req, res) => {

    // check if user is logged in
    const loggedInUser = req.cookies.loggedIn_user;
    const { userId } = req.params;
    if (userId !== loggedInUser) {
        return res.status(403).send('You are not authorized to view this profile');
    }
    try {

        // Check if there's a success message
        const errorMessage = req.session.errorMessage;
        const successMessage = req.session.successMessage;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        if(!user){
            return res.status(404).send('User not found.');
        }
        // Clear the messages from the session
        req.session.errorMessage = null;
        req.session.successMessage = null;
        res.render('userProfile/userProfile', { user, successMessage, errorMessage ,blockLayout: false  });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);

    }
};

const updateUserProfile = async (req, res) => {
    // return res.send('hhhhh');
    const csrfToken = req.body._csrf;
    const csrfCookie = req.cookies.csrfToken;
    if (csrfToken !== csrfCookie) {
        return res.send('CSRF token is invalid');
    }

    let { userId } = req.params;
    let loggedInUser = req.cookies.loggedIn_user;
    if (userId !== loggedInUser) {
        return res.status(403).send('You are not authorized to update this profile');
    }else{
        console.log('User is authorized to update this profile');
    }
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

const getLoggedInUser = async (req, res) => {
//     // Get the user ID from the cookie
     const userId = req.cookies.loggedIn_user;
     const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
     });
        return user;
};


module.exports = {
    getUserProfile,
    updateUserProfile
};