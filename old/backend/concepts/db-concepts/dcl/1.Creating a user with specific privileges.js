// Assuming you have already connected to MongoDB using Mongoose

// Create a new user with read and write privileges on a specific database
db.createUser({
  user: 'user123',
  pwd: 'password123',
  roles: [
    {
      role: 'readWrite',
      db: 'your-database-name',
    },
  ],
});
