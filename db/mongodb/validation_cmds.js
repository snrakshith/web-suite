// insert
db.posts.insertOne({title:"ABC",text:"Hello",creator:ObjectId("5d5cb53383a2186ed42b37bd"),
comments:[{text:"XYZ",author:ObjectId("5d5cb53383a2186ed42b37bd")}]})

// error
db.posts.insertOne({title:"ABC",text:"Hello",creator:ObjectId("5d5cb53383a2186ed42b37bd"),
comments:[{text1:"XYZ",author:ObjectId("5d5cb53383a2186ed42b37bd")}]})

//





