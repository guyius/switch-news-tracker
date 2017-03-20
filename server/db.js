const fs = require('fs');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbUrl = 'mongodb://localhost:27017/hashtagMap';

module.exports = {
    writeHashtageToDB: (hashTagsForDB) => {
        fs.writeFile('quantifiedHashtagsList.json', JSON.stringify(hashTagsForDB), () => {
            console.log('file updated');
        });
    }
}