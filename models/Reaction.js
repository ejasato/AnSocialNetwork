const { Schema } = require('mongoose');

//schema for reaction will be used as subdocument for thought model
const reactionSchema = new Schema(
    {
        reationId: {
            type: Schema.Types.ObjectId},
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
    }
);

module.exports = reactionSchema;