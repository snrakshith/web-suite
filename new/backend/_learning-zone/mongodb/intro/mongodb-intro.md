# **MongoDB Notes**

### **Basic Commands**

- **Show all databases**
  ```bash
  show dbs
  ```
- **Use a database (or create a new one if it doesn't exist)**

  ```bash
  use latest-db  # Change 'latest-db' to your database name
  ```

- **Create a new collection and insert a document**
  ```bash
  db.students.insertOne({ name: "Ram", age: 12 })
  ```
- **Check if the collection was created**
  ```bash
  db.students.find()
  ```

## Creating a Collection in MongoDB

### **Simplest way to create a collection:**

1. **Use the database**
   ```bash
   use students
   ```
2. **Create a collection**
   ```bash
   db.createCollection("books")
   ```

---

### **Updating Documents**

#### **Add new fields**

```bash
db.students.updateOne({ name: "Moto" },
  { $set: { hasCards: { hasPanCard: false, hasVoterCard: true } } })
```

#### **Update multiple fields**

```bash
db.students.updateMany({}, { $set: { hobbies: ["Cricket"] } })
```

---

### **Querying Data**

#### **Find documents with specific conditions**

```bash
db.students.find({ "hasCards.hasPanCard": true })
```

#### **Search for nested documents**

```bash
db.students.find({ "hobbies": "Cricket" })
```

#### **Search for a value inside an array**

(Same as above: `db.students.find({ "hobbies": "Cricket" })`)

---

### **MongoDB Data Types**

- **Text (String)**
- **Boolean**
- **ISO Date**
- **Arrays**
- **Number**
  - Integer
  - Floating Point (Decimal)
- **Timestamp**
- **Embedded Documents**
- **ObjectId**

---

### **Atomicity in MongoDB**

- **Atomicity is achieved at the document level.**
- Example: If you're doing an operation like `insertMany()`, `updateMany()`, or `deleteMany()`, and 10 documents are involved, **5 documents succeed** and **5 fail**, it doesn't mean 5 succesfull documents are rolledback.
- 5 docs which failed will need to be retried

### **Dropping Databases & Collections**

- **View available databases:**
  ```bash
  show dbs
  ```
- **Switch to a specific database:**
  ```bash
  use <database_name>
  ```
- **View collections inside the database:**
  ```bash
  show collections
  ```
- **Drop all collections the entire database and all its data will be permanently deleted,:**
  ```bash
  db.dropDatabase()
  ```
- **Delete a specific collections in a database:**
  ```bash
  db.collectionName.drop()
  ```

---

### **Write Concerns in MongoDB**

Write concerns define **how MongoDB acknowledges write operations** (insert, update, delete) before confirming success.

## Each of these operations can be configured with **write concerns** for better reliability.

Sure! In simple terms, **WriteConcern** in MongoDB controls the level of guarantee for write operations (like inserts, updates, deletes) in terms of how many replicas (copies) of the data must acknowledge the operation before it is considered successful.

Here's how it works:

- **Write Concern** ensures data reliability and consistency in MongoDB, especially in a replica set where multiple copies of data exist.
- When you perform a write operation (e.g., inserting or updating data), MongoDB can give different levels of guarantees on whether the data has been written successfully across the system.

### Types of Write Concern:

1. **`w: 1` (Default)**:

   - This means the operation is acknowledged by **at least one node** (the primary node) in the replica set.
   - **Basic level** of acknowledgment. If the primary fails right after the write, you may lose the data.

2. **`w: "majority"`**:

   - This means the operation must be acknowledged by **the majority of replica set members** (including the primary).
   - This provides a stronger guarantee that the data is safely stored in multiple places.

3. **`w: 0`**:

   - No acknowledgment required. The operation is sent to the database, but MongoDB doesn’t care if it is successfully written. It’s faster but less reliable.
   - You might use this when performance is more important than data consistency.

4. **`w: n` (where `n` is a number)**:

   - This ensures that the operation is acknowledged by **`n` number of nodes** in the replica set.
   - For example, `w: 2` means the write must be acknowledged by the primary and at least one secondary node.

5. **`j: true`**:

   - This means the write operation is committed to the **journal** (a log of operations), ensuring that the data is safely written to disk.
   - This can be used in conjunction with other WriteConcern levels to provide durability.

6. **`wtimeout`**:
   - This specifies the maximum time in milliseconds that MongoDB should wait for the acknowledgment.
   - If the acknowledgment isn’t received within the specified time, MongoDB will return an error.

### Example of WriteConcern:

Here’s an example of how to use WriteConcern in a MongoDB operation:

```javascript
db.collection.insertOne(
  { name: "Alice", age: 25 },
  { writeConcern: { w: "majority", j: true, wtimeout: 5000 } }
);
```

##### **Explanation of Write Concern Options:**

- **w:** Number of nodes that must acknowledge the write.
- **j:** Journal write confirmation (`true` for durability, `false` for speed).
- **wtimeout:** Timeout (in milliseconds) before an operation is aborted.

### **CRUD Operations and Write Concerns**

- **Insert:** `insertOne()`, `insertMany()`
- **Update:** `updateOne()`, `updateMany()`
- **Delete:** `deleteOne()`, `deleteMany()`

This ensures that the operation is:

- Acknowledged by the majority of the replica set nodes,
- Written to the journal for durability,
- And the operation must succeed within 5 seconds, or else it will timeout.

### Why Use WriteConcern?

- **Data Safety**: Higher levels of WriteConcern (like `w: "majority"`) ensure that your data is safely written to multiple nodes.
- **Performance vs. Durability**: If you need faster writes, you can use lower levels of WriteConcern (like `w: 1` or `w: 0`), but it may increase the risk of data loss.

In summary, WriteConcern lets you control the trade-off between **performance** and **data safety/consistency** in MongoDB operations.
