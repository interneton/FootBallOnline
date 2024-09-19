import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  account: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  cashAmount: { type: Number, default: 0 },
  teamName: { type: String }
});

const User = mongoose.model('User', userSchema);
export default User;
