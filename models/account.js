require('dotenv').config();

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

// encryption - deprecated - 'mongoose-encryption'
// const encryption = require('mongoose-encryption')
// accountSchema.plugin(encryption, { 
//     secret: process.env.ENCRYPTION_KEY,
//     decryptPostSave: false, // for improved performance because by default after saving, the variable will be updated with decrypted value
//     encryptedFields: ['password']
// });

// store/set the scema to mongoose
mongoose.model('Account', accountSchema);