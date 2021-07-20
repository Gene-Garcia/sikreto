// database odm package
const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    }
});

// store/set the scema to mongoose
mongoose.model('Account', accountSchema);