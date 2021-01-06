import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author by default', () => {
  const fakeUser = {
    token: 'abcxyz',
    username: 'fakeUser',
    id: '5ff0dfef3603112937630a0b'
  }
  const blog = {
    title: 'React Patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: fakeUser,
    likes: 4
  }

  const mockLikeHandler = jest.fn()
  const mockDeleteHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      user={fakeUser}
      likeHandler={mockLikeHandler}
      deleteHandler={mockDeleteHandler}
    />
  )

  expect(component.container).toHaveTextContent('React Patterns - Michael Chan')
})