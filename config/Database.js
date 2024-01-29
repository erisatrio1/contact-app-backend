import mongoose from "mongoose";

const db = mongoose.connect('mongodb://127.0.0.1:27017/wpu');

export default db;