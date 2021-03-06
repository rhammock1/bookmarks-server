const express = require('express');
const logger = require('./logger');
const bookmarksRouter = express.Router();
const { v4: uuid } = require('uuid');
const bookmarksService = require('./bookmarksService');

const bodyParser = express.json();



function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }

  return true;
}

bookmarksRouter
  .route('/bookmarks')
  .get((req, res, next) => {
    const db = req.app.get('db');
    bookmarksService.getAllBookmarks(db)
      .then(bookmarks => {
        res.status(200).json(bookmarks);
      })
      .catch(next)
  })
  .post(bodyParser, (req, res, next) => {
    console.log(req.body);
    const { title, url, desc = ' ', rating = 1 } = req.body;
    if(!title) {
      logger.error('Title is required');
      return res.status(400).json({message: `Title is required` })
    }
    if(!url) {
      logger.error('Url is required');
      return res.status(400).json({message: `Url is required` })
    }
    if(!isValidUrl(url)) {
      logger.error(`${url} is not a valid url`);
      return res.status(400).json({message: `Url is not valid` })
    }
  if(rating < 1 || rating > 5 ) {
    logger.error(`Rating must be between 1 and 5`);
    return res.status(400).json({message: `Rating must be between 1 and 5` })
  }
  if(desc.length < 1) {
    logger.error(`Description is optional but must be at least one character long`);
    return res.status(400).json({message: `Description is optional but must be at least one character long` })
  }
    const id = uuid();
    const newBookmark = {
      id, title, url, desc, rating
    };
    store.push(newBookmark);
    logger.info(`Bookmark with id ${id} was created`);
    res.status(201).json(newBookmark);

  })
bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res, next) => {
    const db = req.app.get('db');
    bookmarksService.getById(db, req.params.id)
      .then(bookmark => {
        if(!bookmark) {
          logger.error(`Bookmark with id ${req.params.id} not found.`);
          return res.status(404).json({
            error: { message: `Bookmark doesn't exist`}
          })
        }
        res.json(bookmark)
      })
      .catch(next)
    
  })
  .delete((req, res) => {
    const { id } = req.params;
    const index = store.findIndex(each => each.id === id);

    if (index === -1) {
      logger.error(`Bookmark with id ${req.params.id} not found.`);
      return res.status(404).json({ message: `Couldn't find a bookmark with that id boss` })
    } 
    store.splice(index, 1);
    logger.info(`Bookmark with id ${id} was deleted`)
    res.status(204).end();
    
  })


  module.exports = bookmarksRouter;