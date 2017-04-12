// Since this is Electron, we can use node modules alongside our Polymer code.
// Pretty slick.
var https = require('https'),
    rss = require('rss-parser'),
    async = require('async');

function _parseFeed(url, res, cb) {
  var data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    rss.parseString(data, (err, result) => {
      if (err) {
        cb(err);
      } else {
        var feed = result.feed;
        var info = {
          title: feed.title,
          link: feed.link,
          description: feed.description,
          url: url
        };
        cb(null, info, result.feed.entries);
      }
    });
  });
}

/**
 * Fetches and parses a feed given a URL, returning entries and feed 
 * information.
 */
function fetchFeed(url, cb) {
  try {
    https.get(url, (res) => {
      _parseFeed(url, res, cb)
    }).on('error', cb);
  } catch (err) {
    cb(err);
  }
}
