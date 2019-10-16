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
    title: 'Gladstone\'s Terrible Secret',
    author: 'Gyro Gearloose',
    url: 'urlToGyrosblog'
  },
]

const newBlog = {
  title: 'Junior Woodchucks\' Guidebook',
  author: 'Huey Dewey and Louie',
  url: 'urlToNephewsblog'
}

module.exports = {
  allBlogsInDB, initialBlogs, newBlog
}