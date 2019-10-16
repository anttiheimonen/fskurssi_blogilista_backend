const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

// Clear the database and save test blogs
beforeEach(async () => {
  await Blog.remove({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Database operations', () => {

  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Get all blogs', async () => {
    const allBlogs = await helper.allBlogsInDB()
    expect(allBlogs.length).toBe(3)
  })

  // test('Get single blog', async () => {
  //   const allBlogs = await helper.allBlogsInDB()

  //   expect(allBlogs).toContain(helper.initialBlogs[0])
  // })

})

afterAll(() => {
  mongoose.connection.close()
})