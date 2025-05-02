// import { Kafka } from 'kafkajs';
import mongoDB from "./db.mjs";
import mongoose from "mongoose";
import express from "express";
import { runDB } from "./demo-app.js";
import { runDb } from "./db.js";

// Connect to MongoDB
// mongoDB();
// runDB().catch(console.dir);
const { connectDB, getDb } = runDb;

const app = express();
// Accept Json to parse
app.use(express.json());
// Uses default Port 4000
const port = process.env.PORT || 4000;

mongoose.set("debug", true);
let db;
connectDB((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`Listening on port ${port}..`);
        });
        db = getDb();
    }
});

// mongoose.connection.once("open", () => {
//     console.log(port);
// });

// Create a Kafka client
// const kafka = new Kafka({
//     clientId: 'demo_poc',
//     brokers: ['<kafka_broker1>', '<kafka_broker2>'], // Add your Kafka broker addresses
// });

// // Create a Kafka producer
// const producer = kafka.producer();

// // Connect to Kafka
// await producer.connect();

// Access the MongoDB collection

// Define a schema for your collection
const PostSchema = new mongoose.Schema({
    // Define your schema fields here
    title: String,
    description: String,
});

// Create a model based on the schema
const PostModel = mongoose.model("posts", PostSchema);


const postCollections = PostModel?.collection;

app.post("/posts", async (req, res) => {
    try {
        const { title, description } = req.body;

        const missingList = [];

        if (!title) {
            missingList.push("title");
        }
        if (!description) {
            missingList.push("description");
        }

        if (missingList.length > 0) {
            return res
                .status(400)
                .json({ status: false, message: `${missingList} is missing` });
        }

        const postData = {
            title,
            description,
        };

        // const data = await db.collection("posts").insert(postData);
        const data = await PostModel.create(postData);

        await data.save();
        return res.status(201).json({
            status: true,
            message: "Successfully created",
            data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
});

// Set up a change stream
const changeStream = await postCollections.watch({ bufferTimeoutMS: 30000 })

// Listen for change events & Forward MongoDB change events to Kafka
// changeStream.on('change', async (change) => {
//     const message = {
//         key: change._id,
//         value: JSON.stringify(change),
//     };

//     // Further processing or forwarding to Kafka can be done here
//     // await producer.send({
//     //     topic: '<kafka_topic>',
//     //     messages: [message],
//     // });
// });

// // Error handling
// changeStream.on('error', (error) => {
//     console.error('Change stream error:', error);
// });
// Graceful cleanup
process.on("SIGINT", async () => {
    await changeStream.close();
    await producer.disconnect();
    await client.close();
    process.exit(0);
});
