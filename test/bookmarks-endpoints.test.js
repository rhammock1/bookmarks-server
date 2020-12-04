const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');

const { makeBookmarksArray } = require('./bookmarks.fixtures');

describe.only('Bookmarks endpoints', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db)
  })
  
  after('disconnect from db', () => db.destroy())
  before('clean the table', () => db('bookmarks').truncate())

  afterEach('Cleanup', () => db('bookmarks').truncate())

  describe(`GET /bookmarks`, () => {
    context('Given there are no bookmarks', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/bookmarks')
          .expect(200, [])
      })
    })
    context('Given there are bookmarks in the database', () => {
      const testBookmarks = makeBookmarksArray();

      beforeEach('insert bookmarks', () => {
        return db
          .into('bookmarks')
          .insert(testBookmarks)
      })
      it('Get /articles responds with 200 and all of the bookmarks', () => {
        return supertest(app)
          .get('/bookmarks')
          .expect(200, testBookmarks)
      })
    })
  })

  describe('GET /bookmarks/:id', () => {
    context('Given there are no articles', () => {
      it('responds with 404', () => {
        const bookmarkId = 010;
        return supertest(app)
          .get(`/bookmarks/${bookmarkId}`)
          .expect(404, { error: { message: `Bookmark doesn't exist` } })
      })
    })
  context('Given there are bookmarks in the database', () => {
    const testBookmarks = makeBookmarksArray();

    beforeEach('insert bookmarks', () => {
      return db
        .into('bookmarks')
        .insert(testBookmarks)
    })

    it('GET /bookmarks/:id responds with 200 and the specified bookmark,', () => {
      const bookmarkId = 2;
      const expectedBookmarks = testBookmarks[bookmarkId - 1];
      return supertest(app)
        .get(`/bookmarks/${bookmarkId}`)
        .expect(200, expectedBookmarks)
    })
  })
  })
})