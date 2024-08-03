const mongoose = require('mongoose');
const { getNamespace } = require('cls-hooked');

function connectToDatabase() {
    const namespace = getNamespace('multi-tenant');
    const schoolId = namespace.get('schoolId');
    const mongoURI = `mongodb://localhost:27017/school_${schoolId}`; // Assuming each school has its own database
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
}

connectToDatabase();
