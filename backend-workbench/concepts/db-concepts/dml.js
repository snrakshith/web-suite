
// Create
const newUser = new User({
    name: 'John Doe',
    email: 'john@example.com',
    age: 25
});

newUser.save((error, user) => {
    if (error) {
        console.error(error);
    } else {
        console.log('User created:', user);
    }
});



// Read

User.find({}, (error, users) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Users:', users);
    }
});


// Update

User.updateOne({ _id: 'user_id' }, { name: 'Updated Name' }, (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log('User updated:', result);
    }
});


// Delete

User.deleteOne({ _id: 'user_id' }, (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log('User deleted:', result);
    }
});
