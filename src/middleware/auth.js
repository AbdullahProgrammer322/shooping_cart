import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  // get token req.headers

  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'Not Authorized' });
  }

  // decode token
  const decode = jwt.verify(token, process.env.JWT);

  if (decode) {
    req.user = decode;
    return next();
  }
  return res.status(403).json({ error: 'Not Authorized' });
};

export default auth;
