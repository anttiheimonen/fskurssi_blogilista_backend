const Blog = require('../models/blog')
const User = require('../models/user')

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

const allUsersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const initialUsers = [
  {
    username: 'DonaldD',
    name: 'Donald Duck',
    passwordHash: 'dummy001'
  },
  {
    username: 'TheMostRichDucIinTheWorld',
    name: 'Scrooge McDuck',
    passwordHash: 'dummy002'
  },
  {
    username: 'DaisyD',
    name: 'Daisy Duck',
    passwordHash: 'dummy003'
  }
]

const newUser = {
  username: 'HueyD',
  name: 'Huey Duck',
  password: 'dummy004'
}

module.exports = {
  allBlogsInDB,
  initialBlogs,
  newBlog,
  blogLikesMissing,
  blogTitleMissing,
  blogUrlMissing,
  allUsersInDB,
  initialUsers,
  newUser
}