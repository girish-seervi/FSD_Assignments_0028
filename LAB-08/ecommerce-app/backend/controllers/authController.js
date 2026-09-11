const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Empty fields not allowed' });
  }

  // Hardcoded as per assignment
  if (email === 'user@electromart.com' && password === '123456') {
    res.json({ token: `mock-token-${email}`, email });
  } else {
    res.status(401).json({ error: 'Login failed. Invalid credentials.' });
  }
};

module.exports = {
  login
};
