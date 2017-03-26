const twit = require('twitter');
const db = require('./db');

const twitter = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
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
            hashtagsListForDB[currentHashtag] = handleNewHashtag(currentHashtag);
    });
}

function handleExistingHashtag(hashtag) {
    hashtag.counter++;
    return hashtag;
}

function handleNewHashtag(currentHashtag) {
    return {
        value: currentHashtag,
        counter: 1,
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
    twitter.get('search/tweets', { q: '#link #zelda #BreathoftheWild', lang: 'en', result_type: 'recent' }, saveTweetsData);
    setInterval(getTweets, 10 * 60 * 1000);
};

module.exports = {
    StartBot: () => {
        getTweets()
    }
}