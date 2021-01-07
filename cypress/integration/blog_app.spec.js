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
    const testingBlog = {
      title: 'Test Blog',
      author: 'Testing Author',
      url: 'http://testing.test/'
    }

    beforeEach(function() {
      cy.login({ username: 'e2eUser', password: 'testing' })
    })

    it('a new blog can be added', function() {
      cy.get('#expand-button').click()
      cy.get('#title').type(testingBlog.title)
      cy.get('#author').type(testingBlog.author)
      cy.get('#url').type(testingBlog.url)

      cy.get('#blog-submit-button').click()
      cy.get('.notification').contains(`Created blog: ${testingBlog.title} by ${testingBlog.author}`)
      cy.contains(`${testingBlog.title} - ${testingBlog.author}`)

      cy.request('GET', 'http://localhost:3001/api/blogs')
        .then(({ body }) => {
          const blog = body.find(elem => elem.title === testingBlog.title)
          expect(blog.author).to.eq(testingBlog.author)
        })
    })

    it('a blog can be liked', function() {
      cy.createBlog(testingBlog)

      cy.contains('show').click()
      cy.contains('Likes: 0')
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })

    it('a blog created by the user can only be deleted by the user', function() {
      cy.createBlog(testingBlog)
      cy.contains('show').click()
      cy.contains('Remove')

      cy.contains('Log Out').click()

      const newUser = {
        username: 'secondUser',
        name: 'Second User',
        password: 'testing2'
      }
      cy.request('POST', 'http://localhost:3001/api/users', newUser)
      cy.login({ username: 'secondUser', password: 'testing2' })
      cy.visit('/')
      cy.contains(`${newUser.name} logged in.`)
      cy.contains('show').click()
      cy.contains('Remove').should('not.exist')
    })
  })
})