describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const fakeUser = {
      username: 'e2eUser',
      name: 'End 2 End',
      password: 'test'
    }
    cy.request('')
  })

  it('should default to showing the login form', function() {
    cy.visit('/')
    cy.contains('Log in here:')
    cy.get('#login-button').contains('Log In')
  })
})