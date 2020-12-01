const express = require('express');
const logger = require('./logger');
const bookmarksRouter = express.Router();
const bodyParser = express.json();
const store = require('./store');

bookmarksRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.status(200).json(store);
  });
bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const foundBookmark = store.filter(bookmark => bookmark.id === req.params.id)
    if(foundBookmark.length === 0) {
      logger.error(`Bookmark with id ${req.params.id} not found.`);
      return res.status(404).json({ message: `Couldn't find a bookmark with that id boss` })
    } else {
      return res.status(200).json(foundBookmark)
    }
    
  })


  module.exports = bookmarksRouter;