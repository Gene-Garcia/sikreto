// mongoose package
const mongoose = require('mongoose');

// create a schema
const contactSchema = mongoose.Schema({
    category: {
        type: String,
        required: 'Category is required'
    },
    subject: {
        type: String,
        required: 'Subject is required'
    },
    message: {
        type: String,
        required: 'Message of feedback is required'
    }
});

// store schema as model to mongoose internal memory
mongoose.model('Contact', contactSchema);