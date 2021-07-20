
// const DB_USERNAME = ''; in environment variable
// const DB_PASSWORD = '';
const DB_ATLAS_URI = '';

const DB_NAME = 'sikreto';
const LOCAL_URI = `mongodb://localhost:27017/${DB_NAME}`;

exports.dbURI = () => {

    if (process.env.DB_PASSWORD || process.env.DB_USERNAME) return LOCAL_URI;
    else return DB_ATLAS_URI;
}