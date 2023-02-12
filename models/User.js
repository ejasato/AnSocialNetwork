const { Schema, model } = require('mongoose');
// const thoughtsSchema = require('./Thought');

// Schema to create a User Model
const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        emal: {
            type: String,
            required: true,
            unique: [true, 'User email required'],
            validate: {
                validator: function(v){
                    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.text(v);
                },
                message: props => `${props.value} is not a valid email address!`
            },
        },
        thoughts: [        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
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
    .get(function() {
        return this.friends.length;
    })

const User = model('User', userSchema);

module.exports = User;