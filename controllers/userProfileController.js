const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        console.log(user);
        res.render('userProfile', { user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getUserProfile
};