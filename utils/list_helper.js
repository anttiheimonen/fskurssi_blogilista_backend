const totalLikes = blogs => {

  const reducer = (accumulator, blog) => accumulator + blog.likes
  const sumOfLikes = blogs.reduce(reducer, 0)

  return sumOfLikes
}

module.exports = {
  totalLikes
}