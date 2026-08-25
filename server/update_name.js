import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const updateShopName = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI?.replace('localhost', '127.0.0.1') || 'mongodb://127.0.0.1:27017/anshu_mobile');
    const db = mongoose.connection.useDb('anshu_mobile');
    const result = await db.collection('settings').updateOne({}, { $set: { shopName: 'Anshu Mobile World' } });
    console.log('Update result:', result);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateShopName();
