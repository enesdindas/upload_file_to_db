const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('your_mongodb_connection_url', { useNewUrlParser: true })
    mongoose.connection.on('open', () => {
        //console.log("MongoDB: Connected");
    });
    mongoose.connection.on('error', (err) => {
        console.log("MongoDB: Error", err);
    });

    // If promise doesn't recognized
    mongoose.Promise = global.Promise;
};
