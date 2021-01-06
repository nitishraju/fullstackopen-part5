import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

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

test('<BlogForm /> updates state and calls onSubmit function', () => {
  const mockCreateBlog = jest.fn()

  const component = render(
    <BlogForm createBlogHandler={mockCreateBlog} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: fakeBlog.title }
  })
  fireEvent.change(author, {
    target: { value: fakeBlog.author }
  })
  fireEvent.change(url, {
    target: { value: fakeBlog.url }
  })
  fireEvent.submit(form)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0].title).toBe(fakeBlog.title)
  expect(mockCreateBlog.mock.calls[0][1]).toBe(fakeBlog.author)
  expect(mockCreateBlog.mock.calls[0][2]).toBe(fakeBlog.url)
})