const Blog = require('../models/blog')

const allBlogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  allBlogsInDB
}