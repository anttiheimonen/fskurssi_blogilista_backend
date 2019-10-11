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

module.exports = {
  totalLikes, favoriteBlog
}