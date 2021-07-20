// require('dotenv').config();

// const DB_USERNAME = ''; in environment variable
// const DB_PASSWORD = '';
const DB_ATLAS_URI = '';

const DB_NAME = 'sikreto';
const LOCAL_URI = `mongodb://localhost:27017/${DB_NAME}`;

exports.dbURI = () => {
    return LOCAL_URI;
}