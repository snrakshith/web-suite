To create a multi-tenant app with MongoDB and Mongoose, where each tenant has its own database, you can follow these steps:

1.  Set up the project:

    - Create a new directory for your project.
    - Open the terminal or command prompt and navigate to the project directory.
    - Run `npm init` to initialize a new Node.js project and follow the prompts to set up the `package.json` file.
    - Install the required dependencies by running `npm install express mongoose` in the terminal.

2.  Create the server:

    - Create a new file called `server.js` and open it in your preferred code editor.
    - Require the necessary modules and set up Express.js:

      ```javascript
      const express = require("express");
      const app = express();
      const PORT = 3000; // Choose your desired port number

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
      ```

3.  Set up MongoDB and Mongoose:

    - Make sure you have MongoDB installed and running on your local machine or have access to a MongoDB server.
    - In your `server.js` file, require Mongoose and connect to your MongoDB server:

      ```javascript
      const mongoose = require("mongoose");

      // Connect to MongoDB
      mongoose
        .connect("mongodb://localhost/maindatabase", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log("Connected to MongoDB");
        })
        .catch((error) => {
          console.error("Error connecting to MongoDB", error);
        });
      ```

4.  Define the tenant model:

    - Create a new directory called `models` in your project.
    - Inside the `models` directory, create a new file called `Tenant.js`.
    - In the `Tenant.js` file, define the schema for your tenant model using Mongoose:

      ```javascript
      const mongoose = require("mongoose");

      const tenantSchema = new mongoose.Schema({
        name: {
          type: String,
          required: true,
        },
        databaseName: {
          type: String,
          required: true,
          unique: true,
        },
        // Add other properties as needed
      });

      module.exports = mongoose.model("Tenant", tenantSchema);
      ```

5.  Create routes for CRUD operations:

    - Create a new directory called `routes` in your project.
    - Inside the `routes` directory, create a new file called `tenants.js`.
    - In the `tenants.js` file, define the routes for creating, reading, updating, and deleting tenants:

```js
const express = require("express");
const router = express.Router();
const Tenant = require("../models/Tenant");
const mongoose = require("mongoose");

// Create a new tenant
router.post("/", async (req, res) => {
  try {
    const { name, databaseName } = req.body;

    // Create a new MongoDB connection for the tenant's database
    const tenantConnection = mongoose.createConnection(
      `mongodb://localhost/${databaseName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Define a model for the tenant's specific database connection
    const TenantModel = tenantConnection.model("Tenant", tenantSchema);

    // Create a new tenant document
    const newTenant = new TenantModel({ name, databaseName });
    await newTenant.save();

    res.json(newTenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all tenants
router.get("/", async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update a tenant
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Find the tenant by ID
    const tenant = await Tenant.findById(id);

    // Create a new MongoDB connection for the tenant's database
    const tenantConnection = mongoose.createConnection(
      `mongodb://localhost/${tenant.databaseName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Define a model for the tenant's specific database connection
    const TenantModel = tenantConnection.model("Tenant", tenantSchema);

    // Update the tenant document
    const updatedTenant = await TenantModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    res.json(updatedTenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a tenant
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the tenant by ID
    const tenant = await Tenant.findById(id);

    // Create a new MongoDB connection for the tenant's database
    const tenantConnection = mongoose.createConnection(
      `mongodb://localhost/${tenant.databaseName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Define a model for the tenant's specific database connection
    const TenantModel = tenantConnection.model("Tenant", tenantSchema);

    // Delete the tenant document
    await TenantModel.findByIdAndDelete(id);

    res.json({ message: "Tenant deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
```

6.  Set up the routes in your main `server.js` file:
    - Require the `tenants.js` route file at the top of your `server.js` file:
      ```javascript
      const tenantRoutes = require("./routes/tenants");
      ```
    - Add the route middleware to your Express app:
      ```javascript
      app.use(express.json()); // Parse JSON request bodies
      app.use("/api/tenants", tenantRoutes); // Use the tenant routes under '/api/tenants'
      ```

Remember to replace `maindatabase` with the name of your main MongoDB database, customize the schema and routes according to your specific application requirements, and handle authentication and security measures to ensure proper isolation and security of each tenant's data.
