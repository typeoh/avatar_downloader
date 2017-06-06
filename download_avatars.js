var request = require('request');
var GITHUB_USER = "typeoh";
var GITHUB_TOKEN = "1ea64e31096f5c92dd23e5cbe53fdb84456e3a0c";
var fs = require('fs');
var owner = process.argv[2];
var repo = process.argv[3];



function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: requestURL,
    headers: {
      "User-Agent": "lighthouse labs"
    },
    json: true
  };
  request.get(options, function(err, response, body) {
    cb(err, body);
  });
//download function downloads the avatar image of github contributors into an avatar folder
//if nothing the value is falsey or undefined the console will print an error

}
function downloadImageByURL(url, filePath) {
  request(url)
  .pipe(fs.createWriteStream(filePath));
}
//if statement that returns error message if falsey and the image if truthy
if (owner && repo) {
  getRepoContributors(owner, repo, function(err, result) {
    result.forEach(function(contributor) {
      var urlCb = contributor.avatar_url;
      var pathCb = "avatars/" + contributor.login + ".jpg";
      downloadImageByURL(urlCb, pathCb);
        // console.log(contributor.login + " : " + contributor.avatar_url)
    });
  });
} else {
  console.log("Please enter a owner and name");
}


