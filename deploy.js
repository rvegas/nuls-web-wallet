const path = require('path')

module.exports = {
  // sever account, address, port
  server: 'root:DlX5wHuclvwIkqcX@192.168.1.138',
  // deploy all files in the directory
  workspace: path.join(__dirname, 'dist'),
  // ignore the matched files (glob pattern: https://github.com/isaacs/node-glob#glob-primer)
  // support array of glob pattern
  // ignore: '**/*.map',
  // where the files are placed on the server
  //deployTo: '/data/html'
  deployTo: '/data/nfs/app-ui/vote'
};
