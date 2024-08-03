// Assuming you have already connected to MongoDB using Mongoose

// Revoke specific roles from a user
db.revokeRolesFromUser('user123', [
    { role: 'readWrite', db: 'your-database-name' },
]);
