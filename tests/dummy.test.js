const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
]

const emptyList = []

const blogsWithZeroLikes = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 0,
    __v: 0
  }
]

describe('Total likes', () => {

  test('Total likes of list of blogs', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

  test('Total likes of list with one blog', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(7)
  })

  test('Total likes of empty list', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0)
  })

  test('Total likes of list if blogs with zero likes', () => {
    expect(listHelper.totalLikes(blogsWithZeroLikes)).toBe(0)
  })
})


describe('Favorite blog', () => {

  test('Favorite blog of list of blogs', () => {
    const expected =
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(listHelper.favoriteBlog(blogs)).toEqual(expected)
  })

  test('Favorite blog of list of one', () => {
    const expected =
     {
       title: 'React patterns',
       author: 'Michael Chan',
       likes: 7
     }
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(expected)
  })

  test('Favorite blog of empty list', () => {

    expect(listHelper.favoriteBlog(emptyList)).toBeNull()
  })

  test('Favorite blog of list with zero likes', () => {
    const expected =
     {
       title: 'React patterns',
       author: 'Michael Chan',
       likes: 0
     }
    expect(listHelper.favoriteBlog(blogsWithZeroLikes)).toEqual(expected)
  })
})


describe('Author with most blogs', () => {

  test('Author with most blogs of list', () => {
    const expected =
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    expect(listHelper.mostBlogs(blogs)).toEqual(expected)
  })

  test('Author with most blogs of empty list', () => {

    expect(listHelper.mostBlogs(emptyList)).toBeNull()
  })

  test('Author with most blogs of list of one', () => {
    const expected =
    {
      author: 'Michael Chan',
      blogs: 1
    }
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(expected)
  })


})


describe('Favorite Author', () => {

  test('Favorite author of list', () => {
    const expected =
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    expect(listHelper.mostLikes(blogs)).toEqual(expected)
  })

  test('Favorite author of empty list', () => {

    expect(listHelper.mostLikes(emptyList)).toBeNull()
  })

  test('Favorite author of list of one', () => {
    const expected =
    {
      author: 'Michael Chan',
      likes: 7
    }
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(expected)
  })

  test('Favorite author of list with zero likes', () => {
    const expected =
    {
      author: 'Edsger W. Dijkstra',
      likes: 0
    }
    expect(listHelper.mostLikes(blogsWithZeroLikes)).toEqual(expected)
  })


})

