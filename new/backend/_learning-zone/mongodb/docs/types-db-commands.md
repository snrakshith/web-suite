## Types of db commands

- `TCL (Transaction Control Language)` (skipped in material)
- `DDL (Data Definition Language)`
- `DML (Data Manipulation Language)`
- `DCL (Data Control Language)` operations in a Node.js Express app using Mongoose with MongoDB, you can follow these steps:

1. Install the necessary packages:

   - Install Node.js and npm if you haven't already.
   - Create a new Node.js Express project by running `npm init` and following the prompts.
   - Install Mongoose and Express by running `npm install mongoose express`.

2. Set up your Express app:

   - Create an `app.js` or `index.js` file and set up your Express application.
   - Require the necessary dependencies:
     ```javascript
     const express = require("express");
     const mongoose = require("mongoose");
     ```
   - Initialize the Express app:
     ```javascript
     const app = express();
     app.use(express.json());
     ```

3. Connect to MongoDB:

   - Add the following code to connect to your MongoDB database using Mongoose:
     ```javascript
     const mongoURI = "mongodb://localhost:27017/your-database-name";
     mongoose
       .connect(mongoURI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       })
       .then(() => {
         console.log("Connected to MongoDB");
       })
       .catch((error) => {
         console.error("Failed to connect to MongoDB", error);
       });
     ```

4. Define your Mongoose models:

   - Create a new file (e.g., `models/user.js`) to define your Mongoose model(s).
   - Define your models using Mongoose's Schema and model functions. For example:

     ```javascript
     const mongoose = require("mongoose");
     const { Schema } = mongoose;

     const userSchema = new Schema({
       name: String,
       email: String,
       password: String,
     });

     const User = mongoose.model("User", userSchema);

     module.exports = User;
     ```

5. Implement DDL operations (Data Definition Language):

   - DDL operations involve creating or modifying the structure of your database.
   - For example, you can create a new collection/table or define indexes.
   - To create a new collection/table, you can use Mongoose's `createCollection` method. For example:

     ```javascript
     const User = require("./models/user");

     // Create a new collection/table
     User.createCollection().then(() => {
       console.log("User collection created");
     });
     ```

6. Implement DML operations (Data Manipulation Language):

   - DML operations involve manipulating the data within your database.
   - For example, you can insert, update, or delete documents in your collection.
   - To perform DML operations, you can use Mongoose's model methods. For example:

     ```javascript
     const User = require("./models/user");

     // Insert a new user
     const newUser = new User({
       name: "John Doe",
       email: "john@example.com",
       password: "password123",
     });

     newUser.save().then(() => {
       console.log("User inserted");
     });
     ```

7. Implement DCL operations (Data Control Language):
   - DCL operations involve controlling access to your data.
   - For example, you can define user roles and permissions.
   - DCL operations in MongoDB are typically handled by configuring authentication and access control mechanisms.
   - Refer to the MongoDB documentation for more information on configuring DCL operations.

---

# DCL

> Assuming you have already connected to MongoDB using Mongoose

1. Create a new user with read and write privileges on a specific database

```js
db.createUser({
  user: "user123",
  pwd: "password123",
  roles: [
    {
      role: "readWrite",
      db: "your-database-name",
    },
  ],
});
```

2. Modifying or Grant additional privileges to an existing user

```js
db.grantRolesToUser("user123", [{ role: "dbAdmin", db: "your-database-name" }]);
```

3. Revoking specific roles from a user

```js
db.revokeRolesFromUser("user123", [
  { role: "readWrite", db: "your-database-name" },
]);
```

4. Remove an existing user

```js
db.dropUser("user123");
```

# DDL

- Define a Mongoose Schema:
- Create a Mongoose schema that represents the structure of your data.
- This is similar to DDL in traditional databases.

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);
```

# DML

- Create

```js
const newUser = new User({
  name: "John Doe",
  email: "john@example.com",
  age: 25,
});

newUser.save((error, user) => {
  if (error) {
    console.error(error);
  } else {
    console.log("User created:", user);
  }
});
```

- Read

```js
User.find({}, (error, users) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Users:", users);
  }
});
```

- Update

```js
User.updateOne(
  { _id: "user_id" },
  { name: "Updated Name" },
  (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log("User updated:", result);
    }
  }
);
```

- Delete

```js
User.deleteOne({ _id: "user_id" }, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log("User deleted:", result);
  }
});
```
