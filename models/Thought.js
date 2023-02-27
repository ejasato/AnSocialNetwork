const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reaction');

//Schema to create a thought Model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
        },
        reactions: [reactionsSchema],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

//virtual to retrieve the length of the thoughts reaction
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;