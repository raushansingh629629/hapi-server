'use strict';

const Hapi = require('@hapi/hapi');
const fs = require('fs');

const init = async () => {

    const server = Hapi.server({
        port: 10000,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    server.route({
        method: 'GET',
        path: '/api/audio/call',
        handler: async (req, h) => {
            //await processBase64Audio()
            return await processBase64Audio();
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

async function processBase64Audio() {
// Read Base64 encoded audio data from file
const base64EncodedAudio = fs.readFileSync('./public/base64.txt', 'utf8');
// Decode Base64 data
const decodedAudio = Buffer.from(base64EncodedAudio, 'base64');
// Save the decoded audio to an MP3 file
const outputMP3File = 'output.mp3';
fs.writeFileSync(outputMP3File, decodedAudio);

return `MP3 file saved as ${outputMP3File}`;
}