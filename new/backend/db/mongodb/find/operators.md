## Array comparators

```js
// use this to import
mongoimport users.json -d users -c user_data --jsonArray --drop

// query object in Array
db.user_data.find({"hobbies.title":"Sports"}).pretty();

// $size
db.user_data.find({hobbies:{$size:3}}).pretty();

//$all
mongoimport boxoffice.json -d boxoffice -c moviestarts --jsonArray --drop

db.moviestarts.find({genre:{$all:["action","thriller"]}}).pretty();

// $elemMatch

use users
// it gives a issue as it will filter even other hobbies with frequency
// greater than 3
db.users.find({$and:[{"hobbies.frequency":{$gt:3}},{"hobbies.title":"Sports"}]}).pretty()


db.users.find({hobbies:
    {$elemMatch:{"title":"Sports",frequency:{$gte:3}}}}).pretty();

```

## comparison operators

```js
// comparison operators

//$eq
db.movies.find({ runtime: { $eq: 60 } });

//$ne
db.movies.find({ runtime: { $ne: 60 } });

// less than
db.movies.find({ runtime: { $lt: 40 } }).pretty();

// greater than
db.movies.find({ runtime: { $gt: 40 } }).pretty();

// less than and equal
db.movies.find({ runtime: { $lte: 40 } }).pretty();

// greater than and equal
db.movies.find({ runtime: { $gte: 40 } }).pretty();

// Querying Embedded documents
db.movies.find({ "rating.average": { $gt: 7 } }).pretty();

// Querying Arrays
db.movies.find({ genres: "Drama" }).pretty();

// Querying Exact Arrays
db.movies.find({ genres: ["Drama"] }).pretty();

// $in operator Querying in that value
db.movies.find({ runtime: { $in: [30, 60] } }).pretty();

// $nin operator Querying not in that value
db.movies.find({ runtime: { $nin: [30, 60] } }).pretty();
```

## cursor

```js
// use movies

// sort
db.movies.find({}).sort({ runtime: 1, "rating.average": 1 }).pretty();

// limit

db.movies.find({}).sort({ runtime: 1, "rating.average": 1 }).limit(2).pretty();

//skip

db.movies
  .find({})
  .sort({ runtime: 1, "rating.average": 1 })
  .skip(2)
  .limit(5)
  .pretty();

// slice projection

db.movies
  .find(
    { "rating.average": { $gt: 3 } },
    { genres: { $slice: [1, 2] }, name: 1 }
  )
  .pretty();
```
