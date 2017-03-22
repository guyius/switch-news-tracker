const fs = require('fs');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbUrl = 'mongodb://localhost:27017/switch';

module.exports = {
    writeHashtageToDB: (hashTagsForDB) => {
        /*fs.writeFile('lalala.json', JSON.stringify(hashTagsForDB), (err, result) => {
            console.log('success');
        });*/
        MongoClient.connect(dbUrl, (err, db) => {
            if (err) {
                console.log('db failed: ' + err);
            } else {
                console.log('db connected');
            }
            const collection = db.collection('hashtags');
            for (let hasttag in hashTagsForDB) {
                console.log(hashTagsForDB[hasttag].value);
                console.log(hashTagsForDB[hasttag].counter);
                collection.update(
                    { hasttag: hashTagsForDB[hasttag].value },
                    {
                        $inc: { counter: hashTagsForDB[hasttag].counter },
                        $currentDate: { lastUpdate: true }
                    },
                    { upsert: true });
            };
        });
    }
}