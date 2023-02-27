const { Schema, model } = require('mongoose');
// const thoughtsSchema = require('./Thought');

// Schema to create a User Model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

//virtual to retrieve the length of the users friends array field
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    })

const User = model('User', userSchema);

module.exports = User;