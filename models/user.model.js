const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, required: true,maxlength: 50},
    avatar: {type: String, required: true},
    email: {type: String,required: true,unique: true,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },

    gender: {type: String,enum: ['male', 'female'],required: true },
    password: {type: String,required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date,default: Date.now}
}, { versionKey: false })

const UserModel = mongoose.model("user", userSchema)

module.exports = { UserModel }