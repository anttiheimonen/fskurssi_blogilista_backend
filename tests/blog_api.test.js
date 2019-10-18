const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

describe('Blog operations', () => {
  beforeEach(async () => {
    // Clears the database and initialize test data
    await Blog.deleteMany({})   // .remove is deprecated. Using deleteMany instead

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Get all blogs', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body.length).toBe(3)
  })

  test('Blogs have id-field', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('Add a new blog', async () => {
    const startBlogs = await helper.allBlogsInDB()
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const endBlogs = await helper.allBlogsInDB()
    expect(startBlogs.length + 1).toBe(endBlogs.length)
  })

  test('Blog without likes-value will get likes-value of 0', async () => {
    expect(helper.blogLikesMissing.likes).toBeUndefined()
    await api
      .post('/api/blogs')
      .send(helper.blogLikesMissing)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.allBlogsInDB()
    const addedBlog = allBlogs.find(blog => blog.author === 'Gladstone Gander')
    expect(addedBlog.likes).toBe(0)
  })

  test('Blog without url cannot be added to database', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogUrlMissing)
      .expect(400)
  } )

  test('Blog without title cannot be added to database', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogTitleMissing)
      .expect(400)
  } )

})


describe('User operations', () => {

  beforeEach(async () => {
    // Clears the database and initialize test data
    await User.deleteMany({})   // .remove is deprecated. Using deleteMany instead
    const userObjects = helper.initialUsers
      .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })


  test('Users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Add a new user to database', async () => {
    const startUsers = await helper.allUsersInDB()

    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const endUsers = await helper.allUsersInDB()
    expect(startUsers.length + 1).toBe(endUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})