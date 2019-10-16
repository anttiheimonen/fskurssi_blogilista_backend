const Blog = require('../models/blog')

const allBlogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const initialBlogs = [
  {
    title: 'Ducktales',
    author: 'Donald Duck',
    url: 'urlToDonaldsblog',
    likes: 5
  },
  {
    title: 'Making money',
    author: 'Scrooge McDuck',
    url: 'urlToScroogesblog',
    likes: 6
  },
  {
    title: 'Gladstone\'s Terrible Secret',
    author: 'Gyro Gearloose',
    url: 'urlToGyrosblog',
    likes: 15
  },
]

const newBlog = {
  title: 'Junior Woodchucks\' Guidebook',
  author: 'Huey Dewey and Louie',
  url: 'urlToNephewsblog',
  likes: 8
}

const blogLikesMissing = {
  title: 'Lucky Luck',
  author: 'Gladstone Gander',
  url: 'urlToGladstonesblog',
}

const blogTitleMissing = {
  author: 'Magica De Spell',
  url: 'urlToMagicasblog',
  likes: 4
}

const blogUrlMissing = {
  title: 'Beagle Boys',
  author: 'Blueprints of Money Bin',
  likes: 5
}

module.exports = {
  allBlogsInDB, initialBlogs, newBlog, blogLikesMissing
}