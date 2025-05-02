// use this command for checking the below element operators
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
    phone: "2321313123",
    age: 30,
  },
  {
    name: "Anna",
    hobbies: [
      { title: "Sports", frequency: 3 },
      { title: "Cooking", frequency: 6 },
    ],
    phone: 2321313123,
    age: 30,
  },
]);

// $exist command
db.users.find({ age: { $exists: true, $ne: null } }).pretty();

// $type command
db.users.find({ phone: { $type: "number" } }).pretty();

// $type as array
db.users.find({ phone: { $type: ["number", "string"] } }).pretty();

// $regex
db.movies.find({ summary: { $regex: /Berserk/ } }).pretty();

// $expr

// use finance;
db.sales.insertMany([
  { volume: 100, target: 120 },
  { volume: 89, target: 80 },
  { volume: 200, target: 170 },
]);

db.sales.find({ $expr: { $gt: ["$volume", "$target"] } });

db.sales.find({
  $expr: {
    $gt: [
      {
        $cond: {
          if: { $gte: ["$volume", 190] },
          then: { $subtract: ["$volume", 30] },
          else: "$volume",
        },
      },
      "$target",
    ],
  },
});
