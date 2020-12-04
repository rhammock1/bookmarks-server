function makeBookmarksArray() {
  return [
    {
      id: 1,
      title: 'Google', 
      url: 'http://google.com', 
      description: 'An indie search engine startup',
      rating: 4,
    },
    {
      id: 2,
      title: 'An indie search engine startup', 
      url: 'http://medium.com/bloggerx/fluffiest-cats-334', 
      description: 'The only list of fluffy cats online', 
      rating: 5,
    },
    {
      id: 3,
      title: 'Fluffy cats', 
      url: 'http://medium.com/bloggerx/fluffiest-cats-334', 
      description: 'Online catz', 
      rating: 5,
    }
  ]
}

module.exports = {
  makeBookmarksArray
  };