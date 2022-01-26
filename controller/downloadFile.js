var http = require('https');
var fs = require('fs');

function pDownload(url, dest) {
    var file = fs.createWriteStream(dest);
    return new Promise((resolve, reject) => {
        var responseSent = false; // flag to make sure that response is sent only once.
        http.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    if (responseSent) return;
                    responseSent = true;
                    resolve();
                });
            });
        }).on('error', err => {
            if (responseSent) return;
            responseSent = true;
            reject(err);
        });
    });
}

//example
pDownload('https://s3-eu-west-1.amazonaws.com/tf-trans/2029/inflow_JAN-2022.csv', process.cwd() +'/downloads/downloads.csv')
    .then(() => console.log('downloaded file no issues...'))
    .catch(e => console.error('error while downloading', e));
    // download('https://s3-eu-west-1.amazonaws.com/tf-trans/2029/inflow_JAN-2022.csv', '/home/me')

module.exports = {
    pDownload,
    // getBlog,
    // addBlog,
    // updateBlog,
    // deleteBlog
}