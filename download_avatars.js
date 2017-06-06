var request = require('request');
var GITHUB_USER = "typeoh";
var GITHUB_TOKEN = "1ea64e31096f5c92dd23e5cbe53fdb84456e3a0c"
var fs = require('fs');
var owner = process.argv[2];
var repo = process.argv[3];
//cb helps return the asynchronous results of getRepoContributors
//call back function going

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
      url: requestURL,
      headers: {
        "User-Agent": "lighthouse labs"
      },
      json: true
  }
  request.get(options, function(err, response, body) {              // Note 1
    cb(err, body);
    // console.log(body);
  });

};
//chaining style request that pipes the image
getRepoContributors(owner, repo, function(err, result) {
    result.forEach(function(contributor) {
      var urlCb = contributor.avatar_url;
      var pathCb = "avatars/" + contributor.login + ".jpg";
      downloadImageByURL(urlCb, pathCb);
      // console.log(contributor.login + " : " + contributor.avatar_url)
    });
});

function downloadImageByURL(url, filePath) {
  request(url)
  .pipe(fs.createWriteStream(filePath));
}
