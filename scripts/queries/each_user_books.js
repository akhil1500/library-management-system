// Calculate the total number of books borrowed by each user.

db.users.aggregate([
    {$project: {
        user_id: {
            $toString: "$_id"
        },
        name: 1,
        _id: 0
    }},
    {$lookup: {
        "from": "borrowing_histories",
        "localField": "user_id",
        "foreignField": "user_id",
        as: "bh_data"
    }},
    {
        $unwind: {
            path: "$bh_data",
            preserveNullAndEmptyArrays: true
        }
    },
    {$group: {
        _id: {
            user_id: "$user_id",
            name: "$name"
        },
        book_count: { $sum: { $cond: [{ $gt: ["$bh_data", null] }, 1, 0] } }
    }},
    {$project: {
        user_id: "$_id.user_id",
        name: "$_id.name",
        book_count: 1,
        _id: 0
    }}
]).pretty()