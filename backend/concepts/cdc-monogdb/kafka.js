const { Kafka } = require('kafkajs');

// Create a Kafka client
const kafka = new Kafka({
    clientId: '<your_client_id>',
    brokers: ['<kafka_broker1>', '<kafka_broker2>'], // Add your Kafka broker addresses
});

// Create a Kafka producer
const producer = kafka.producer();

// Connect to Kafka
await producer.connect();

// Forward MongoDB change events to Kafka
changeStream.on('change', async (change) => {
    const message = {
        key: change._id,
        value: JSON.stringify(change),
    };

    await producer.send({
        topic: '<kafka_topic>',
        messages: [message],
    });
});

// Error handling
changeStream.on('error', (error) => {
    console.error('Change stream error:', error);
});

// Graceful cleanup
process.on('SIGINT', async () => {
    await changeStream.close();
    await producer.disconnect();
    await client.close();
    process.exit(0);
});
