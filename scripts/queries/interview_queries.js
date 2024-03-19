
// Query to list of users who borrowed a book more than twice
db.borrowing_histories.aggregate([
    {$project:{
        book_id: {
            $toObjectId: "$book_id"
        },
        user_id: 1
    }},
    {$lookup: {
        from: "books",
        localField: "book_id",
        foreignField: "_id",
        as: "book"
    }},
    { $match: { "book.genre": "Science" } },
    {$group: {
        _id: {
            user_id: "$user_id"
        },
        count: {$sum:1}
    }},
    {$match: {
        count: {$gte: 2}
    }}
])

// Another version to above query.
db.books.aggregate([
    {$match: {
        genre: "Science"
    }},
    {$project: {
        b_book_id: {
            $toString: "$_id"
        },
        _id: 0
    }},
    {$lookup: {
        from: "borrowing_histories",
        localField: "b_book_id",
        foreignField: "book_id",
        as: "bh"
    }},
    {$unwind: "$bh"},
    {$group: {
        _id: {
            user_id: "$bh.user_id"
        },
        count:{$sum:1}
    }}
])



// Getting list of users who have borrowed more two or more than two books in the past 28 days.
db.borrowing_histories.aggregate([
    {$match: {
        "borrowed_date": {
            $gte: new Date(new Date().setDate(new Date().getDate() - 28))
        }
    }},
    {$group: {
        _id: {
            user_id: "$user_id"
        },
        count: {$sum: 1}
    }},
    {$match: {
        count: {$gte: 2}
    }}
])
