require('dotenv').config();
const bot = require('./bot');
const port = process.env.PORT || 9000;

const requestHandler = (req, res) => {
    console.log(req.url);
    res.end('server is on');
}

const server = require('http').createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something went wrong', err);
    }
    console.log(`server is listening on ${port}`);
});

bot.StartBot();
