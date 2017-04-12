var https = require('https'),
    rss = require('rss-parser'),
    async = require('async');

const defaultFeeds = [
  'https://news.ycombinator.com/rss'
];

class RSSClient {
  constructor() {
    this.feeds = defaultFeeds;
    this.articles = [];
  }

  addArticles(articles) {
    this.articles = this.articles.concat(articles);
  }

  fetchFeed(url, cb) {
    https.get(url, (res) => {
      var data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        rss.parseString(data, (err, result) => {
          if (err) {
            cb(err);
          } else {
            this.addArticles(result.feed.entries);
            cb();
          }
        });
      });
    });
  }

  refresh(articlesCb) {
    async.forEach(this.feeds, (url, cb) => {
      this.fetchFeed(url, cb);
    }, () => {
      articlesCb(this.articles);
    });
  }
}
