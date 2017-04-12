// Since this is Electron, we can use node modules alongside our Polymer code.
// Pretty slick.
var http = require('http'),
    https = require('https'),
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

        // Convert article dates to JS dates and add feed title
        var articles = result.feed.entries.map((a) => {
          a.pubDate = new Date(a.pubDate);
          a.feedName = feed.title;
          return a;
        });

        cb(null, info, articles);
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
    if (url.indexOf('https') !== -1) {
      https.get(url, (res) => {
        _parseFeed(url, res, cb)
      }).on('error', cb);
    } else {
      http.get(url, (res) => {
        _parseFeed(url, res, cb)
      }).on('error', cb);
    }
  } catch (err) {
    cb(err);
  }
}
