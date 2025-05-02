# MongoDB

## Configuration

```js
// log file
mongod--dbpath "C:\data" --logpath "C:\mongod_log\file.txt";

// help
db.help()
db.employees.help()

//configuration file
mongod--config "mongod.cfg"
mongod -f "mongod.cfg"
```

---

## DataTypes:

- Text
- Boolean
- Number -
  - Integer(int32)
  - NumberLong(int64)
  - NumberDecimal(34 decimals after comma)
- ObjectId
- ISODate
- Timestamp
- Embedded Documents
- Array

> Shell is a node based app
> [Shell Datatypes](https://docs.mongodb.com/manual/core/shell-types/)

By default save as 64 bit Floating point number

typeof

### Data Types & Limits

- Single Document <= 16mb
  100 levels of embedded documents.

  - [Find Limits](https://docs.mongodb.com/manual/reference/limits/)

  - [For the data types detailed overview on this page](https://docs.mongodb.com/manual/reference/bson-types/)

### Important data type limits are:

- Normal integers (int32) +-2,147,483,647
- Long integers (int64) +-9,223,372,036,854,775,807

### Shell:

- NumberInt creates a int32 value => NumberInt(55)

- NumberLong creates a int64 value => NumberLong(7489729384792)

  - (e.g. insertOne({a: 1}) -- > tnormal double into the database.Shell treats everything as double

- NumberDecimal creates a high-precision double value => NumberDecimal("12.99") =>
  - This can be helpful for cases where you need (many) exact decimal places for calculations.

Example for Node.js: http://mongodb.github.io/node-mongodb-native/3.1/api/Long.html

## DB commands

```js

// Showing database:
Show dbs

// Creating database:
use <databasename>;

// For seeing collections:
show collections

// For creating Collection:
db.createCollection("customers");

// stats command
db.movies.find({},{name:1,type:1,_id:0}).pretty()


```

## Insert commands

```js
db.employees.insertOne({
	key: 7,
	name: "ASD",
	date_of_birth: "10/10/2010",
	position_held: "Manager",
});


db.employees.insertMany([
	{
		key: 8,
		name: "ASD",
		date_of_birth: "10/10/2010",
		position_held: "Manager",
	},
	{
		key: 9,
		name: "ASD",
		date_of_birth: "10/10/2010",
		position_held: "Manager",
	},
	{
		key: 10,
		name: "ASD",
		date_of_birth: "10/10/2010",
		position_held: "Manager",
	},
]);



// duplicate keys
db.employees.insertOne({
	_id: "test_1",
	name: "ASD",
	date_of_birth: "10/10/2010",
	position_held: "Manager",
});
db.employees.insertOne({
	_id: "test_1",
	name: "ASD",
	date_of_birth: "10/10/2010",
	position_held: "Manager",
});


// Inserting a document into a collection:
db.userData.insertOne({ name: "Kar", address: "XYZ" });


// Embedded documents and array
db.users.insertMany([
	{
		name: "Max",
		hobbies: [
			{ title: "Sports", frequency: 3 },
			{ title: "Cooking", frequency: 6 },
		],
		phone: 2321313123,
	},
	{
		name: "Max1",
		hobbies: [
			{ title: "Sports", frequency: 3 },
			{ title: "Cooking", frequency: 6 },
		],
		phone: 2321313123,
		age: 30,
	},
]);

db.movie.insertOne({
	name: "ABC",
	channels: ["SUN", "VIJAY", "ZEE"],
	description: {
		hero: "DDD",
		heroin: "sdfsdf",
		about: { storyline: "dsfsdf", released: {} },
	},
});

// ordered
db.hobbies.insertMany(
	[
		{ _id: "yoga", name: "Yoga" },
		{ _id: "cooking", name: "Cooking" },
		{ _id: "hiking", name: "Hiking" },
	],
	{ ordered: false }
);

// writeConcern
// w acknowledgment
// j journal which used for security in case your database goes down
// wtimeout timeout for write
db.persons.insertOne(
	{ name: "Karthik", age: 22 },
	{ writeConcern: { w: 1, j: true, wtimeout: 200 } }
);

// for importing the data
mongoimport tv-shows.json - d movieData - c movies --jsonArray --drop
>mongoimport "C:\mongodb\mongodb_project\tv-shows.json" -d tv -c shows --jsonArray --drop

```

## Delete commands

```js
// delete one entry
db.employees.deleteOne({ name: "Michael" });

// delete many entries
db.employees.deleteMany({ name: "ASD" });

// drop collection
db.users.drop();

// drop database
db.dropDatabase();
```

## Aggregation

```js
// just like find
db.persons.aggregate({ $match: { gender: "female" } });

// aggregate
db.persons
  .aggregate([
    { $match: { gender: "female" } },
    {
      $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } },
    },
  ])
  .pretty();

// sort
db.persons
  .aggregate([
    { $match: { gender: "female" } },
    {
      $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } },
    },
    { $sort: { totalPersons: -1 } },
  ])
  .pretty();

//project
db.persons.aggregate({
  $project: {
    _id: 0,
    gender: 1,
    fullName: { $concat: ["$name.first", " ", "$name.last"] },
  },
});

// Upper and lower
db.persons.aggregate({
  $project: {
    _id: 0,
    gender: 1,
    fullName: {
      $concat: [{ $toUpper: "$name.first" }, " ", { $toLower: "$name.last" }],
    },
  },
});

// group vs project

// use friends.json

//aggregate on Arrays
db.friends.aggregate({
  $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } },
});

// unwind stage
db.friends.aggregate({ $unwind: "$hobbies" }).pretty();
db.friends.aggregate(
  { $unwind: "$hobbies" },
  { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } }
);

// Eliminating duplicate Values
db.friends.aggregate(
  { $unwind: "$hobbies" },
  { $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" } } }
);

// size of Arrays
db.friends
  .aggregate({ $project: { _id: 0, size: { $size: "$hobbies" } } })
  .pretty();

// putting into a new collection
db.friends.aggregate(
  { $unwind: "$hobbies" },
  { $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" } } },
  { $out: "transformedFriends" }
);

// combining two collections
// use Books;
db.books.insertOne({
  name: "Harry Potter",
  price: "1000",
  author: "authorId1",
});
db.authors.insertOne({
  _id: "authorId1",
  name: "Ruskin Bond",
  place: "US",
  gender: "female",
});

db.books
  .aggregate([
    {
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "creators",
      },
    },
  ])
  .pretty();
```

## Transactions

```js
// creating collection

// use blog;
db.users.insertOne({ name: "ABC" });
db.posts.insertOne({
  userId: ObjectId("5d6f890494d1ad644031ef0d"),
  post: "post1",
});

db.posts.insertOne({
  userId: ObjectId("5d6f890494d1ad644031ef0d"),
  post: "post2",
});

// STARTING tRANSACTION

const session = db.getMongo().startSession();

session.startTransaction();
const usersCol = session.getDatabase("blog").users;
const postCol = session.getDatabase("blog").posts;

usersCol.deleteOne({ _id: ObjectId("5d6f890494d1ad644031ef0d") });

usersCol.deleteOne({ _id: ObjectId("5d6f890494d1ad644031ef0d") });
postsCol.deleteMany({ userId: ObjectId("5d6f890494d1ad644031ef0d") });
session.commitTransaction();
```

## Indexes

```js
// to get how mongodb found the results
// works for update and find not for insert
db.persons.explain("executionStats").find();
db.persons.explain("executionStats").find({ gender: "male" });

// create Index
db.persons.createIndex({ gender: 1 });

// drop Index
db.persons.dropIndex({ gender: 1 });

// index will not help in cases when your queries subset
// not the entire document

// compound indexes
db.persons.createIndex({ "dob.age": 1, gender: 1 });

// queries which will make use
db.persons.explain("executionStats").find({ "dob.age": 35, gender: "male" });
db.persons.explain("executionStats").find({ "dob.age": 35 });

// queries which will not use as index is in right
db.persons.explain("executionStats").find({ gender: "male" });
```

### Performance

```js

// Capped collection


// collection by default 4 bytes
db.createCollection("capped",{capped:true,size:10000,max:3});

// capped collection the order is always maintained

db.insertMany([{name:"hello1"},{name:"hello2"},{name:"hello3"},{name:"hello4"}]);

// Replica sets

// Sharding

//Deploying mongodb server

// mongodb Atlas
managed mongodb solution


```
