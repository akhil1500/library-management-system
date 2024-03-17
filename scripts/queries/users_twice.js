// Retrieve a list of users who have borrowed books more than twice - By Each book.
db.borrowing_histories.aggregate([
    {$group: {
        _id: {
            "user": "$user_id",
            "book": "$book_id",
        },
        book_count: {
            $sum: 1
        }
    }},
    {$match: {
        book_count: {$gte:2}
    }},
    {$project:{
        user_id: "$_id.user",
        book_id: "$_id.book",
        book_count: 1,
        _id:0
    }}
]).pretty()

// Retrieve a list of users who have borrowed books more than twice - By Each User
db.borrowing_histories.aggregate([
    {$group: {
        _id: {
            "user": "$user_id",
        },
        book_count: {
            $sum: 1
        }
    }},
    {$match: {
        book_count: {$gte:2}
    }},
    {$project:{
        user_id: "$_id.user",
        book_count: 1,
        _id:0
    }}
]).pretty()
