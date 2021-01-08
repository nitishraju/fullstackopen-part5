describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const testUser = {
      username: 'e2eUser',
      name: 'Test User',
      password: 'testing'
    }
    cy.request('POST', 'http://localhost:3001/api/users', testUser)
    cy.visit('/')
  })

  it('should default to showing the login form', function() {
    cy.visit('/')
    cy.contains('Log in here:')
    cy.get('#login-button').contains('Log In')
  })

  describe('Login', function() {
    it('should succeed with valid credentials', function() {
      cy.get('#username').type('e2eUser')
      cy.get('#password').type('testing')
      cy.get('#login-button').click()

      cy.contains('Test User logged in.')
    })

    it('should fail with invalid credentials', function() {
      cy.get('#username').type('notCorrect')
      cy.get('#password').type('wrongPass')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Incorrect Credentials.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe.only('When logged in,', function() {
    const testBlog1 = {
      title: 'Test Blog 1',
      author: 'First User',
      url: 'http://testing1.test/'
    }
    const testBlog2 = {
      title: 'Test Blog 2',
      author: 'Second User',
      url: 'http://testing2.test/',
      likes: 1
    }
    const testBlog3 = {
      title: 'Test Blog 3',
      author: 'Third User',
      url: 'http://testing3.test/',
      likes: 2
    }

    beforeEach(function() {
      cy.login({ username: 'e2eUser', password: 'testing' })
    })

    it('a new blog can be added', function() {
      cy.get('#expand-button').click()
      cy.get('#title').type(testBlog1.title)
      cy.get('#author').type(testBlog1.author)
      cy.get('#url').type(testBlog1.url)

      cy.get('#blog-submit-button').click()
      cy.get('.notification').contains(`Created blog: ${testBlog1.title} by ${testBlog1.author}`)
      cy.contains(`${testBlog1.title} - ${testBlog1.author}`)

      cy.request('GET', 'http://localhost:3001/api/blogs')
        .then(({ body }) => {
          const blog = body.find(elem => elem.title === testBlog1.title)
          expect(blog.author).to.eq(testBlog1.author)
        })
    })

    it('a blog can be liked', function() {
      cy.createBlog(testBlog1)

      cy.contains('show').click()
      cy.contains('Likes: 0')
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })

    it('a blog created by the user can only be deleted by the user', function() {
      cy.createBlog(testBlog1)
      cy.contains('show').click()
      cy.contains('Remove')

      cy.contains('Log Out').click()

      const testUser2 = {
        username: 'testUser2',
        name: 'Second User',
        password: 'http://testing2.test/'
      }
      cy.request('POST', 'http://localhost:3001/api/users', testUser2)
      cy.login({ username: testUser2.username, password: testUser2.password })
      cy.visit('/')
      cy.contains(`${testUser2.name} logged in.`)
      cy.contains('show').click()
      cy.contains('Remove').should('not.exist')
    })

    it.only('blogs are ordered by descending number of likes', function() {
      cy.createBlog(testBlog1)
      cy.createBlog(testBlog2)
      cy.createBlog(testBlog3)

      cy.contains(`${testBlog1.title} - ${testBlog1.author}`)
        .contains('show').click()
      cy.contains(`${testBlog2.title} - ${testBlog2.author}`)
        .contains('show').click()
        .parent().find('.like-button').as('button2')
      cy.contains(`${testBlog3.title} - ${testBlog3.author}`)
        .contains('show').click()
        .parent().find('.like-button').as('button3')

      cy.get('#blog-list')
        .each((element, index) => {
          if (index === 0) {
            cy.wrap(element).contains(`${testBlog3.title}`)
            cy.wrap(element).contains('Likes: 2')
          } else
          if (index === 1) {
            cy.wrap(element).contains(`${testBlog2.title}`)
            cy.wrap(element).contains('Likes: 1')
          } else
          if (index === 2) {
            cy.wrap(element).contains(`${testBlog1.title}`)
            cy.wrap(element).contains('Likes: 0')
          }
        })

      cy.get('@button2').click()
      cy.wait(500)
      cy.get('@button2').click()

      cy.get('#blog-list')
        .each((element, index) => {
          if (index === 0) {
            cy.wrap(element).contains(`${testBlog2.title}`)
            cy.wrap(element).contains('Likes: 3')
          } else
          if (index === 1) {
            cy.wrap(element).contains(`${testBlog3.title}`)
            cy.wrap(element).contains('Likes: 2')
          } else
          if (index === 2) {
            cy.wrap(element).contains(`${testBlog1.title}`)
            cy.wrap(element).contains('Likes: 0')
          }
        })
    })
  })
})