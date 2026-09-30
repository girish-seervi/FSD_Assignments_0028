require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Child = require('./models/Child');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Seeding data...');

    // Clear existing data (optional, but good for starting fresh)
    await User.deleteMany({});
    await Child.deleteMany({});

    // Create User 1
    const user1 = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890'
    });
    await user1.save();

    // Create User 2
    const user2 = new User({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '098-765-4321'
    });
    await user2.save();

    // Create Children for User 1
    const child1 = new Child({
      firstName: 'Jimmy',
      lastName: 'Doe',
      age: 12,
      email: 'jimmy@example.com',
      parentId: user1._id
    });
    await child1.save();

    const child2 = new Child({
      firstName: 'Jenny',
      lastName: 'Doe',
      age: 8,
      parentId: user1._id
    });
    await child2.save();

    // Create Children for User 2
    const child3 = new Child({
      firstName: 'Sam',
      lastName: 'Smith',
      age: 5,
      parentId: user2._id
    });
    await child3.save();

    console.log('Sample data seeded successfully!');
    console.log(`Added 2 Users and 3 Children.`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
