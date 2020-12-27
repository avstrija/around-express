const jwt = require('jsonwebtoken');

const JWT_SECRET = 'somesecretstringformakingjwt';

const generateJWT = ({ _id }) => jwt.sign({ _id }, JWT_SECRET, { expiresIn: '7d' });

// const isAuthorized = (token) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
//   if (err) {
//     return false;
//   }
//   return User.findOne({ _id: decoded.id })
//     .then((user) => Boolean(user));
// });

module.exports = { generateJWT };
