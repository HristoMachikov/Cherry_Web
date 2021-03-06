const { Schema, model } = require('mongoose');
// const encryption = require('../utils/encryption');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../app-config');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: {
        type: Schema.Types.String,
        required: [true, 'Password is required'],
    },
    email: {
        type: Schema.Types.String,
        required: [true, 'Email is required'],
        unique: true,
    },
    phone: {
        type: Schema.Types.String,
        required: [true, 'Phone is required'],
    },
    address: { type: Schema.Types.String, default: "" },
    newPassLinkId: { type: Schema.Types.String },
    newPassword: { type: Schema.Types.String },
    // newPassSalt: { type: Schema.Types.String },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    cherries: [{ type: Schema.Types.ObjectId, ref: "Cherry" }],
    states: [{ type: Schema.Types.ObjectId, ref: "State" }],
    // salt: { type: Schema.Types.String },
    roles: [{ type: Schema.Types.String }]
})

userSchema.methods = {
    matchPassword: function (password) {
        // return encryption.generateHashedPassword(this.salt, password) === this.password;
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        if (this.isNew && this.username === "Admin") return next();
        // const salt = encryption.generateSalt()
        // const hash = encryption.generateHashedPassword(salt, this.password);
        // this.password = hash;
        // this.salt = salt;
        // next();
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) { next(err); return; }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return; }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

const User = model('User', userSchema);

// TODO: Create an admin at initialization here
User.seedAdmin = async () => {
    try {
        const users = await User.find();
        if (users.length > 0) {
            return;
        }

        const hashedPass = await bcrypt.hash('Admin', saltRounds)
        // const salt = encryption.generateSalt();
        // const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
        return User.create({
            username: 'Admin',
            password: hashedPass,
            email: 'hristomachikov@gmail.com',
            phone: '0123456789',
            // salt,
            roles: ['Admin']
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = User;