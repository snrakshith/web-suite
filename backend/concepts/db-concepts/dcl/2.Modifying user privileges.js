// Assuming you have already connected to MongoDB using Mongoose

// Grant additional privileges to an existing user
db.grantRolesToUser('user123', [
    { role: 'dbAdmin', db: 'your-database-name' },
]);
