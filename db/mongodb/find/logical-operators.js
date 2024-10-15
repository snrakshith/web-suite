// or operator
db.movies
  .find({
    $or: [{ "rating.average": { $lt: 5 } }, { "rating.average": { $gt: 9.3 } }],
  })
  .pretty();

// nor operator
db.movies
  .find({
    $nor: [
      { "rating.average": { $lt: 5 } },
      { "rating.average": { $gt: 9.3 } },
    ],
  })
  .pretty();

// and operator
db.movies
  .find({ $and: [{ "rating.average": { $gt: 9.3 } }, { genres: "Drama" }] })
  .pretty();
// same as because use and operator by default
db.movies.find({ "rating.average": { $gt: 9.3 }, genres: "Drama" }).pretty();

// it can be used in cases like this
db.movies.find({ $and: [{ genres: "Drama" }, { genres: "Horror" }] });

// $not operator
db.movies.find({ runtime: { $not: { $eq: 60 } } });
// came also be done not using logical operator
db.movies.find({ runtime: { $ne: 60 } });
