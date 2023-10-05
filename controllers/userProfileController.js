const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const success = req.query.success;
        // Check if there's a success message
        const successMessage = req.query.success ? 'Profile updated successfully!' : '';
        const errorMessage = req.query.error ? 'An error occurred, please try again.' : '';
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        console.log(user);
        res.render('userProfile', { user, successMessage, errorMessage });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);

    }
};

const updateUserProfile = async (req, res) => {
    // Send a response with the received name
    const { userId } = req.params;
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
        res.redirect(`/user/profile/${userId}?success=1`);
    }catch (error) {
        console.log(error.message);
        res.redirect(`/user/profile/${userId}?error=1`);
    }

};


module.exports = {
    getUserProfile,
    updateUserProfile
};