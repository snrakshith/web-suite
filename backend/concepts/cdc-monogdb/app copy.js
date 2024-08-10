// import { MongoClient } from 'mongodb';
// import { Kafka } from 'kafkajs';

// // Create a MongoDB client
// const client = new MongoClient('mongodb://localhost:27017/blogs', { useUnifiedTopology: true });

// // Connect to MongoDB
// await client.connect();

// // Create a Kafka client
// const kafka = new Kafka({
//     clientId: 'demo_poc',
//     brokers: ['<kafka_broker1>', '<kafka_broker2>'], // Add your Kafka broker addresses
// });

// // Create a Kafka producer
// const producer = kafka.producer();

// // Connect to Kafka
// await producer.connect();

// // Access the MongoDB collection
// const collection = client.db('blogs').collection('posts');

// // Set up a change stream
// const changeStream = collection.watch();

// // Listen for change events & Forward MongoDB change events to Kafka
// changeStream.on('change', async (change) => {
//     console.log('Change:', change);
//     const message = {
//         key: change._id,
//         value: JSON.stringify(change),
//     };

//     // Further processing or forwarding to Kafka can be done here
//     await producer.send({
//         topic: '<kafka_topic>',
//         messages: [message],
//     });
// });

// // Error handling
// changeStream.on('error', (error) => {
//     console.error('Change stream error:', error);
// });

// // Graceful cleanup
// process.on('SIGINT', async () => {
//     await changeStream.close();
//     await producer.disconnect();
//     await client.close();
//     process.exit(0);
// });
