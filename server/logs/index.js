var bunyan = require('bunyan');

var ringbuffer = new bunyan.RingBuffer(
    {
        limit: 100
    });

log = bunyan.createLogger({
    name: 'chat',
    streams: [
        {
            level: 'error',
            stream: process.stderr
        },
        {
            level: 'info',
            path: 'server/logs/chat.log'
        },
        {
            level: 'trace',
            stream: process.stdout
        },
        {
            level: 'trace',
            type: 'raw',
            stream: ringbuffer
        }]
});

module.exports = log;
