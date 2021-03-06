const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbUrl = `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@ds039088.mlab.com:39088/guyius`;

module.exports = {
    writeHashtageToDB: (hashTagsForDB) => {
        MongoClient.connect(dbUrl, (err, db) => {
            if (err) {
                console.log('db failed: ' + err);
            } else {
                console.log('db connected');
            }
            const collection = db.collection('hashtags');
            for (let hasttag in hashTagsForDB) {
                collection.update(
                    { hashtag: hashTagsForDB[hasttag].value },
                    {
                        $inc: { counter: hashTagsForDB[hasttag].counter },
                        $currentDate: { lastUpdate: true }
                    },
                    { upsert: true });
            };
        });
    }
}