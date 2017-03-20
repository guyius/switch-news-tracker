const twit = require('twitter');
const db = require('./db');

const twitter = new twit({
    consumer_key: 'AWzVSrOgnWxF6eZq8tYH0mkbL',
    consumer_secret: 'ZSM5bwagPlJlLyjlW6b8I2KT0NDNEgMVDJTu6buqZvBELlfAl8',
    access_token_key: '250763892-i6kcWfKSGj3Rzz9PxWLfqnzCLBWuGur2Nj4IKENp',
    access_token_secret: 'HQzaktlE7iOPE8tdFBhYfkBgUy5NBnRJsCaQRb8m60FeK'
});

function transformHashtagForDB(hashtagsList) {
    const hashtagsListForDB = {};
    hashtagsList.map(hashtags => {
        if (hashtags.length) {
            addHashtagToList(hashtags, hashtagsListForDB);
        }
    });
    return hashtagsListForDB;
};

function addHashtagToList(hashtags, hashtagsListForDB) {
    hashtags.map(hashtag => {
        let currentHashtag = hashtag.text.toLowerCase();
        hashtagsListForDB[currentHashtag] ?
            handleExistingHashtag(hashtagsListForDB[currentHashtag]) :
            hashtagsListForDB[currentHashtag] = handleNewHashtag();
    });
}

function handleExistingHashtag(hashtag) {
    hashtag.counter++;
    hashtag.lastUpdate = +new Date();
    return hashtag;
}

function handleNewHashtag() {
    return {
        counter: 1,
        createData: +new Date(),
        lastUpdate: +new Date()
    }
}

function saveTweetsData(error, tweets, res) {
    if (error) {
        console.log(error);
    }
    if (tweets) {
        const tweetsText = tweets.statuses.map((tweet) => tweet.text);
        const hashtagsList = tweets.statuses.map((tweet) => tweet.entities.hashtags);
        const hashTagsForDB = transformHashtagForDB(hashtagsList);
        db.writeHashtageToDB(hashTagsForDB);
    }
};

function getTweets() {
    twitter.get('search/tweets', { q: '#link #zelda #BreathoftheWild', lang: 'en', result_type: 'recent' }, saveTweetsData)
    setInterval(getTweets, 60000);
};

getTweets();