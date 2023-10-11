const bcrypt = require('bcryptjs');
const User = require('../models/user.models');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validateFormUser = require('../requests/formUser');

class AuthController {

    static async index(req, res) {
        return await res.render('auth/login', { errorMessage: '' }); // Provide an initial empty errorMessage
    }

    static async register(req, res) {
        return await res.render('auth/register', { includeHeaderFooter: false })
    }

    static async signup(req, res) {
        let error = validateFormUser(req, res);
        if (error) {
            console.log(error);
            req.session.errorMessage = error.details[0].message;
            return res.redirect(`auth/register`);
        }
        try {
            const { name, email, password } = req.body;
            const picture = req.file ? req.file.path : null; // Assuming multer is used for file upload

            const user = new User(name, email, password, picture);
            await user.save();
            res.status(201).render('auth/login');
        } catch (error) {
            console.error('Error signing up:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }

    static async login(req, res) {

        console.log(req.body);
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.render('auth/login', { errorMessage: 'User not found !' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.render('auth/login', { errorMessage: 'Invalid password !' });
            }

            res.cookie('loggedIn_user', user.id, { httpOnly: true });

            return res.redirect('/article');
        } catch (error) {
            console.error('Error during login:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }

    static async logout(req, res) {
        res.clearCookie('loggedIn_user');
        return res.redirect('/auth')
    }
}

module.exports = AuthController;