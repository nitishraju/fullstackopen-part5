import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const fakeUser = {
  token: 'abcxyz',
  username: 'fakeUser',
  id: '5ff0dfef3603112937630a0b'
}
const fakeBlog = {
  title: 'React Patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  user: fakeUser,
  likes: 4
}
const mockLikeHandler = jest.fn()
const mockDeleteHandler = jest.fn()

test('renders only title and author by default', () => {
  const component = render(
    <Blog
      blog={fakeBlog}
      user={fakeUser}
      likeHandler={mockLikeHandler}
      deleteHandler={mockDeleteHandler}
    />
  )

  expect(component.container).toHaveTextContent('React Patterns - Michael Chan')
})

test('additionally renders blog url and likes when expanded', () => {
  const component = render(
    <Blog
      blog={fakeBlog}
      user={fakeUser}
      likeHandler={mockLikeHandler}
      deleteHandler={mockDeleteHandler}
    />
  )

  const showButton = component.getByText('show')
  fireEvent.click(showButton)

  expect(component.container).toHaveTextContent(`URL: ${fakeBlog.url}`)
  expect(component.container).toHaveTextContent(`Likes: ${fakeBlog.likes}`)
})

test('clicking the like button once calls the event handler once', () => {
  const component = render(
    <Blog
      blog={fakeBlog}
      user={fakeUser}
      likeHandler={mockLikeHandler}
      deleteHandler={mockDeleteHandler}
    />
  )
  const showButton = component.getByText('show')
  fireEvent.click(showButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})