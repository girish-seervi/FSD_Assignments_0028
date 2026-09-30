const Child = require('../models/Child');
const mongoose = require('mongoose');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.updateChild = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(404).send('Child Not Found');

    const { firstName, lastName, age, email } = req.body;
    
    const child = await Child.findById(id);
    if (!child) return res.status(404).send('Child Not Found');

    if (firstName) child.firstName = firstName;
    if (lastName) child.lastName = lastName;
    if (age) child.age = age;
    if (email) child.email = email;
    
    await child.save();
    res.redirect(`/users/${child.parentId}`);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.deleteChild = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(404).send('Child Not Found');

    const child = await Child.findById(id);
    if (!child) return res.status(404).send('Child Not Found');
    
    const parentId = child.parentId;
    await Child.findByIdAndDelete(id);
    
    res.redirect(`/users/${parentId}`);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
