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
    beforeEach(function() {
      cy.login({ username: 'e2eUser', password: 'testing' })
    })

    it('a new blog can be added', function() {
      cy.get('#expand-button').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Testing Author')
      cy.get('#url').type('http://testing.test/')

      cy.get('#blog-submit-button').click()
      cy.get('.notification').contains('Created blog: Test Blog by Testing Author')
      cy.contains('Test Blog - Testing Author')

      cy.request('GET', 'http://localhost:3001/api/blogs')
        .then(({ body }) => {
          const blog = body.find(elem => elem.title === 'Test Blog')
          expect(blog.author).to.eq('Testing Author')
        })
    })
  })
})