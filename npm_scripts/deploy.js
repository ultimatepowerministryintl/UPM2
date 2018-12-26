const path = require('path')
var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    host: process.env.FTP_HOST,
    port: 21,
    localRoot: path.join(__dirname, '..', '/build'),
    remoteRoot: '/',
   	include: ['*', '**/*'],
    deleteRemote: true,
    forcePasv: false
}

ftpDeploy.on('uploading', function(data) {
    console.log('Uploading...')
    console.log('Total files count:' + data.totalFilesCount);
    console.log('Transferred file count:' + data.transferredFileCount);
    console.log('File name:' + data.filename);
});

ftpDeploy.on('uploaded', function(data) {
  console.log('Uploaded...')
  console.log('Total files count:' + data.totalFilesCount);
  console.log('Transferred file count:' + data.transferredFileCount);
  console.log('File name:' + data.filename);
});

ftpDeploy.on('upload-error', function (data) {
  console.log('Upload Error')
	console.log(data.err);
});

// use with promises
ftpDeploy.deploy(config)
    .then(res => console.log('finished:', res))
    .catch(err => console.log(err))
