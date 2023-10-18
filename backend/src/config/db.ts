const mongoose = require('mongoose');

const db = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/huan', { useNewUrlParser: true, useUnifiedTopology: true });
      console.log("MONGO CONNECTION OPEN!!!");
    } catch (err) {
      console.log("OH NO MONGO CONNECTION ERROR!!!!");
      console.error(err);
    }
  };
  
export default db