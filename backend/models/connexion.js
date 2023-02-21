// paramétrage de mongoose, package qui facilite les interactions avec MongoDB
const mongoose = require('mongoose');

async function mongoDBConnexion() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_SRV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on('error', (err) => {
      console.log(err.message);
    });
    console.log('Mongoose connected !');
    return;
  } catch (error) {
    console.log('Connexion to MongoDB failed !');
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = mongoDBConnexion;
