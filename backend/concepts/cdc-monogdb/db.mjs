// Third Party Services goes in here...
import mongoose from "mongoose";

const mongoOptions = {
    // dbName: process.env.DB_NAME,
    // dbName: "blogs",
    replicaSet: "myReplicaSet",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 60000, // increase timeout to 60 seconds
};

// Define the connection strings for each replica set member
const replicaSet = [
    'mongodb://localhost:27017/replicaSet1',
    'mongodb://localhost:27018/replicaSet2',
    'mongodb://localhost:27019/replicaSet3'
];

// Define the connection string for the replica set
const replicaSetUri = 'mongodb://localhost:27017,localhost:27018,localhost:27019/blogs';
const uri = "mongodb+srv://rakshithsn:yOAOkVzovxrmdATl@cluster0.xzhsxfh.mongodb.net/?retryWrites=true&w=majority";



const mongoDB = async () => {
    try {
        await mongoose.connect(uri, mongoOptions);
        // await mongoose.connect(replicaSetUri, mongoOptions);
        // await mongoose.connect("mongodb://127.0.0.1:27017/", mongoOptions);
        // await mongoose.connect("mongodb://127.0.0.1:27017/blogs");
        // await mongoose.connect("mongodb://localhost/mongoose-watch");

        console.log("Connected to MongoDB..");
    } catch (err) {
        console.log("Could not connect to MongoDB...", err);
    }
};

mongoose.connection.on("connected", () => {
    console.log(`Mongoose is connected to DB`);
});

mongoose.connection.on("error", (error) => {
    console.log(error.message);
});

mongoose.connection.on("disconnected", () => {
    console.log(`Mongoose is disconnected to DB`);
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});

export default mongoDB;
