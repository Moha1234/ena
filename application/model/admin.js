var mongoose = require('mongoose');
var Schema = mongoose.Schema;

adminschema = new Schema({
    sequence_id: String,
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    phone: String,
    address: String,
    password: String,
    type: String,
    status: {
        type: Number,
        default: 0
    },
    picture: String,
    create_date: {
        type: Date,
        default: Date.now
    },
    last_login_date: {
        type: Date,
        default: Date.now
    }
});


adminschema.index({
    email: 1
}, {
    background: true
});
adminschema.index({
    create_date: 1
}, {
    background: true
});
module.exports = mongoose.model('admin', adminschema);