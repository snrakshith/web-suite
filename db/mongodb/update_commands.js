// update single document
db.employees.updateOne({name:"Michael"},{$set:{date_of_birth:"30/10/2010"}} )

// update single document
db.employees.update({name:"Michael"},{$set:{date_of_birth:"20/10/2010"}} )


// update many documents
db.employees.updateMany({name:"Michael"},{$set:{date_of_birth:"20/10/2010"}} )


// replace the entries preferrable to avoid this.
db.employees.update({name:"Michael"},{date_of_birth:"40/10/2010"} )


// Throw errors
db.employees.updateMany({name:"Michael"},{date_of_birth:"40/10/2010"} )
db.employees.updateOne({name:"Michael"},{date_of_birth:"40/10/2010"} )


// replace the entries it is similar to update without $set
db.employees.replaceOne({name:"Michael"},{date_of_birth:"40/10/2010"} )




// use user data
// increment and decrementing
// increment
db.users.updateOne({name:"Anna"},{$inc:{age:1},$set:{sample:"text"}});

//decrement
db.users.updateOne({name:"Anna"},{$inc:{age:-1},$set:{sample:"text"}});


// minimum update only if the value "20" lower than the existing value 
db.users.updateOne({name:"Anna"},{$min:{age:20}});

//maximum 
db.users.updateOne({name:"Anna"},{$max:{age:40}});

// multiply
db.users.updateOne({name:"Anna"},{$mul:{"age":2}});

// rename fields
db.users.updateMany({},{$rename:{age:"totalAge"}})

// insert if not available
db.users.updateOne({name:"Anna1"},{$set:{age:25,hobbies:{frequency:3.1}}},
{upsert:true});

// update exact Array Element
// $ only the first element
db.user_data.find({hobbies:{$elemMatch:{"title":"Sports","frequency":{$eq:3}}}})
db.user_data.updateMany({hobbies:{$elemMatch:{"title":"Sports","frequency":{$eq:2}}}},{$set:{"hobbies.$.highFrequency":7}})


// update all array element
//$[] update many Arrays
// error
db.user_data.updateMany({hobbies:{$elemMatch:{"title":"Sports","frequency":{$eq:2}}}},{$set:{"hobbies.$.highFrequency":7}})
db.user_data.updateMany({age:30},{$inc:{"hobbies.$[].frequency":1}})


//Finding and updating Specific fields
db.user_data.updateMany({name:"Manuel"},{$set:{"hobbies.$[el].frequency":100}},{arrayFilters:[{"el.frequency":{$eq:6}}]});
db.users.updateMany({name:"Anna"},{$set:{"hobbies.$[el].frequency":500}},{arrayFilters:[{"el.frequency":{$eq:2}}]});


//add Array Elements
db.users.update({"name":"Anna"},{$push:{hobbies:{"title":"Coding",frequency:3}}});

// multiple Array Add
db.users.update({"name":"Anna"},{$push:{hobbies:{$each:[{"title":"Coding",frequency:3},{"title":"Programming",frequency:4}]}}});

// Added elements sorted
db.users.update({"name":"Anna"},{$push:{hobbies:{$each:[{"title":"Coding",frequency:3},{"title":"Programming",frequency:4}],$sort:{frequency:-1}}}});

// delete a Array Element
db.users.updateOne({"name":"Anna"},{$pull:{hobbies:{"title":"Coding"}}});
db.users.updateOne({"name":"Anna"},{$pull:{hobbies:{"title":{$eq:"Programming"}}}});


// deleting the last Element
db.users.updateOne({"name":"Anna"},{$pop:{hobbies:1}});

// deleting the first Element
db.users.updateOne({"name":"Max1"},{$pop:{hobbies:-1}});

// addToSet which is unique
db.users.update({"name":"Anna"},{$addToSet:{hobbies:{"title":"Coding",frequency:3}}});




