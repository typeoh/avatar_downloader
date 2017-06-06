var request = require('request');
var GITHUB_USER = "typeoh";
var GITHUB_TOKEN = "1ea64e31096f5c92dd23e5cbe53fdb84456e3a0c"

var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + "jquery" + '/' + "jquery" + '/contributors';

//cb helps return the asynchronous results of getRepoContributors
//call back function going

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
      url: requestURL,
      headers: {
        "User-Agent": "lighthouse labs"
      },
      json: true
  }
  request.get(options, function(err, response, body) {              // Note 1
    cb(err, body);
  });
       // .on('error', function (err) {                                   // Note 2
       //   throw err;
       // })
       // .on('response', function (response) {                           // Note 3
       //   console.log('Response Status Code: ', response.statusCode);
       //  })

};
//chaining style request that pipes the image
(getRepoContributors("jquery", "jquery", function(err, result) {
    result.forEach(function(contributor) {
      console.log(contributor.login + " : " + contributor.avatar_url)
    });

  // console.log("Errors:", err);
  // console.log("Result:", result);
}));

