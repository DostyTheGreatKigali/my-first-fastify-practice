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

let yearToSelect = new Date().getFullYear().toString();
// CURRENT MONTH IN WWORDS
// https://flaviocopes.com/how-to-get-month-from-javascript-date/
// let monthToSelect = (new Date().toLocaleString('default', { month: 'short' })).toUpperCase();

// https://stackoverflow.com/questions/1643320/get-month-name-from-date
let monthToSelect = (new Date().toDateString().split(' ')[1]).toUpperCase();
// monthToSelect = monthToSelect[1].toUpperCase();
console.log("Month selected " + monthToSelect);
// let monthToSelect = (new Date().getMonth() + 1).toString().padStart(2, '0');

const urlStart = 'https://s3-eu-west-1.amazonaws.com/tf-trans/2029/';

// const url = 'https://i.imgur.com/wgPdAB6.jpeg';
// const url = 'https://s3-eu-west-1.amazonaws.com/tf-trans/2029/inflow_JAN-2022.csv';
// const fileFullPath = '/home/musah/Desktop/Dev/Node/test-project/images/test.jpeg';

let url = urlStart + 'inflow_' + monthToSelect + '-' + yearToSelect + '.csv';
console.log("You're downloading from " + url)

let fileDestination = 'downloaded_inflow_' + monthToSelect + '-' + yearToSelect + '.csv';

// let fileFullPath = '/home/musah/Desktop/Dev/Node/test-project/itc_csvs/jan2022.csv'
let fileFullPath = '/home/musah/Desktop/Dev/Node/test-project/itc_csvs/' + fileDestination;

downloadFile(url, fileFullPath)
    .then(res => console.log(res))
    .catch(err => console.log(err));

// to execute this file type:
// node index.js