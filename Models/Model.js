const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const YourSchema = new Schema ({
    picture : {
        type: String,
        required : true,
    }
});

module.exports = mongoose.model('modelName', YourSchema);