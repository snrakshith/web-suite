// reference document
db.movie.insertOne({
  name: "XYZ",
  channels: ["STAR"],
  description: {
    hero: "SSS",
    heroin: "ZZZZ",
    about: { storyline: "10/10/2010", released: {} },
  },
});
db.movie.insertOne({
  name: "AAA",
  channels: ["SUN"],
  description: {
    hero: "SSS",
    heroin: "ZZZZ",
    about: { storyline: "10/10/2010", released: {} },
  },
});

// retrieve all documents
db.employees.find({}).pretty();

// retrieve with filters specified
db.employees.find({ name: "Michael", key: 3 }).pretty();

// retrive single entry with filters specified.
db.employees.findOne({ name: "Michael" });

// projection
db.employees.find({}, { name: 1, _id: 0 });
db.movies.find({}, { name: 1, type: 1, _id: 0 }).pretty();

// embedded documents
db.movie.find({ "description.hero": "SSS" }).pretty();

// Arrays
db.movie.find({ channels: "STAR" }).pretty();

// Onle one Array
db.movie.find({ channels: ["SUN"] }).pretty();
