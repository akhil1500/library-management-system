const mongoose = require("mongoose");
// const mongoose = require("../index")()


const {Schema} = mongoose;

const borrowingHistorySchema = new Schema(
    {
        user_id: {
            type: String
        },
        book_id: {
            type: String
        },
        borrowed_date: {
            type: Date,
            default: Date.now
        },
        return_date: {
            type: Date
        },
        status: {
            type: String,
            enum: ["borrowed", "returned"]
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("borrowing_history", borrowingHistorySchema)
