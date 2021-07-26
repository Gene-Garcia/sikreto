require('dotenv').config();

const DB_NAME = 'sikreto';
const DB_USERNAME = process.env.DB_USERNAME; 
const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_ATLAS_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@personal-cluster.sofzm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const LOCAL_URI = `mongodb://localhost:27017/${DB_NAME}`;

exports.dbURI = () => {
    return DB_ATLAS_URI;
}