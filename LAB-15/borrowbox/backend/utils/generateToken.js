const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || 'borrowbox_super_secret_jwt_key_2026_campus_sharing';
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      studentId: user.studentId,
      college: user.college
    },
    secret,
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;
