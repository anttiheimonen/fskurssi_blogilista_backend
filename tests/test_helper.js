const Blog = require('../models/blog')

const allBlogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const initialBlogs = [
  {
    title: 'Ducktales',
    author: 'Donald Duck',
    url: 'urlToDonaldsblog'
  },
  {
    title: 'Making money',
    author: 'Scrooge McDuck',
    url: 'urlToScroogesblog'
  },
  {
    title: 'Gladstone\'s Terrible Secre',
    author: 'Gyro Gearloose',
    url: 'urlToGyrosblog'
  },
]

module.exports = {
  allBlogsInDB, initialBlogs
}