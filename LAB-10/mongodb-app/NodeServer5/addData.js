require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(async () => {
        console.log('Connected to MongoDB');
        
        // Define Schemas & Models (same as index.js)
        const User = mongoose.model('User', {
            firstName: String,
            lastName: String,
            email: String,
            Phone: Number,
        });

        const Child = mongoose.model('Child', {
            firstName: String,
            lastName: String,
            email: String,
            Phone: Number,
        });

        try {
            // Create new Users
            const users = [
                { firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', Phone: 1112223333 },
                { firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', Phone: 4445556666 }
            ];
            const addedUsers = await User.insertMany(users);
            console.log('Users added successfully:', addedUsers);

            // Create new Children
            const children = [
                { firstName: 'Charlie', lastName: 'Smith', email: 'charlie.smith@example.com', Phone: 7778889999 },
                { firstName: 'Daisy', lastName: 'Johnson', email: 'daisy.johnson@example.com', Phone: 1010101010 }
            ];
            const addedChildren = await Child.insertMany(children);
            console.log('Children added successfully:', addedChildren);

            console.log('All additional data added successfully!');
        } catch (error) {
            console.error('Error adding data:', error);
        } finally {
            // Close connection when done
            mongoose.connection.close();
        }
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
