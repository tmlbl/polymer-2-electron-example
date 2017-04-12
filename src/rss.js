var https = require('https'),
    rss = require('rss-parser');

const defaultFeeds = [
  'https://news.ycombinator.com/rss'
];

class RSSClient {
  constructor() {
    this.feeds = defaultFeeds;
  }

  fetchFeed(url) {
    https.get(url, (res) => {
      var data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        rss.parseString(data, (err, result) => {
          if (err) throw err;
          console.log(result);
        });
      });
    });
  }

  refresh() {
    this.feeds.forEach((url) => {
      this.fetchFeed(url);
    });
  }
}
