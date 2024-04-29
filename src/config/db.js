import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const connect = () => {
  try {
    mongoose
      .connect(process.env.DB, {})
      .then(() => console.log('Database is connected successfully!'));
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

export default connect;
