const _ = require('lodash')

const totalLikes = blogs => {

  const reducer = (accumulator, blog) => accumulator + blog.likes
  const sumOfLikes = blogs.reduce(reducer, 0)

  return sumOfLikes
}

const favoriteBlog = blogs => {
  if (blogs.length  === 0) {
    return null
  }

  // Compare likes, return new blog if it has more likes
  const reducer = (fav, blog) => (blog.likes > fav.likes ? blog : fav)
  const favorite = blogs.reduce(reducer)

  return {
    'title' : favorite.title,
    'author' : favorite.author,
    'likes' : favorite.likes
  }
}

const mostBlogs = blogs => {
  if (blogs.length  === 0) {
    return null
  }

  const authorWithMostBlogs = _(blogs)
    // Count the number of blogs per author
    .countBy(x => x.author)
    // Compare with _reduce who has most blogs
    .reduce((best, count, author) => {
      console.log(best, count, author )
      return (
        best.blogs > count
          ? best
          : {'author': author, 'blogs' : count })
    }, {'blogs': 0})

  return authorWithMostBlogs
}

module.exports = {
  totalLikes, favoriteBlog, mostBlogs
}

const mostLikes = blogs => {
  if (blogs.length  === 0) {
    return null
  }

  const mostLiked = _(blogs)
    .groupBy('author')
    .map((objs, key) => {
      return {
        'author': key,
        'likes': _.sumBy(objs, 'likes')
      }
    })
    .sortBy(x => x.likes)
    .reverse()
    .head()

  return mostLiked
}

module.exports = {
  totalLikes, favoriteBlog, mostBlogs, mostLikes
}