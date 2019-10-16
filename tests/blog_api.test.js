const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

// Clears the database and initialize test data
beforeEach(async () => {
  await Blog.deleteMany({})   // .remove is deprecated. Using deleteMany instead

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

  test('Blogs have id-field', async () => {
    const allBlogs = await helper.allBlogsInDB()
    expect(allBlogs[0].id).toBeDefined()
  })

  test('Add a new blog', async () => {
    const startBlogs = await helper.allBlogsInDB()

    await new Blog(helper.newBlog).save()
    const endBlogs = await helper.allBlogsInDB()
    expect(startBlogs.length + 1).toBe(endBlogs.length)
  })

  test('Blog without likes-value will get likes-value of 0', async () => {
    expect(helper.blogLikesMissing.likes).toBeUndefined()
    await new Blog(helper.blogLikesMissing).save()
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

afterAll(() => {
  mongoose.connection.close()
})