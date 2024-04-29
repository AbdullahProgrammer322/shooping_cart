import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/index.js';
export default {
  signup: async (req, res) => {
    try {
      const { body } = req;
      const user = await User.findOne({ email: body.email });
      if (user) {
        return res.status(409).json({ error: 'Email is already taken' });
      }
      const hash = await bcrypt.hash(body.password, 10);
      body.password = hash;
      await User.create(body);
      return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      return res.status(500).json({ err: message });
    }
  },
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).lean();
      if (!user) {
        return res.status(401).json({ error: 'Invalid Email or Password' });
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(401).json({ error: 'Invalid Email or Password' });
      }

      // create jwt token for authentication
      delete user.password;
      const token = jwt.sign(user, process.env.JWT);

      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  profile: async (req, res) => {
    try {
      const user = req.user;
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
