const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

const userSchema = new Schema(
    {
        _id: ObjectId,
        username: { 
            type: String,
            required: true,
            unique: true 
        },
        email: { 
            type: String,
            required: true,
            unique: true, 
            validate: [validator.isEmail, "invalid email"]
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true, versionKey: false
    }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
