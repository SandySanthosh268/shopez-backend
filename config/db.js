import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    // 🔒 Defensive check (VERY IMPORTANT)
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    // Debug log (remove after fix)
    console.log('MONGO_URI value:', mongoURI);

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
