const jwt = require('jsonwebtoken');

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2d' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null)
    return res.status(401).json({ success: false, errors: 'Unauthorized' });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    // console.log('dec', decoded);
    // console.log(err?.message);
    if (err) return next(err);
    req.user = decoded;
    next();
  });
}

function canRead() {
  // Find document in Friends model where both are lister i.e. are friends if so allow read
}

function checkCanUpdate(req, data) {
  return req.user.id === data._id;
}

exports.generateAccessToken = generateAccessToken;
exports.authenticateToken = authenticateToken;
exports.checkCanUpdate = checkCanUpdate;
