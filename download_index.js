// https://www.javaniceday.com/post/download-and-save-a-file-in-node-js
const https = require('https');
const fs = require('fs');

/**
 *
 * @param url - the url where we have our file
 * @param fileFullPath - the full file path where we want to store our image
 * @return {Promise<>}
 */
const downloadFile = async (url, fileFullPath) =>{
    console.info('downloading file from url: '+url)
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {

            // chunk received from the server
            resp.on('data', (chunk) => {
                fs.appendFileSync(fileFullPath, chunk);
            });

            // last chunk received, we are done
            resp.on('end', () => {
                resolve('File downloaded and stored at: '+fileFullPath);
            });

        }).on("error", (err) => {
            reject(new Error(err.message))
        });
    })
}

const url = 'https://i.imgur.com/wgPdAB6.jpeg';
const fileFullPath = '/home/musah/Desktop/Dev/Node/test-project/images/test.jpeg';

downloadFile(url, fileFullPath)
    .then(res => console.log(res))
    .catch(err => console.log(err));

// to execute this file type:
// node index.js