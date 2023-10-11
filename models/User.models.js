const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class User {
    constructor(name, email, password, picture) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.picture = picture;
    }

    async hashPassword() {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    async save() {
        await this.hashPassword();
        return prisma.user.create({
            data: {
                name: this.name,
                email: this.email,
                password: this.password,
                image: 'default.png',
            },
        });
    }
}

module.exports = User;