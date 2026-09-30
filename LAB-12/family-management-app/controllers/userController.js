const User = require('../models/User');
const Child = require('../models/Child');
const mongoose = require('mongoose');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    if (!email) {
      return res.status(400).send('Email is required');
    }
    if (!firstName || !lastName) {
      return res.status(400).send('First Name and Last Name are required');
    }
    const user = new User({ firstName, lastName, email, phone });
    await user.save();
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('users', { users });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(404).render('404');

    const user = await User.findById(id);
    if (!user) return res.status(404).render('404');

    const children = await Child.find({ parentId: id });
    res.render('profile', { user, children });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.addChildToUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(404).render('404');
    
    const user = await User.findById(id);
    if (!user) return res.status(404).render('404');

    const { firstName, lastName, age, email } = req.body;
    if (!age) {
      return res.status(400).send('Age is required');
    }
    if (!firstName || !lastName) {
      return res.status(400).send('First Name and Last Name are required');
    }
    
    const child = new Child({
      firstName,
      lastName,
      age,
      email,
      parentId: id
    });
    
    await child.save();
    res.redirect(`/users/${id}`);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.getUserChildren = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(404).render('404');

    const user = await User.findById(id);
    if (!user) return res.status(404).render('404');

    const children = await Child.find({ parentId: id });
    
    if (children.length === 0) {
      return res.send("No children found for this user.");
    }
    
    res.json(children);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.getUserSpecificChild = async (req, res) => {
  try {
    const { id, childId } = req.params;
    if (!isValidId(id) || !isValidId(childId)) return res.status(404).render('404');

    const child = await Child.findOne({ _id: childId, parentId: id });
    if (!child) {
      return res.status(404).send('Child Not Found');
    }
    
    res.render('child', { child, parentId: id });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { name } = req.params;
    const users = await User.find({ firstName: new RegExp(name, 'i') });
    res.render('users', { users });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.getUserChildrenCount = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(404).render('404');

    const count = await Child.countDocuments({ parentId: id });
    res.json({ count });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
