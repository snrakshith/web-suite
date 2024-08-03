// const { MongoClient } = require('mongodb');
import { MongoClient } from 'mongodb'
import mongoose from "mongoose";
// Create a MongoDB client
// const client = new MongoClient('<mongodb_connection_string>', { useUnifiedTopology: true });
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });

// Connect to MongoDB
await client.connect();

mongoose.connection.once("open", () => {
    app.listen(5000, () => console.log(`Listening on port ${port}..`));
});

// Access the MongoDB collection
const collection = client.db('<database_name>').collection('<collection_name>');

// Set up a change stream
const changeStream = collection.watch();

// Listen for change events
changeStream.on('change', (change) => {
    console.log('Change:', change);
    // Further processing or forwarding to Kafka can be done here
});
