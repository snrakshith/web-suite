Here are the structured notes extracted from the images:

---

# **MongoDB Notes**

### **Basic Commands**

- **Show databases:** `show dbs`
- **Use a specific database:** `use <db-name>`
- **Create a new collection and insert data:**
  ```js
  db.students.insertOne({ name: "Ram", age: 12 });
  ```
- **Check if the collection exists:**
  ```js
  db.students.find();
  ```

---

### **Updating Documents**

- **Add new fields:**
  ```js
  db.students.updateOne(
    { name: "Moto" },
    { $set: { hasCards: { hasPanCard: false, hasVoterCard: true } } }
  );
  ```
- **Update multiple fields:**
  ```js
  db.students.updateMany({}, { $set: { hobbies: ["Cricket"] } });
  ```
- **Find specific data:**
  ```js
  db.students.find({ "hasCards.hasPanCard": true });
  ```
- **Search for nested documents:**
  ```js
  db.students.find({ hobbies: "Cricket" });
  ```

---

### **Data Types in MongoDB**

- **Text (String)**
- **Boolean**
- **ISO Date**
- **Array**
- **Number (Integer, Double, Decimal, Long)**
- **Timestamp**
- **Embedded Documents**
- **ObjectId**

---

### **Atomicity in MongoDB**

- Atomicity is achieved at the **document level**.
- Example:
  ```js
  db.collection.updateMany();
  db.collection.deleteMany();
  ```
  If 10 documents are deleted successfully, the operation is atomic.

---

### **Drop Operations**

- **Delete all collections:**
  ```js
  db.dropDatabase();
  ```
- **Delete a specific collection:**
  ```js
  db.collectionName.drop();
  ```

---

### **Write Concern in MongoDB**

- Write concern ensures safe writing operations on disk.
- Example:
  ```js
  db.books.insertOne(
    { name: "Harry Potter" },
    { writeConcern: { w: 1, j: false, wtimeout: 5000 } }
  );
  ```
  - `w: 1` → Write to one node.
  - `j: false` → Without journaling.
  - `wtimeout: 5000` → Timeout in milliseconds.

---

### **CRUD Operations in MongoDB**

#### **Create**

```js
const newUser = await User({
  username: "Raj",
});
await newUser.save();
```

---

### **Read Operations**

- **Find all users:**
  ```js
  User.find({ username: "Raju" });
  ```
- **Find one user:**
  ```js
  User.findOne({ username: "Raju" });
  ```
- **Find by ID:**
  ```js
  User.findById(userId);
  ```
- **Find by multiple conditions (AND query):**
  - find by username and age
  ```js
  User.find({ $or: [{ username: "Raju" }, { age: 18 }] });
  ```
- **Search by mobile (Regex):**
  ```js
  const searchItem = "raju";
  User.find({ name: { $regex: new RegExp(searchItem, "i") } });
  ```

---

### **Excluding Fields**

- **Exclude password field from results:**
  ```js
  User.find().select("-password -_id");
  ```

---

### **Update Operations**

1. **Update by ID**

   ```js
   User.findByIdAndUpdate(
     userId,
     { email: newEmail },
     { new: true, runValidators: true }
   );
   ```

2. **Update by Username**

   ```js
   User.findOneAndUpdate(
     { username: new RegExp(req.params.username, "i") }, // Find user by username (case-insensitive)
     { email: newEmail }, // Update the email field
     { new: true, runValidators: true } // Return the updated document and validate changes
   );

   // OR
   ```

   - Using regex:
     ```js
     const userName = new RegExp(req.params.username as string, "i")
     ```

---

### **Pagination**

- **Implementing pagination:**

  ```js
  const pageNumber = req.params.pageNumber;
  const pageSize = req.params.pageSize || 5;
  const skip = (pageNumber - 1) * pageSize;

  await User.find().skip(skip).limit(pageSize);
  ```
