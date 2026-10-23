require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');
const Claim = require('./models/Claim');

const MONGODB_URL = process.env.MONGODB_URL || process.env.MONGODB_URI;

async function seedData() {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(MONGODB_URL);
    console.log('Connected.');

    // Clear existing collections
    await Promise.all([
      Student.deleteMany({}),
      LostItem.deleteMany({}),
      FoundItem.deleteMany({}),
      Claim.deleteMany({})
    ]);
    console.log('Cleared existing data.');

    // 1. Create Students
    const alice = await Student.create({
      fullName: 'Alice Sharma',
      email: 'alice.sharma@campus.edu',
      department: 'Computer Science & Engineering',
      contactNumber: '+91 9876543210'
    });

    const bob = await Student.create({
      fullName: 'Bob Patel',
      email: 'bob.patel@campus.edu',
      department: 'Electronics & Communication',
      contactNumber: '+91 9845123456'
    });

    const priya = await Student.create({
      fullName: 'Priya Nair',
      email: 'priya.nair@campus.edu',
      department: 'Biotechnology',
      contactNumber: '+91 9731234567'
    });

    const charlie = await Student.create({
      fullName: 'Charlie Reddy',
      email: 'charlie.reddy@campus.edu',
      department: 'Mechanical Engineering',
      contactNumber: '+91 9900112233'
    });

    console.log('Created 4 student profiles.');

    // 2. Create Lost Items
    await LostItem.create([
      {
        itemName: 'Boat Airdopes 141 (Teal Blue)',
        category: 'Electronics',
        description: 'Left on the study desk with a minor scratch on the charging lid.',
        lastSeenLocation: 'Central Library, 2nd Floor Reading Room',
        dateLost: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'Lost',
        reportedBy: alice._id
      },
      {
        itemName: 'Casio Scientific Calculator fx-991EX',
        category: 'Electronics',
        description: 'Black calculator with silver buttons. Has handwritten physics formulas on the cover slip.',
        lastSeenLocation: 'Physics Lab 3, Newton Block',
        dateLost: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'Lost',
        reportedBy: bob._id
      }
    ]);
    console.log('Created 2 lost item reports.');

    // 3. Create Found Items
    // Item 1: Open to claims with 1 pending and 1 rejected claim
    const backpack = await FoundItem.create({
      itemName: 'HP Blue & Black Backpack',
      category: 'Clothing / Accessories',
      description: 'Found on the 3rd row benches after the morning lecture. Contains a spiral notebook and pen holder.',
      foundLocation: 'Main Auditorium, Row F',
      dateFound: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'Found',
      reportedBy: alice._id
    });

    // Item 2: Fully Returned item with Approved claim
    const idCard = await FoundItem.create({
      itemName: 'University Student ID Card & Maroon Lanyard',
      category: 'ID Card / Documents',
      description: 'Lanyard with University emblem and transparent sleeve holding student card.',
      foundLocation: 'Cafeteria Counter 2',
      dateFound: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'Returned',
      reportedBy: bob._id
    });

    // Item 3: Newly reported found item (no claims yet)
    const waterBottle = await FoundItem.create({
      itemName: 'Milton Thermosteel 1000ml Water Bottle',
      category: 'Water Bottle',
      description: 'Silver metallic bottle with a black silicone handle strap.',
      foundLocation: 'Sports Complex Badminton Court 1',
      dateFound: new Date(),
      status: 'Found',
      reportedBy: charlie._id
    });

    console.log('Created 3 found item reports.');

    // 4. Create Claims
    // Claim 1 for backpack: Pending by Bob
    await Claim.create({
      foundItemId: backpack._id,
      claimedBy: bob._id,
      reason: 'The blue backpack is mine. Inside the front zipper pocket is a blue Parker pen and my physics notebook has Bob written on page 1.',
      status: 'Pending',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
    });

    // Claim 2 for backpack: Rejected by Alice (finder)
    await Claim.create({
      foundItemId: backpack._id,
      claimedBy: charlie._id,
      reason: 'I forgot a dark bag in the auditorium yesterday morning.',
      status: 'Rejected',
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000)
    });

    // Claim 3 for ID Card: Approved by Bob (finder) -> Item marked Returned
    await Claim.create({
      foundItemId: idCard._id,
      claimedBy: priya._id,
      reason: 'The ID card has my register number 24BCA0042 and photo showing Priya Nair, Department of Biotechnology.',
      status: 'Approved',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    });

    console.log('Created 3 claims (1 Pending, 1 Rejected, 1 Approved).');
    console.log('\nSeed data successfully created!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedData();
