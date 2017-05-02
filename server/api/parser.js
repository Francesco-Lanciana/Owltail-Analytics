var parser = require('rss-parser');
var rss_feeds = require('../models/rss_feeds');

/*
Parse the rss feed registered in the database (Identification of the podcast is
sped up using the podcasts title). From here we can find the episode listened
to using the mp3 link.
*/
exports.fetchEpTitle = function(podTitle, mp3Link, device, done) {
  console.log("Podcast: " + podTitle);
  console.log("MP3 Link: " + mp3Link);
  console.log("Device: " + device);
  rss_feeds.getAll((rows) => {
    console.log(rows);
    rows.forEach((r) => {
      console.log(r);
      parser.parseURL(r.url, function(error, parsed) {
        if (parsed.feed.title == podTitle) {
          parsed.feed.entries.some(function(entry) {
            //Delete when on own server
            var option1 = 'http://www.podtrac.com/pts/redirect.mp3/' + mp3Link;
            var option2 = 'http://analytics.owltail.com/podcast/' + encodeURI(podTitle) + '/redirect.mp3/' + mp3Link;
            if (entry.enclosure.url == option1 || entry.enclosure.url == option2)) {
              done(podTitle, entry.title, device); // Might need a callback
              return true;
            }
          });
        }
      });

    });
  });
}
