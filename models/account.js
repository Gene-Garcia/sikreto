require('dotenv').config();

// cookies-session packages
const passportLocalMongoose = require('passport-local-mongoose');

// other plugin packages
var findOrCreate = require('mongoose-findorcreate')

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
        type: String
        // required: 'Password is required' // password must not be required because passport-local-mongoose does not initially set a password
    },
    google_id: { type: String },
    facebook_id: { type: String },
    sikretos: [{
        value: { type: String },
        date: { date: Date }
    }]
});

// encryption - deprecated - 'mongoose-encryption'
// const encryption = require('mongoose-encryption')
// accountSchema.plugin(encryption, { 
//     secret: process.env.ENCRYPTION_KEY,
//     decryptPostSave: false, // for improved performance because by default after saving, the variable will be updated with decrypted value
//     encryptedFields: ['password']
// });

// embedding passport-local-mongoose method to Account Model schema
accountSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// embedding the findOrCreate method to Account Model Schema
accountSchema.plugin(findOrCreate);

// store/set the scema to mongoose
mongoose.model('Account', accountSchema);